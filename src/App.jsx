import React, { useState, useLayoutEffect } from "react";
import imgURL from "./assets/football.svg";
import Graph from "./components/Graph";
import Table from "./components/Table";
import * as d3 from "d3";
import csvData from "./super-six-scores.csv";

// Define lists of season participants
const seasonOneNames = [
  "andy",
  "david",
  "jake",
  "james",
  "jonnie",
  "josh",
  "sam",
];
const seasonTwoNames = [
  "andy",
  "david",
  "ed",
  "jack",
  "jake",
  "james",
  "jonnie",
  "josh",
  "sam",
];
const seasonThreeNames = [
  "andy",
  "david",
  "ed",
  "jack",
  "jake",
  "james",
  "jonnie",
  "josh",
  "sam",
];

const rawData = await d3.csv(csvData);
console.log("Retrieved raw data.");

function App() {
  const [season, setSeason] = useState("24-25");
  const [graphData, setGraphData] = useState({});
  const [players, setPlayers] = useState(seasonThreeNames);

  useLayoutEffect(() => {
    const getData = (season) => {
      console.log("Effect triggered.");
      console.log(`season is: ${season}`);
      let seasonData = null;
      switch (season) {
        case "22-23":
          console.log("Getting S1 data...");
          seasonData = seasonOneNames.map(function (name) {
            return {
              name: name,
              values: rawData
                .filter((d) => d.name === name)
                .map((d) => ({
                  round: +d.round,
                  score: +d.score,
                  score_sum: +d.score_sum,
                })),
            };
          });
          break;
        case "23-24":
          console.log("Getting S2 data...");
          seasonData = seasonTwoNames.map(function (name) {
            return {
              name: name,
              values: rawData
                .filter((d) => d.s2_name === name)
                .map((d) => ({
                  round: +d.s2_round,
                  score: +d.s2_score,
                  score_sum: +d.s2_score_sum,
                })),
            };
          });
          break;
        case "24-25":
          console.log("Getting S3 data...");
          seasonData = seasonThreeNames.map(function (name) {
            return {
              name: name,
              values: rawData
                .filter((d) => d.s3_name === name)
                .map((d) => ({
                  round: +d.s3_round,
                  score: +d.s3_score,
                  score_sum: +d.s3_score_sum,
                  correct_results: +d.s3_correct_results,
                  correct_scores: +d.s3_correct_scores,
                })),
            };
          });
          break;
        default:
          console.log("No recognised season toggle!");
      }
      console.log("Setting state...");
      setGraphData(seasonData);
      setPlayers(
        season === "22-23"
          ? seasonOneNames
          : season === "23-24"
          ? seasonTwoNames
          : seasonThreeNames
      );
    };
    getData(season);
  }, [season]);

  return (
    <>
      <div id="title">
        <img id="football" src={imgURL} alt="Logo" width="60" height="60" />
        <h1>Super 6 League Tracker</h1>
      </div>
      <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
      <div id="seasons">
        <label htmlFor="season">Season:</label>
        <select
          name="season"
          id="season-select"
          value={season}
          onChange={(e) => {
            setGraphData({});
            setSeason(e.target.value);
          }}
        >
          <option value="24-25">2024/2025</option>
          <option value="23-24">2023/2024</option>
          <option value="22-23">2022/2023</option>
        </select>
      </div>
      {Object.keys(graphData).length > 0 ? (
        <Graph
          season={season}
          data={graphData}
          rawData={rawData}
          players={players}
        />
      ) : (
        <p>Loading...</p>
      )}
      {Object.keys(graphData).length > 0 ? (
        <Table data={graphData} season={season} width={"100"} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
