import React from "react";
import imgURL from "./assets/football.svg";
import Graph from "./components/Graph";

function App() {
  return (
    <>
      <div id="title">
        <img id="football" src={imgURL} alt="Logo" width="60" height="60"/>
        <h1>Super 6 League Tracker</h1>
      </div>
      <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
      <Graph />
    </>
  );
}

export default App;
