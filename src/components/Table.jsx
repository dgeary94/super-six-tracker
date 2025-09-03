import React from "react";
import * as d3 from "d3";

const calculateIndividualScores = (data) => {
  return data.map((d) => d.values.map((v) => v.score));
};

const calculateSumScores = (individualScores) => {
  return individualScores.map((scores) => d3.sum(scores));
};

const calculateTopScorePerRound = (individualScores) => {
  const rounds = individualScores[0].length;
  const topScores = [];
  for (let i = 0; i < rounds; i++) {
    let topScore = 0;
    for (let j = 0; j < individualScores.length; j++) {
      if (individualScores[j][i] > topScore) {
        topScore = individualScores[j][i];
      }
    }
    topScores.push(topScore);
  }
  return topScores;
};

const calculateRoundsWon = (individualScores, topScorePerRound) => {
  const roundsWon = new Array(individualScores.length).fill(0);
  for (let i = 0; i < topScorePerRound.length; i++) {
    for (let j = 0; j < individualScores.length; j++) {
      if (individualScores[j][i] === topScorePerRound[i]) {
        roundsWon[j] += 1;
      }
    }
  }
  return roundsWon;
};

const Table = ({ data, season, width = 100 }) => {
  const names = data.map(
    (d) => d.name.charAt(0).toUpperCase() + d.name.slice(1)
  );
  const individualScores = calculateIndividualScores(data);
  const sumScores = calculateSumScores(individualScores);
  const topScorePerRound = calculateTopScorePerRound(individualScores);
  const roundsWon = calculateRoundsWon(individualScores, topScorePerRound);
  const topSumScoreIndex = sumScores.indexOf(d3.max(sumScores));

  const corrResults = data.map((d) => d.values.slice(-1)[0].correct_results);
  const corrScores = data.map((d) => d.values.slice(-1)[0].correct_scores);

  return (
    <table id="stats-table">
      <colgroup>
        <col style={{ width: "20%" }} />
        <col span={names.length} style={{ width: "auto" }} />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          {names.map((name, i) => (
            <th key={i}>
              {name}
              {i === topSumScoreIndex ? "🥇" : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Best Round</td>
          {individualScores.map((scores, i) => (
            <td key={i}>{d3.max(scores)}</td>
          ))}
        </tr>
        <tr>
          <td>Avg Round</td>
          {individualScores.map((scores, i) => (
            <td key={i}>{Math.round(d3.mean(scores) * 10) / 10}</td>
          ))}
        </tr>
        <tr>
          <td>Std Dev</td>
          {individualScores.map((scores, i) => (
            <td key={i}>{Math.round(d3.deviation(scores) * 10) / 10}</td>
          ))}
        </tr>
        <tr>
          <td>
            Rounds Won<sup>*</sup>
          </td>
          {roundsWon.map((wins, i) => (
            <td key={i}>{wins}</td>
          ))}
        </tr>
        {(season === "24-25" || season === "25-26") && (
          <>
            <tr>
              <td>Correct Results</td>
              {corrResults.map((results, i) => (
                <td key={i}>{results}</td>
              ))}
            </tr>
            <tr>
              <td>Correct Scores</td>
              {corrScores.map((scores, i) => (
                <td key={i}>{scores}</td>
              ))}
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
