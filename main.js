import './style.css'
import csv from "./super-six-scores.csv"
import imgURL from './football.svg'

// Insert initial DOM elements
document.querySelector('#app').innerHTML = `
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;

// Add football image
document.getElementById('football').src = imgURL;

// Set the dimensions and margins of the graph
const margin = {top: 40, right: 80, bottom: 40, left: 80};
const defaultWidth = 800 - margin.left - margin.right;
const defaultHeight = 500 - margin.top - margin.bottom;
const defaultRatio = defaultWidth / defaultHeight;
let width = null;
let height = null;

function setSize(width, height) {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const currentRatio = currentWidth / currentHeight;

    // For desktop sized screens
    if (currentRatio > defaultRatio) {
      height = defaultHeight;
      width = defaultWidth;}
    else { // For mobile
         width = currentWidth + margin.left + margin.right;
         height = width/(defaultRatio);
        }
        return [width, height]
}

[width, height] = setSize();

 // // Create and add table html element
 document.querySelector('#app').innerHTML += `<table width=${width}>
 <thead>
     <tr>
       <th></th>
       <th>Andy</th>
       <th>David</th>
       <th>Jake</th>
       <th>James</th>
       <th>Jonnie</th>
       <th>Josh</th>
       <th>Sam</th>
     </tr>
 </thead>
 <tbody>
     <tr id="max-round-score">
       <td>Best Round</td>
     </tr>
     <tr id="avg-round-score">
     <td>Average Round</td>
     </tr>
     <tr id="standard-dev">
     <td>Standard Deviation</td>
 </tbody>
 </table>`;

// Append the svg object to the body of the page
const svg = d3.select("#graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

// Read data from csv file
d3.csv(csv).then( function(data) {

  const allNames = ["andy", "david", "jake", "james", "jonnie", "josh", "sam"];

  // Get the data from the last 10 rounds
  //const lastTen = data.slice(-70);
  // Changing the data variable to lastTen gives only the last 1o rounds.
  // TODO Implement a toggle button and some conditional logic to set lastTen as data source.


  // Reformat the data: we need an array of arrays of {x, y} tuples
  const graphData = allNames.map( function(name) { // .map allows to do something for each element of the list
    return {
      name: name,
      values: data.filter(function(d) {
        if (d.name === name) {return true;}
        return false;
      }).map(function(d) { return {round: +d.round, score:+d.score, score_sum: +d.score_sum} })
    };
  });

  // Functions for adding gridlines
  function addXGridlines() {  return d3.axisBottom(x).ticks();  }
  function addYGridlines() {  return d3.axisLeft(y).ticks();  }

  // Add X axis
  const x = d3.scaleLinear()
    .domain([d3.min(data, function(d) {return +d.round}),d3.max(data, function(d) {return +d.round})])
    .range([0,width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .style("font-size", "0.75rem")
    .call(d3.axisBottom(x)
    .ticks(d3.max(data, function(d) {return +d.round})/2));

  // Add the X gridlines
  svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(addXGridlines()
    .tickSize(-height)
    .tickFormat("")
    .ticks(d3.max(data, function(d) {return +d.round})/2));

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "center")
    .attr("x", (width - 50)/2)
    .attr("y", height + margin.bottom)
    .text("Round");

  // Add Y axis
  const y = d3.scaleLinear()
    //.domain([0, Math.ceil(d3.max(data, function(d) { return +d.score_sum; })/10)*10])
    .domain([d3.min(data, function(d) {return +d.score_sum}), Math.ceil(d3.max(data, function(d) { return +d.score_sum; })/10)*10])
    .range([height, 0]);
  svg.append("g")
    .style("font-size", "0.75rem")
    .call(d3.axisLeft(y)
    .ticks(width === defaultWidth ? d3.max(data, function(d) { return +d.score_sum })/20 : d3.max(data, function(d) { return +d.score_sum })/40));

   // Add the Y gridlines
  svg.append("g")			
    .attr("class", "grid")
    .call(addYGridlines()
    .tickSize(-width)
    .tickFormat("")
    .ticks(width === defaultWidth ? d3.max(data, function(d) { return +d.score_sum })/20 : d3.max(data, function(d) { return +d.score_sum })/10));

  // Add Y axis label
  svg.append("text")
    .attr("text-anchor", "center")
    .attr("x", -margin.left)
    .attr("y", height/2)
    .text("Points");

  // Creating the colour scheme
  const myColor = d3.scaleOrdinal()
    .domain(allNames)
    .range(d3.schemeDark2);

  // Add the lines
  const line = d3.line()
  .x(d => x(+d.round))
  .y(d => y(+d.score_sum));
  
  const lines = svg.selectAll("myLines")
    .data(graphData)
    .join("path")
    .attr("d", d => line(d.values))
    .attr("stroke", d => myColor(d.name))
    .style("stroke-width", 2)
    .style("fill", "none");

  // Create legend dots
  const dots = svg.selectAll("myDots")
    .data(allNames)
    .enter()
    .append("circle")
      .attr("cx", function(d,i) { return width === defaultWidth ? 0 + i*100 : 0 + i*80 })
      .attr("cy", -20)
      .attr("r", 5)
      .style("fill", d => myColor(d));

  // Add legend labels for each name next to each dot.
  const labels = svg.selectAll("myLabels")
    .data(allNames)
    .enter()
    .append("text")
      .attr("x", function(d,i) { return width === defaultWidth ? 10 + i*100 : 8 + i*80 })
      .attr("y", -15)
      .attr("class", "legend-label")
      .style("fill", d => myColor(d))
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      // Add on click function to toggle the opacity of each legend.
      .on("click", (d,i) => {

        // Get legend names
        const legendNames = labels.selectAll("g")._parents;
        let legendSelect = null;
        for (let idx = 0; idx < legendNames.length; idx++) {
          if (i === legendNames[idx].innerHTML) {
            legendSelect = legendNames[idx];
            break
          }
        }

        // Get line names
        const lineNames = lines.selectAll("path")._parents;
        let lineSelect = null;
        for (let idx = 0; idx < lineNames.length; idx++) {
          if (myColor(i) === lineNames[idx].attributes.stroke.value) {
            lineSelect = lineNames[idx];
            break
          }
        }

        // Get dots
        const dotNames = dots.selectAll("g")._parents;
        let dotSelect = null;
        for (let idx = 0; idx < dotNames.length; idx++) {
          let computedStyle = window.getComputedStyle(dotNames[idx]);
          if (`${d3.color(myColor(i)).formatRgb()}` === computedStyle.getPropertyValue("fill")) {
            dotSelect = dotNames[idx];
            break
          }
        }
        
        // Toggle legend opacity
        d3.select(legendSelect).style("opacity", () => {
          return d3.select(legendSelect).style("opacity") === "1" ? "0.33" : "1";
        });

        // Toggle line opacity
        d3.select(lineSelect).style("opacity", () => {
          return d3.select(lineSelect).style("opacity") === "1" ? "0" : "1";
        });

        // Toggle dot opacity
        d3.select(dotSelect).style("opacity", () => {
          if (window.getComputedStyle(dotSelect).getPropertyValue("opacity") === "1") { return "0.33"; } else {  return "1"; }
          });
      });

  const individualScores = [];
  for (let i = 0; i < graphData.length; i++) {
    let scores = [];
    for (let j = 0; j < graphData[i].values.length; j++) {
      scores.push(graphData[i].values[j].score);
    }
    individualScores.push(scores);
  }

  const maxRound = document.getElementById('max-round-score');
  const avgRound = document.getElementById('avg-round-score');
  const stDev = document.getElementById('standard-dev');
  
  for (let idx = 0; idx < individualScores.length; idx++) {
    maxRound.innerHTML += `<td>${d3.max(individualScores[idx])}</td>`
  };

  for (let idx = 0; idx < individualScores.length; idx++) {
    avgRound.innerHTML += `<td>${Math.round(d3.mean(individualScores[idx]) * 10)/10}</td>`
  };

  for (let idx = 0; idx < individualScores.length; idx++) {
    stDev.innerHTML += `<td>${Math.round(d3.deviation(individualScores[idx]) * 10)/10}</td>`
  };

});
