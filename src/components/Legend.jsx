import React from "react";

const Legend = ({
  players,
  colourScale,
  onLegendClick,
  toggledPlayers,
  width,
}) => {
  return (
    <div id="legend-container" style={{ textAlign: "center", width: width }}>
      {players.map((player) => (
        <div
          key={player}
          className="legend-label"
          style={{
            color: colourScale(player),
            opacity: toggledPlayers.includes(player) ? "0.33" : "1",
            cursor: "pointer",
            display: "inline-block",
            padding: "5px 10px",
            fontSize: "1rem",
          }}
          onClick={() => onLegendClick(player)}
        >
          {player}
        </div>
      ))}
    </div>
  );
};

export default Legend;
