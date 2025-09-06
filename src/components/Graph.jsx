import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Legend from "./Legend";

// Dimensions
const margin = { top: 20, right: 80, bottom: 40, left: 80 };
const defaultWidth = 800 - margin.left - margin.right;
const defaultHeight = 500 - margin.top - margin.bottom;

// Colours
let colourPalette = d3.schemePaired;
colourPalette[10] = colourPalette[11]; // Convert last colour to brown

const Graph = ({ season, data, rawData, players }) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [toggledPlayers, setToggledPlayers] = useState([]);
  const graphRef = useRef(null);
  const linesRef = useRef(null);

  const setSize = () => {
    const defaultRatio = defaultWidth / defaultHeight;
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const currentRatio = currentWidth / currentHeight;

    if (currentRatio > defaultRatio) {
      setHeight(defaultHeight);
      setWidth(defaultWidth);
    } else {
      setWidth(currentWidth + margin.left);
      setHeight((currentWidth + margin.left) / defaultRatio);
    }
  };

  const handleLegendClick = (playerName) => {
    setToggledPlayers((prev) => {
      const isPlayerToggled = prev.includes(playerName);
      if (isPlayerToggled) {
        return prev.filter((p) => p !== playerName);
      } else {
        return [...prev, playerName];
      }
    });
  };

  const colourScale = d3.scaleOrdinal().domain(players).range(colourPalette);

  useEffect(() => {
    if (!graphRef.current) return;

    // Clear previous graph
    d3.select(graphRef.current).selectAll("*").remove();

    const svg = d3
      .select(graphRef.current)
      .append("svg")
      .attr("width", `${width + margin.left + margin.right}px`)
      .attr("height", `${height + margin.top + margin.bottom}px`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Functions for adding gridlines
    function addXGridlines() {
      return d3.axisBottom(x).ticks();
    }
    function addYGridlines() {
      return d3.axisLeft(y).ticks();
    }

    // Define X axis
    const x = d3
      .scaleLinear()
      .domain([
        1,
        d3.max(rawData, (d) =>
          season === "22-23"
            ? +d.round
            : season === "23-24"
            ? +d.s2_round
            : season === "24-25"
            ? +d.s3_round
            : +d.s4_round
        ),
      ])
      .range([0, width]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .style("font-size", "0.75rem")
      .call(
        d3
          .axisBottom(x)
          .ticks(
            d3.max(rawData, (d) =>
              season === "22-23"
                ? +d.round
                : season === "23-24"
                ? +d.s2_round
                : season === "24-25"
                ? +d.s3_round
                : +d.s4_round
            ) / 2
          )
      );

    // Add the X gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(
        addXGridlines()
          .tickSize(-height)
          .tickFormat("")
          .ticks(
            d3.max(rawData, (d) =>
              season === "22-23"
                ? +d.round
                : season === "23-24"
                ? +d.s2_round
                : season === "24-25"
                ? +d.s3_round
                : +d.s4_round
            ) / 2
          )
      );

    // Add X axis label
    svg
      .append("text")
      .attr("text-anchor", "center")
      .attr("x", (width - 50) / 2)
      .attr("y", height + margin.bottom)
      .text("Round");

    // Define Y axis
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(rawData, (d) =>
          season === "22-23"
            ? +d.score_sum
            : season === "23-24"
            ? +d.s2_score_sum
            : season === "24-25"
            ? +d.s3_score_sum
            : +d.s4_score_sum
        ),
        Math.ceil(
          d3.max(rawData, (d) =>
            season === "22-23"
              ? +d.score_sum
              : season === "23-24"
              ? +d.s2_score_sum
              : season === "24-25"
              ? +d.s3_score_sum
              : +d.s4_score_sum
          ) / 10
        ) * 10,
      ])
      .range([height, 0]);

    // Add Y axis
    svg
      .append("g")
      .style("font-size", "0.75rem")
      .call(
        d3
          .axisLeft(y)
          .ticks(
            width === defaultWidth
              ? d3.max(rawData, (d) => +d.score_sum) / 40
              : d3.max(rawData, (d) => +d.score_sum) / 40
          )
      );

    // Add the Y gridlines
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        addYGridlines()
          .tickSize(-width)
          .tickFormat("")
          .ticks(
            season === "22-23"
              ? d3.max(rawData, (d) => +d.score_sum) / 10
              : season === "23-24"
              ? d3.max(rawData, (d) => +d.s2_score_sum) / 10
              : season === "24-25"
              ? d3.max(rawData, (d) => +d.s3_score_sum) / 10
              : d3.max(rawData, (d) => +d.s4_score_sum)
          )
      );

    // Add Y axis label
    svg
      .append("text")
      .attr("text-anchor", "center")
      .attr("transform", width === defaultWidth ? "rotate(0)" : "rotate(-90)")
      .attr("x", width === defaultWidth ? -margin.left : -height / 2)
      .attr("y", width === defaultWidth ? height / 2 : -margin.top * 2)
      .text("Points");

    // Add the lines
    const line = d3
      .line()
      .x((d) => x(+d.round))
      .y((d) => y(+d.score_sum));

    linesRef.current = svg
      .selectAll("myLines")
      .data(data)
      .join("path")
      .attr("d", (d) => line(d.values))
      .attr("stroke", (d) => colourScale(d.name))
      .style("stroke-width", 2)
      .style("fill", "none");
  }, [season, data, rawData, players, width, height]);

  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.style("opacity", (d) =>
        toggledPlayers.includes(d.name) ? "0" : "1"
      );
    }
  }, [toggledPlayers]);

  useEffect(() => {
    setSize();
  }, []);

  return (
    <>
      <p>Click each name to toggle data series.</p>
      <Legend
        players={players}
        colourScale={colourScale}
        onLegendClick={handleLegendClick}
        toggledPlayers={toggledPlayers}
        width={width * 1.2}
      />
      <div id="graph" ref={graphRef}></div>
    </>
  );
};

export default Graph;
