// One-off migration: loads src/super-six-scores.csv into the Supabase
// players / seasons / season_entries / rounds tables.
//
// Usage:
//   node --env-file=.env scripts/migrate-csv-to-supabase.js
//
// Requires VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.
// The service role key is required (not the anon key) because RLS only
// grants public SELECT on these tables.

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { csvParse } from "d3";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, "../src/super-six-scores.csv");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add SUPABASE_SERVICE_ROLE_KEY to .env, then run:\n" +
      "  node --env-file=.env scripts/migrate-csv-to-supabase.js",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// The CSV stores one block of columns per season, left to right.
const SEASONS = [
  {
    label: "22-23",
    round: "round",
    name: "name",
    score: "score",
    correctResults: null,
    correctScores: null,
  },
  {
    label: "23-24",
    round: "s2_round",
    name: "s2_name",
    score: "s2_score",
    correctResults: null,
    correctScores: null,
  },
  {
    label: "24-25",
    round: "s3_round",
    name: "s3_name",
    score: "s3_score",
    correctResults: "s3_correct_results",
    correctScores: "s3_correct_scores",
  },
  {
    label: "25-26",
    round: "s4_round",
    name: "s4_name",
    score: "s4_score",
    correctResults: "s4_correct_results",
    correctScores: "s4_correct_scores",
  },
];

const num = (value) => (value === undefined || value === "" ? null : +value);
// A blank score means the player scored 0 that round rather than missing
// data — confirmed by the running score_sum staying flat across blank rows
// (e.g. sam, rounds 55-56 of 24-25). The DB column is NOT NULL, so coerce.
const numOrZero = (value) => (value === undefined || value === "" ? 0 : +value);

function extractRounds(rows, season) {
  return rows
    .filter((row) => row[season.round] !== "" && row[season.name] !== "")
    .map((row) => ({
      name: row[season.name].trim(),
      round_number: num(row[season.round]),
      score: numOrZero(row[season.score]),
      correct_results: season.correctResults
        ? num(row[season.correctResults])
        : null,
      correct_scores: season.correctScores
        ? num(row[season.correctScores])
        : null,
    }));
}

async function upsertAndMap(table, records, conflictKey) {
  const { data, error } = await supabase
    .from(table)
    .upsert(records, { onConflict: conflictKey })
    .select(`id, ${conflictKey}`);
  if (error) throw new Error(`Upserting ${table} failed: ${error.message}`);
  return new Map(data.map((row) => [row[conflictKey], row.id]));
}

async function main() {
  const csvText = readFileSync(CSV_PATH, "utf-8");
  const rows = csvParse(csvText);

  const seasonRounds = SEASONS.map((season) => ({
    season,
    rounds: extractRounds(rows, season),
  }));

  // players: union of names across every season
  const allNames = new Set(
    seasonRounds.flatMap(({ rounds }) => rounds.map((r) => r.name)),
  );
  const playerIdByName = await upsertAndMap(
    "players",
    [...allNames].map((name) => ({ name })),
    "name",
  );
  console.log(`Upserted ${playerIdByName.size} players.`);

  // seasons
  const seasonIdByLabel = await upsertAndMap(
    "seasons",
    SEASONS.map((s) => ({ label: s.label })),
    "label",
  );
  console.log(`Upserted ${seasonIdByLabel.size} seasons.`);

  // season_entries: which players took part in which season
  const entries = seasonRounds.flatMap(({ season, rounds }) => {
    const names = new Set(rounds.map((r) => r.name));
    return [...names].map((name) => ({
      season_id: seasonIdByLabel.get(season.label),
      player_id: playerIdByName.get(name),
    }));
  });
  const { error: entriesError } = await supabase
    .from("season_entries")
    .upsert(entries, { onConflict: "season_id,player_id" });
  if (entriesError) {
    throw new Error(`Upserting season_entries failed: ${entriesError.message}`);
  }
  console.log(`Upserted ${entries.length} season entries.`);

  // rounds
  const roundRows = seasonRounds.flatMap(({ season, rounds }) =>
    rounds.map((r) => ({
      season_id: seasonIdByLabel.get(season.label),
      player_id: playerIdByName.get(r.name),
      round_number: r.round_number,
      score: r.score,
      correct_results: r.correct_results,
      correct_scores: r.correct_scores,
    })),
  );

  const BATCH_SIZE = 500;
  for (let i = 0; i < roundRows.length; i += BATCH_SIZE) {
    const batch = roundRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from("rounds")
      .upsert(batch, { onConflict: "season_id,player_id,round_number" });
    if (error) {
      throw new Error(`Upserting rounds batch at ${i} failed: ${error.message}`);
    }
  }
  console.log(`Upserted ${roundRows.length} round scores.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
