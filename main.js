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
  <div id="seasons">
    <label for="season">Season:</label>
    <select name="season" id="season-select">
      <option value="23-24" selected>2023/2024</option>
      <option value="22-23">2022/2023</option>
    </select>
  </div>
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
         width = currentWidth + margin.left;
         height = width/(defaultRatio);
        }
        return [width, height]
}

[width, height] = setSize();

// HTML for the stats table.
const statsTable =  `<table id="stats-table" width=${width * 1.2}>
<thead>
    <tr id="name-header">
      <th></th>
    </tr>
</thead>
<tbody>
    <tr id="max-round-score"></tr>
    <tr id="avg-round-score"></tr>
    <tr id="standard-dev"></tr>
    <tr id="rounds-won"></tr>
</tbody>
</table>`;

// Add event listener to season select toggle
const seasonToggle = document.getElementById('season-select');
seasonToggle.addEventListener('change', updateGraph);

// Update graph
updateGraph();

function updateGraph() {
  // Clear svg element
  document.getElementById('graph').innerHTML = '';

  // Get current dropdown value
  const currentValue = seasonToggle.value;
  //console.log(currentValue);

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

    // Define lists of season participants
    const seasonOneNames = ["andy", "david", "jake", "james", "jonnie", "josh", "sam"];
    const seasonTwoNames = ["andy", "david", "ed", "jack", "jake", "james", "jonnie", "josh", "sam"];
  
    // Get the data from the last 10 rounds
    //const lastTen = data.slice(-70);
    // Changing the data variable to lastTen gives only the last 10 rounds.
    // TODO Implement a toggle button and some conditional logic to set lastTen as data source.

    let graphData = null;
    
    if (currentValue === '22-23') {

      // Reformat the data: we need an array of arrays of {x, y} tuples
      graphData = seasonOneNames.map( function(name) { // .map allows to do something for each element of the list
        return {
          name: name,
          values: data.filter(function(d) {
            if (d.name === name) {return true;}
            return false;
          }).map(function(d) { return {round: +d.round, score:+d.score, score_sum: +d.score_sum} })
        };
      });
      //console.log(graphData);
    } else {

        // Reformat the data: we need an array of arrays of {x, y} tuples
        graphData = seasonTwoNames.map( function(name) { // .map allows to do something for each element of the list
          return {
            name: name,
            values: data.filter(function(d) {
              if (d.s2_name === name) {return true;}
              return false;
            }).map(function(d) { return {round: +d.s2_round, score:+d.s2_score, score_sum: +d.s2_score_sum} })
          };
        });
    }

    //console.log(graphData);
  
    // Functions for adding gridlines
    function addXGridlines() {  return d3.axisBottom(x).ticks();  }
    function addYGridlines() {  return d3.axisLeft(y).ticks();  }
  
    // Add X axis
    const x = d3.scaleLinear()
      .domain(currentValue === '22-23' ? [1,d3.max(data, function(d) {return +d.round})] : [1,d3.max(data, function(d) {return +d.s2_round})])
      .range([0,width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .style("font-size", "0.75rem")
      .call(d3.axisBottom(x)
      .ticks(currentValue === '22-23' ? d3.max(data, function(d) {return +d.round })/2 : d3.max(data, function(d) {return +d.s2_round })/2));
  
    // Add the X gridlines
    svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(addXGridlines()
      .tickSize(-height)
      .tickFormat("")
      .ticks(d3.max(data, function(d) {return currentValue === '22-23' ? +d.round : +d.s2_round})/2));
  
    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "center")
      .attr("x", (width - 50)/2)
      .attr("y", height + margin.bottom)
      .text("Round");
  
    // Add Y axis
    const y = d3.scaleLinear()
      //.domain([0, Math.ceil(d3.max(data, function(d) { return +d.score_sum; })/10)*10])
      .domain([d3.min(data, function(d) {return currentValue === '22-23' ? +d.score_sum: +d.s2_score_sum}), Math.ceil(d3.max(data, function(d) { return currentValue === '22-23' ? +d.score_sum: +d.s2_score_sum })/10)*10])
      .range([height, 0]);
    svg.append("g")
      .style("font-size", "0.75rem")
      .call(d3.axisLeft(y)
      //.ticks(currentValue === '22-23' ? width === defaultWidth ? d3.max(data, function(d) { return +d.score_sum })/20 : d3.max(data, function(d) { return +d.score_sum})/40 : 20))
      .ticks(width === defaultWidth ? d3.max(data, function(d) { return +d.score_sum })/20 : d3.max(data, function(d) { return +d.score_sum})/40));
  
      // Add the Y gridlines
    svg.append("g")			
      .attr("class", "grid")
      .call(addYGridlines()
      .tickSize(-width)
      .tickFormat("")
      //.ticks(currentValue === '22-23' ? width === defaultWidth ? d3.max(data, function(d) { return  +d.score_sum })/20 : d3.max(data, function(d) { return +d.score_sum })/10 : 20))
      .ticks(width === defaultWidth ? d3.max(data, function(d) { return  +d.score_sum })/20 : d3.max(data, function(d) { return +d.score_sum })/10));
  
    // Add Y axis label
    svg.append("text")
      .attr("text-anchor", "center")
      .attr("transform", width === defaultWidth ? "rotate(0)": "rotate(-90)")
      .attr("x", width === defaultWidth ? -margin.left : -height/2)
      .attr("y", width === defaultWidth ? height/2 : -margin.top)
      .text("Points");
  
    // Creating the colour scheme
    const myColor = d3.scaleOrdinal()
      .domain(currentValue === '22-23' ? seasonOneNames : seasonTwoNames)
      .range(d3.schemeTableau10);
  
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
      .data(currentValue === '22-23' ? seasonOneNames : seasonTwoNames)
      .enter()
      .append("circle")
        .attr("cx", function(d,i) {
          if (currentValue === '22-23') {
            return width === defaultWidth ? 0 + i*100 : 0 + i*70;
          } else {
            return width === defaultWidth ? -20 + i*80 : -30 + i*60;
          }})
        .attr("cy", -20)
        .attr("r", 5)
        .style("fill", d => myColor(d));
  
    // Add legend labels for each name next to each dot.
    const labels = svg.selectAll("myLabels")
      .data(currentValue === '22-23' ? seasonOneNames : seasonTwoNames)
      .enter()
      .append("text")
        .attr("x", function(d,i) {
          if (currentValue === '22-23') {
            return width === defaultWidth ? 7 + i*100 : 7 + i*70; 
          } else {
            return width === defaultWidth ? -13 + i*80 : -23 + i*60;
          }})
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
      
      updateTable(graphData);
  
    });

}

function updateTable(data) {
  //console.log("Update the table.");

  // Check if table already exists in the DOM
  if (document.getElementById('stats-table') === null) {
    //console.log("Table does not exist yet!");

    d3.select("#app").append("div").html(statsTable);

    // Add p tag to display rounds won explanation
    d3.select("#app").append("p").html("* Includes tied winners.");
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

  // Obtain the top score from each round
  const topScore = [];
  for (let i = 0; i < individualScores[0].length; i++) {
    let currentTopScore = 0
    for (let j = 0; j < individualScores.length; j++) {
      if(individualScores[j][i] > currentTopScore) {
        currentTopScore = individualScores[j][i]
      }
    }
    topScore.push(currentTopScore);
  }

  // Create empty array to store rounds won per player
  let numberOfRoundsWon = new Array(individualScores.length).fill(0);
  
  for (let i = 0; i < topScore.length; i++) {
    for (let j = 0; j < individualScores.length; j++) {
      if(individualScores[j][i] === topScore[i]) {
        numberOfRoundsWon[j] += 1;
      }
    }
  }

  // Select DOM elements
  const nameHeader = document.getElementById('name-header');
  const maxRound = document.getElementById('max-round-score');
  const avgRound = document.getElementById('avg-round-score');
  const stDev = document.getElementById('standard-dev');
  const roundsWon = document.getElementById('rounds-won');

  // Push names of data to a new array
  let names = [];
  for (let i=0; i<data.length; i++) {
    names.push(data[i].name);
  }

  // Capitalise each name in names
  for (let i=0; i<names.length; i++) {
    let name = names[i];
    let capName = name.charAt(0).toUpperCase() + name.slice(1);
    names[i] = capName;
  }

  // Clear contents of stats table
  nameHeader.innerHTML = '';
  maxRound.innerHTML = '';
  avgRound.innerHTML = '';
  stDev.innerHTML = '';
  roundsWon.innerHTML = '';

  nameHeader.innerHTML = `<th></th>`;
  // Select name header and add <th> for all names
  for (let i=0; i<names.length; i++) {
    nameHeader.innerHTML += `<th>${names[i]}</th>`;
  }

  // Populate table with values

  maxRound.innerHTML = `<td>Best Round</td>`
  for (let idx = 0; idx < individualScores.length; idx++) {
    maxRound.innerHTML += `<td>${d3.max(individualScores[idx])}</td>`
  };

  avgRound.innerHTML = `<td>Avg Round</td>`
  for (let idx = 0; idx < individualScores.length; idx++) {
    avgRound.innerHTML += `<td>${Math.round(d3.mean(individualScores[idx]) * 10)/10}</td>`
  };

  stDev.innerHTML = `<td>Std Dev</td>`
  for (let idx = 0; idx < individualScores.length; idx++) {
    stDev.innerHTML += `<td>${Math.round(d3.deviation(individualScores[idx]) * 10)/10}</td>`
  };

  roundsWon.innerHTML = `<td>Rounds Won<sup>*</sup></td>`
  for (let idx = 0; idx < individualScores.length; idx++) {
    roundsWon.innerHTML += `<td>${numberOfRoundsWon[idx]}</td>`
  };
}

