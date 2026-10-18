# Super Six League Tracker

_Super Six League Tracker_ is a data visualisation project which plots data
from a Sky Sports _Super Six_ league into an interactive graph using D3.js. The data is stored in Supabase and read at runtime by `src/lib/seasonData.js`. The graph features a toggleable legend for showing/hiding different players. In addition, it features a basic statistics table presenting the best round, average round, and standard deviation, correct results and correct scores for each player.

## Fetching new results

`scripts/fetch_results.py` logs in to Super 6, reads every round played since
the latest one already in Supabase, and upserts the new scores into the
`rounds` table. Nothing else is needed to update the site — the app reads
straight from the database.

One-time setup (needs Python 3.11+ and a local Chrome install):

```sh
python3.11 -m venv .venv
.venv/bin/pip install -r scripts/requirements.txt
```

Then, after a round finishes:

```sh
npm run fetch:results              # fetch and write
npm run fetch:results -- --dry-run # fetch and print, write nothing
```

By default it writes to the newest season in the `seasons` table; pass
`--season 25-26` to target another. `--headful` shows the Chrome window, which
is the quickest way to debug a login that has started failing.

Requires `SUPER6_USERNAME`, `SUPER6_PIN`, `SUPER6_LEAGUE_ID`,
`VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env` — see
`.env.example`.

New players must be added to `NAME_MAP` in the script, which maps the legal
first name the API returns to the nickname used in the league; the script fails
with the missing names rather than guessing.

### Historical data

`src/super-six-scores.csv` is a frozen snapshot of seasons 22-23 to 26-27 as
they stood before the move to Supabase, kept as the input to the one-off
`npm run migrate:csv`. New rounds do not go into it.
