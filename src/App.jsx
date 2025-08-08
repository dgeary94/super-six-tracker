import React from "react";
import imgURL from "./assets/football.svg";

function App() {
  return (
    <>
      <div id="title">
        <img id="football" src={imgURL} alt="Logo" width="60" height="60"/>
        <h1>Super 6 League Tracker</h1>
      </div>
      <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
      <div id="seasons">
        <label for="season">Season:</label>
        <select name="season" id="season-select">
          <option value="24-25" selected>2024/2025</option>
          <option value="23-24">2023/2024</option>
          <option value="22-23">2022/2023</option>
        </select>
      </div>
      <p>Click each name to toggle data series.</p>
      <div id="legend-container"></div>
      <div id="graph"></div>
    </>
  );
}

export default App;
