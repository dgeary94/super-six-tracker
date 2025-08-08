import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import csvData from "../super-six-scores.csv";

// Dimensions
const margin = { top: 20, right: 80, bottom: 40, left: 80 };
const defaultWidth = 800 - margin.left - margin.right;
const defaultHeight = 500 - margin.top - margin.bottom;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Graph = () => {
  const [season, setSeason] = useState("24-25");
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const graphRef = useRef(null);
  const legendRef = useRef(null);

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

  const debouncedWidth = useDebounce(width, 500);
  const debouncedHeight = useDebounce(height, 500);

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [debouncedWidth, debouncedHeight]);

  useEffect(() => {
    if (!graphRef.current) return;

    // Clear previous graph and legend
    d3.select(graphRef.current).selectAll("*").remove();
    d3.select(legendRef.current).selectAll("*").remove();

    const svg = d3
      .select(graphRef.current)
      .append("svg")
      .attr("width", `${width + margin.left + margin.right}px`)
      .attr("height", `${height + margin.top + margin.bottom}px`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const legendContainer = d3
      .select(legendRef.current)
      .style("width", `${width}px`);

    d3.csv(csvData).then(function (data) {
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

      let graphData = null;

      switch (season) {
        case "22-23":
          graphData = seasonOneNames.map(function (name) {
            return {
              name: name,
              values: data
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
          graphData = seasonTwoNames.map(function (name) {
            return {
              name: name,
              values: data
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
          graphData = seasonThreeNames.map(function (name) {
            return {
              name: name,
              values: data
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

      // Functions for adding gridlines
      function addXGridlines() {
        return d3.axisBottom(x).ticks();
      }
      function addYGridlines() {
        return d3.axisLeft(y).ticks();
      }

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain([
          1,
          d3.max(
            data,
            (d) =>
              season === "22-23"
                ? +d.round
                : season === "23-24"
                ? +d.s2_round
                : +d.s3_round
          ),
        ])
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "0.75rem")
        .call(
          d3
            .axisBottom(x)
            .ticks(
              d3.max(
                data,
                (d) =>
                  season === "22-23"
                    ? +d.round
                    : season === "23-24"
                    ? +d.s2_round
                    : +d.s3_round
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
              d3.max(
                data,
                (d) => (season === "22-23" ? +d.round : +d.s2_round)
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

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([
          d3.min(
            data,
            (d) =>
              season === "22-23"
                ? +d.score_sum
                : season === "23-24"
                ? +d.s2_score_sum
                : +d.s3_score_sum
          ),
          Math.ceil(
            d3.max(
              data,
              (d) =>
                season === "22-23"
                  ? +d.score_sum
                  : season === "23-24"
                  ? +d.s2_score_sum
                  : +d.s3_score_sum
            ) / 10
          ) * 10,
        ])
        .range([height, 0]);
      svg
        .append("g")
        .style("font-size", "0.75rem")
        .call(
          d3
            .axisLeft(y)
            .ticks(
              width === defaultWidth
                ? d3.max(data, (d) => +d.score_sum) / 40
                : d3.max(data, (d) => +d.score_sum) / 40
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
              width === defaultWidth
                ? d3.max(data, (d) => +d.score_sum) / 10
                : d3.max(data, (d) => +d.score_sum) / 10
            )
        );

      // Add Y axis label
      svg
        .append("text")
        .attr("text-anchor", "center")
        .attr(
          "transform",
          width === defaultWidth ? "rotate(0)" : "rotate(-90)"
        )
        .attr("x", width === defaultWidth ? -margin.left : -height / 2)
        .attr("y", width === defaultWidth ? height / 2 : -margin.top * 2)
        .text("Points");

      // Creating the colour scheme
      const myColor = d3
        .scaleOrdinal()
        .domain(season === "22-23" ? seasonOneNames : seasonTwoNames)
        .range(d3.schemeTableau10);

      // Add the lines
      const line = d3
        .line()
        .x((d) => x(+d.round))
        .y((d) => y(+d.score_sum));

      const lines = svg
        .selectAll("myLines")
        .data(graphData)
        .join("path")
        .attr("d", (d) => line(d.values))
        .attr("stroke", (d) => myColor(d.name))
        .style("stroke-width", 2)
        .style("fill", "none");

      // Add legend labels
      const labels = legendContainer
        .selectAll("myLabels")
        .data(
          season === "22-23"
            ? seasonOneNames
            : season === "23-24"
            ? seasonTwoNames
            : seasonThreeNames
        )
        .enter()
        .append("div")
        .attr("class", "legend-label")
        .style("color", (d) => myColor(d))
        .text((d) => d)
        .style("alignment-baseline", "middle")
        .on("click", (event, d) => {
          const clickedName = d;
          const isCurrentlyVisible =
            d3.select(event.currentTarget).style("opacity") === "1";

          // Toggle legend opacity
          d3.select(event.currentTarget).style(
            "opacity",
            isCurrentlyVisible ? "0.33" : "1"
          );

          // Toggle line opacity
          lines
            .filter((lineData) => lineData.name === clickedName)
            .style("opacity", isCurrentlyVisible ? "0" : "1");
        });

      // Set initial opacity for all legends and lines
      labels.style("opacity", "1");
      lines.style("opacity", "1");

      // TODO: Refactor updateTable into its own component
    });
  }, [season, debouncedWidth, debouncedHeight]); // Rerun effect if season, width or height changes

  return (
    <div>
      <div id="seasons">
        <label htmlFor="season">Season:</label>
        <select
          name="season"
          id="season-select"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="24-25">2024/2025</option>
          <option value="23-24">2023/2024</option>
          <option value="22-23">2022/2023</option>
        </select>
      </div>
      <p>Click each name to toggle data series.</p>
      <div id="legend-container" ref={legendRef}></div>
      <div id="graph" ref={graphRef}></div>
    </div>
  );
};

export default Graph;