import { supabase } from "./supabaseClient";

// Shapes a season's rows into the { name, values } per-player format that
// Graph/Table expect, computing score_sum client-side as a running total
// since (unlike the old CSV) the rounds table only stores per-round score.
export async function getSeasonData(seasonLabel) {
  const { data, error } = await supabase
    .from("seasons")
    .select(
      `
      id,
      season_entries ( players ( id, name ) ),
      rounds ( round_number, score, correct_results, correct_scores, players ( name ) )
    `,
    )
    .eq("label", seasonLabel)
    .single();

  if (error) throw new Error(`Fetching season "${seasonLabel}" failed: ${error.message}`);

  const players = data.season_entries
    .map((entry) => entry.players)
    .sort((a, b) => a.id - b.id)
    .map((player) => player.name);

  const roundsByPlayer = new Map(players.map((name) => [name, []]));
  for (const round of data.rounds) {
    roundsByPlayer.get(round.players.name)?.push(round);
  }

  const graphData = players.map((name) => {
    const rounds = roundsByPlayer
      .get(name)
      .sort((a, b) => a.round_number - b.round_number);

    let scoreSum = 0;
    const values = rounds.map((round) => {
      scoreSum += round.score;
      return {
        round: round.round_number,
        score: round.score,
        score_sum: scoreSum,
        correct_results: round.correct_results,
        correct_scores: round.correct_scores,
      };
    });

    return { name, values };
  });

  return { players, graphData };
}
