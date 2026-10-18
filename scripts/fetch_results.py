"""Fetches new round scores from the Sky Super 6 API into Supabase.

Logs in to super6.skysports.com with headless Chrome to harvest the
`productToken` cookie, reads every round played since the latest one already
stored, then upserts those scores into the `rounds` table.

Usage:
    python scripts/fetch_results.py [--season 26-27] [--dry-run] [--headful]

Requires in .env:
    SUPER6_USERNAME, SUPER6_PIN, SUPER6_LEAGUE_ID
    VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

The service role key is required (not the anon key) because RLS only grants
public SELECT on these tables.
"""

import argparse
import os
import sys
import time

import requests
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

SUPER6_URL = "https://super6.skysports.com/"
API_BASE = "https://api.s6.sbgservices.com/v2"
TIMEOUT = 30

# The API returns legal first names; the league (and the DB) uses nicknames.
NAME_MAP = {
    "Andrew": "andy",
    "David": "david",
    "Edward": "ed",
    "Jack": "jack",
    "Leo": "leo",
    "Matthew Jake": "jake",
    "James": "james",
    "Jonathon": "jonnie",
    "Joshua": "josh",
    "Samuel": "sam",
}


class Super6Error(RuntimeError):
    pass


# --- Login -----------------------------------------------------------------


def get_product_token(username, pin, headless=True):
    """Drive the Sky login form and return the `productToken` cookie value."""
    options = Options()
    if headless:
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=options)
    try:
        driver.get(SUPER6_URL)
        time.sleep(5)

        try:
            WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "onetrust-accept-btn-handler"))
            ).click()
            print("Cookies accepted.")
        except Exception:
            print("No cookie banner found.")

        driver.find_element(By.ID, "account-bar-login-btn").click()
        time.sleep(5)  # login page loads in place

        username_field = driver.find_element(By.NAME, "username")
        username_field.clear()
        username_field.send_keys(username)

        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(pin)
        password_field.send_keys(Keys.RETURN)
        time.sleep(5)  # redirect back through the OAuth authorize step

        for cookie in driver.get_cookies():
            if cookie["name"] == "productToken":
                print("Found product token.")
                return cookie["value"]

        raise Super6Error(
            "Logged in but no productToken cookie was set — the login form may "
            "have changed, or the credentials were rejected. Re-run with "
            "--headful to watch the flow."
        )
    finally:
        driver.quit()


def api_session(token):
    session = requests.Session()
    session.headers.update(
        {
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
            "Origin": "https://super6.skysports.com",
            "Referer": SUPER6_URL,
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
            ),
        }
    )
    return session


# --- Super 6 API -----------------------------------------------------------


def api_get(session, path, **params):
    response = session.get(f"{API_BASE}/{path}", params=params or None, timeout=TIMEOUT)
    if not response.ok:
        raise Super6Error(
            f"GET {path} failed: {response.status_code} {response.text[:200]}"
        )
    return response.json()


def latest_completed_round(session):
    """The active round is still in play, so the last finished one is id - 1."""
    return api_get(session, "round/active")["id"] - 1


def fetch_entrants(session, league_id):
    table = api_get(session, f"score/league/{league_id}/leaderboard", page=1)[
        "leagueTable"
    ]
    unknown = sorted({u["firstName"] for u in table} - NAME_MAP.keys())
    if unknown:
        raise Super6Error(
            f"No NAME_MAP entry for: {', '.join(unknown)}. Add them to NAME_MAP "
            "in this script."
        )
    return [
        {"user_id": u["userId"], "name": NAME_MAP[u["firstName"]]} for u in table
    ]


def fetch_round_points(session, round_number, user_id):
    total = api_get(session, f"round/{round_number}/user/{user_id}")["total"]["points"]
    # A missed round scores nothing rather than being absent data — matches how
    # blank CSV scores were treated by scripts/migrate-csv-to-supabase.js.
    return 0.0 if total is None else float(total)


def fetch_season_totals(session, user_id):
    totals = api_get(session, f"score/leaderboard/user/{user_id}", period="season")
    return totals["correctResults"], totals["correctScores"]


def collect_scores(session, entrants, rounds_to_fetch):
    """Build round rows for every entrant across `rounds_to_fetch`.

    correct_results / correct_scores are season-to-date running totals, and the
    API only exposes them as "right now", so they are attached to the newest
    round only. Table.jsx reads them off the last round of the season, which is
    exactly that row.
    """
    latest = rounds_to_fetch[-1]
    rows = []
    for round_number in rounds_to_fetch:
        for entrant in entrants:
            score = fetch_round_points(session, round_number, entrant["user_id"])
            row = {
                "name": entrant["name"],
                "round_number": round_number,
                "score": score,
                "correct_results": None,
                "correct_scores": None,
            }
            if round_number == latest:
                row["correct_results"], row["correct_scores"] = fetch_season_totals(
                    session, entrant["user_id"]
                )
            rows.append(row)
        print(f"Round {round_number}: fetched {len(entrants)} scores.")
    return rows


# --- Supabase --------------------------------------------------------------


class Supabase:
    def __init__(self, url, service_role_key):
        self.rest = f"{url.rstrip('/')}/rest/v1"
        self.headers = {
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
            "Content-Type": "application/json",
        }

    def _request(self, method, table, *, params=None, body=None, prefer=None):
        headers = dict(self.headers)
        if prefer:
            headers["Prefer"] = prefer
        response = requests.request(
            method,
            f"{self.rest}/{table}",
            headers=headers,
            params=params,
            json=body,
            timeout=TIMEOUT,
        )
        if not response.ok:
            raise Super6Error(
                f"{method} {table} failed: {response.status_code} "
                f"{response.text[:300]}"
            )
        return response.json() if response.content else None

    def select(self, table, **params):
        return self._request("GET", table, params=params)

    def upsert(self, table, rows, on_conflict, returning=False):
        prefer = "resolution=merge-duplicates,return=" + (
            "representation" if returning else "minimal"
        )
        return self._request(
            "POST",
            table,
            params={"on_conflict": on_conflict},
            body=rows,
            prefer=prefer,
        )


def resolve_season(db, label):
    """Return (id, label) for `label`, or for the newest season if None."""
    if label:
        rows = db.select("seasons", select="id,label", label=f"eq.{label}")
        if not rows:
            raise Super6Error(
                f'No season labelled "{label}". Add it to the seasons table first.'
            )
    else:
        rows = db.select("seasons", select="id,label", order="id.desc", limit=1)
        if not rows:
            raise Super6Error("The seasons table is empty.")
    return rows[0]["id"], rows[0]["label"]


def latest_stored_round(db, season_id):
    rows = db.select(
        "rounds",
        select="round_number",
        season_id=f"eq.{season_id}",
        order="round_number.desc",
        limit=1,
    )
    return rows[0]["round_number"] if rows else 0


def write_rounds(db, season_id, rows):
    names = sorted({row["name"] for row in rows})
    players = db.upsert(
        "players", [{"name": n} for n in names], "name", returning=True
    )
    player_id_by_name = {p["name"]: p["id"] for p in players}

    db.upsert(
        "season_entries",
        [
            {"season_id": season_id, "player_id": player_id_by_name[n]}
            for n in names
        ],
        "season_id,player_id",
    )

    db.upsert(
        "rounds",
        [
            {
                "season_id": season_id,
                "player_id": player_id_by_name[row["name"]],
                "round_number": row["round_number"],
                "score": row["score"],
                "correct_results": row["correct_results"],
                "correct_scores": row["correct_scores"],
            }
            for row in rows
        ],
        "season_id,player_id,round_number",
    )


# --- Entry point -----------------------------------------------------------


def require_env(*names):
    values = [os.getenv(name) for name in names]
    missing = [name for name, value in zip(names, values) if not value]
    if missing:
        raise Super6Error(f"Missing in .env: {', '.join(missing)}")
    return values


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--season",
        help="Season label to write to, e.g. 26-27. Defaults to the newest "
        "season in the seasons table.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Fetch and print the new scores without writing to Supabase.",
    )
    parser.add_argument(
        "--headful",
        action="store_true",
        help="Show the Chrome window, for debugging the login flow.",
    )
    args = parser.parse_args()

    load_dotenv()
    username, pin, league_id = require_env(
        "SUPER6_USERNAME", "SUPER6_PIN", "SUPER6_LEAGUE_ID"
    )
    supabase_url, service_role_key = require_env(
        "VITE_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"
    )

    db = Supabase(supabase_url, service_role_key)
    season_id, season_label = resolve_season(db, args.season)
    last_round = latest_stored_round(db, season_id)
    print(f"Season {season_label}: latest stored round is {last_round}.")

    token = get_product_token(username, pin, headless=not args.headful)
    session = api_session(token)

    latest_round = latest_completed_round(session)
    print(f"Latest completed round: {latest_round}.")

    if latest_round <= last_round:
        print("Already up to date — nothing to fetch.")
        return

    rounds_to_fetch = list(range(last_round + 1, latest_round + 1))
    print(f"Fetching rounds: {rounds_to_fetch}")

    entrants = fetch_entrants(session, league_id)
    print(f"League entrants: {', '.join(e['name'] for e in entrants)}")

    rows = collect_scores(session, entrants, rounds_to_fetch)

    for row in sorted(rows, key=lambda r: (r["round_number"], r["name"])):
        print(
            f"  round {row['round_number']:>3}  {row['name']:<8} "
            f"score {row['score']:>6}  results {row['correct_results']}  "
            f"scores {row['correct_scores']}"
        )

    if args.dry_run:
        print(f"\nDry run — {len(rows)} rows not written.")
        return

    write_rounds(db, season_id, rows)
    print(f"\nUpserted {len(rows)} round scores into season {season_label}.")


if __name__ == "__main__":
    try:
        main()
    except Super6Error as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
