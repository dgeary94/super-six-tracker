import React, { useState, useEffect } from "react";
import imgURL from "./assets/football.svg";
import Graph from "./components/Graph";
import { getSeasonData } from "./lib/seasonData";

function App() {
  // `season` drives the dropdown and the fetch; `shown` only updates once
  // that fetch resolves, so the previous graph stays on screen (no
  // unmount/"Loading..." flash) and Graph/Table never see a season/data
  // mismatch mid-fetch.
  const [season, setSeason] = useState("26-27");
  const [shown, setShown] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getSeasonData(season).then(({ players, graphData }) => {
      if (cancelled) return;
      setShown({ season, players, graphData });
    });
    return () => {
      cancelled = true;
    };
  }, [season]);

  return (
    <>
      <div id="title" class="flex flex-row items-center justify-center p-2">
        <img
          src={imgURL}
          alt="Logo"
          width="60"
          height="60"
          class="animate-spin"
        />
        <h1 class="mx-4 font-sans text-4xl font-semibold md:text-5xl">
          Super 6 League Tracker
        </h1>
      </div>
      <h2 class="font-sans text-xl font-semibold">
        QUE SERA SERA, WE'RE GOING TO WORMBELLY
      </h2>
      <div id="seasons" class="mt-4 py-2">
        <label htmlFor="season" class="text-lg">
          Season:
        </label>
        <select
          name="season"
          id="season-select"
          class="mx-2 cursor-pointer rounded border border-slate-300 bg-transparent p-1 hover:border-slate-400"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="26-27">2026/2027</option>
          <option value="25-26">2025/2026</option>
          <option value="24-25">2024/2025</option>
          <option value="23-24">2023/2024</option>
          <option value="22-23">2022/2023</option>
        </select>
      </div>
      {shown ? (
        <>
          <Graph
            season={shown.season}
            data={shown.graphData}
            players={shown.players}
          />
          <p class="font-sans">*Includes tied winners</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
