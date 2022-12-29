import './style.css'
import csv from "./super-six-scores.csv"

// Insert DOM elements
document.querySelector('#app').innerHTML = `
    <h1>&#9917 Super 6 League Tracker</h1>
    <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
    <p>Click each name to toggle data series.</p>
    <div id="graph"><div>`;

// Set the dimensions and margins of the graph
const margin = {top: 40, right: 90, bottom: 40, left: 80};
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
    else { //mobile
         width = currentWidth;
         height = width/defaultRatio;
        }
        return [width, height]
}

[width, height] = setSize();

 // // Create table html element
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
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

// Read data from csv file
d3.csv(csv).then( function(data) {

  const allNames = ["andy", "david", "jake", "james", "jonnie", "josh", "sam"];

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
    .style("font-size", "12px")
    .call(d3.axisBottom(x));

  // Add the X gridlines
  svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(addXGridlines()
    .tickSize(-height)
    .tickFormat(""));

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "center")
    .attr("x", (width - 50)/2)
    .attr("y", height + margin.bottom)
    .text("Round");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, Math.ceil(d3.max(data, function(d) { return +d.score_sum; })/10)*10])
    .range([height, 0]);
  svg.append("g")
    .style("font-size", "12px")
    .call(d3.axisLeft(y));

   // Add the Y gridlines
  svg.append("g")			
    .attr("class", "grid")
    .call(addYGridlines()
    .tickSize(-width)
    .tickFormat(""));

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

  // Add the points
  // const points = svg
  // // First we need to enter in a group
  // .selectAll("myDots")
  // .data(graphData)
  // .join('g')
  //   .style("fill", d => myColor(d.name))
  // // Second we need to enter in the 'values' part of this group
  // .selectAll("myPoints")
  // .data(d => d.values)
  // .join("circle")
  //   .attr("cx", d => x(d.round))
  //   .attr("cy", d => y(d.score))
  //   .attr("r", 3)
  //   .attr("stroke", "white")
  
  //console.log(graphData);

  // Add a legend at the end of each line
  const legend = svg.selectAll("myLabels")
    .data(graphData)
    .join('g')
      .append("text")
        .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each round series
        .attr("transform",d => `translate(${x(d.value.round)},${y(d.value.score_sum)})`) // Put the text at the position of the last point
        //.attr("transform",(d,i) => `translate(${x(d.value.round)},${y(d3.max(data, function(d) { return +d.score_sum; }) - (i*20) - 10)})`) // Put the text at the position of the last point
        .attr("x",d => {if(d.name === "andy" || d.name === "sam"){return 52}else {return 12}}) // shift the text a bit more right
        .text(d => d.name)
        .style("fill", d => myColor(d.name))
        .style("font-size", "15px")
        .style("border", "solid")
        // Add on click function to toggle the opacity of each legend.
        .on("click", (d,i) => {

          //console.log('Clicked!');
          // Get legend names
          const legendNames = legend.selectAll("g")._parents;
          let legendSelect = null;
          for (let idx = 0; idx < legendNames.length; idx++) {
            if (i.name === legendNames[idx].innerHTML) {
              legendSelect = legendNames[idx];
              break
            }
          }

          // Get line names
          const lineNames = lines.selectAll("path")._parents;
          let lineSelect = null;
          for (let idx = 0; idx < lineNames.length; idx++) {
            if (myColor(i.name) === lineNames[idx].attributes.stroke.value) {
              lineSelect = lineNames[idx];
              break
            }
          }
          
          // Toggle legend opacity
          d3.select(legendSelect).style("opacity", () => {
            if (d3.select(legendSelect).style("opacity") === "1") { return "0.33";  } else {  return "1"; }}
            );

          // Toggle line opacity
          d3.select(lineSelect).style("opacity", () => {
            if (d3.select(lineSelect).style("opacity") === "1") { return "0"; } else {  return "1"; }}
            );
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
