import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Table = ({ data, season, width }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("Updating the table.");
    // Clear previous table
    d3.select(tableRef.current).selectAll("*").remove();

    // Get correct result and score totals
    const corrResults = [];
    const corrScores = [];
    for (let i = 0; i < data.length; i++) {
      corrResults.push(data[i].values.slice(-1)[0].correct_results);
      corrScores.push(data[i].values.slice(-1)[0].correct_scores);
    }

    // Obtain individual scores for each participant
    const individualScores = [];
    for (let i = 0; i < data.length; i++) {
      let scores = [];
      for (let j = 0; j < data[i].values.length; j++) {
        scores.push(data[i].values[j].score);
      }
      individualScores.push(scores);
    }

    // Calculate sum scores
    const sumScores = [];
    for (let i = 0; i < individualScores.length; i++) {
      let sum = 0;
      for (let j = 0; j < individualScores[i].length; j++) {
        sum += individualScores[i][j];
      }
      sumScores.push(sum);
    }

    // Obtain the top score from each round
    const topScore = [];
    for (let i = 0; i < individualScores[0].length; i++) {
      let currentTopScore = 0;
      for (let j = 0; j < individualScores.length; j++) {
        if (individualScores[j][i] > currentTopScore) {
          currentTopScore = individualScores[j][i];
        }
      }
      topScore.push(currentTopScore);
    }

    // Create empty array to store rounds won per player
    let numberOfRoundsWon = new Array(individualScores.length).fill(0);

    for (let i = 0; i < topScore.length; i++) {
      for (let j = 0; j < individualScores.length; j++) {
        if (individualScores[j][i] === topScore[i]) {
          numberOfRoundsWon[j] += 1;
        }
      }
    }

    // Select DOM elements
    const nameHeader = document.getElementById("name-header");
    const maxRound = document.getElementById("max-round-score");
    const avgRound = document.getElementById("avg-round-score");
    const stDev = document.getElementById("standard-dev");
    const roundsWon = document.getElementById("rounds-won");
    const correctResults = document.getElementById("correct-results");
    const correctScores = document.getElementById("correct-scores");

    // Push names of data to a new array
    let names = [];
    for (let i = 0; i < data.length; i++) {
      names.push(data[i].name);
    }

    // Capitalise each name in names
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      let capName = name.charAt(0).toUpperCase() + name.slice(1);
      names[i] = capName;
    }

    // Find the index of the current top sum score in an array
    const sumScoreTop = sumScores.indexOf(d3.max(sumScores));

    // Clear contents of stats table
    nameHeader.innerHTML = "";
    maxRound.innerHTML = "";
    avgRound.innerHTML = "";
    stDev.innerHTML = "";
    roundsWon.innerHTML = "";
    correctResults.innerHTML = "";
    correctScores.innerHTML = "";

    nameHeader.innerHTML = `<th></th>`;
    // Select name header and add <th> for all names
    for (let i = 0; i < names.length; i++) {
      if (i === sumScoreTop) {
        nameHeader.innerHTML += `<th>${names[i]}&#129351;</th>`; // Add gold medal emoji to current leader
      } else {
        nameHeader.innerHTML += `<th>${names[i]}</th>`;
      }
    }

    // Populate table with values
    maxRound.innerHTML = `<td>Best Round</td>`;
    for (let idx = 0; idx < individualScores.length; idx++) {
      maxRound.innerHTML += `<td>${d3.max(individualScores[idx])}</td>`;
    }

    avgRound.innerHTML = `<td>Avg Round</td>`;
    for (let idx = 0; idx < individualScores.length; idx++) {
      avgRound.innerHTML += `<td>${
        Math.round(d3.mean(individualScores[idx]) * 10) / 10
      }</td>`;
    }

    stDev.innerHTML = `<td>Std Dev</td>`;
    for (let idx = 0; idx < individualScores.length; idx++) {
      stDev.innerHTML += `<td>${
        Math.round(d3.deviation(individualScores[idx]) * 10) / 10
      }</td>`;
    }

    roundsWon.innerHTML = `<td>Rounds Won<sup>*</sup></td>`;
    for (let idx = 0; idx < individualScores.length; idx++) {
      roundsWon.innerHTML += `<td>${numberOfRoundsWon[idx]}</td>`;
    }

    if (season === "24-25") {
      correctResults.innerHTML = `<td>Correct Results</td>`;
      for (let idx = 0; idx < corrResults.length; idx++) {
        correctResults.innerHTML += `<td>${corrResults[idx]}</td>`;
      }

      correctScores.innerHTML = `<td>Correct Scores</td>`;
      for (let idx = 0; idx < corrScores.length; idx++) {
        correctScores.innerHTML += `<td>${corrScores[idx]}</td>`;
      }
    }
  }, [season]);

  return season === "24-25" ? (
    <table id="stats-table" ref={tableRef} width={width * 1.2}>
      <thead>
        <tr id="name-header">
          <th></th>
        </tr>
      </thead>
      <tbody id="stats-rows">
        <tr id="max-round-score"></tr>
        <tr id="avg-round-score"></tr>
        <tr id="standard-dev"></tr>
        <tr id="rounds-won"></tr>
        <tr id="correct-results"></tr>
        <tr id="correct-scores"></tr>
      </tbody>
    </table>
  ) : (
    <table id="stats-table" ref={tableRef} width={width * 1.2}>
      <thead>
        <tr id="name-header">
          <th></th>
        </tr>
      </thead>
      <tbody id="stats-rows">
        <tr id="max-round-score"></tr>
        <tr id="avg-round-score"></tr>
        <tr id="standard-dev"></tr>
        <tr id="rounds-won"></tr>
      </tbody>
    </table>
  );
};

export default Table;
