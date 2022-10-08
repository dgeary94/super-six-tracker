import './style.css'

// Insert DOM elements
document.querySelector('#app').innerHTML = `
    <h1>&#9917 Super 6 League Tracker</h1>
    <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
    <div id=graph><div>`

// Set the dimensions and margins of the graph
const margin = {top: 50, right: 90, bottom: 50, left: 100};
const defaultWidth = 800 - margin.left - margin.right;
const defaultHeight = 500 - margin.top - margin.bottom;
const defaultRatio = defaultWidth / defaultHeight;
let width = null;
let height = null;

function setSize(width, height) {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    const currentRatio = currentWidth / currentHeight;

    // desktop ratio
    if (currentRatio > defaultRatio) {
      height = defaultHeight;
      width = defaultWidth;}
    else { //mobile
         //margin.left = 20;
         width = currentWidth;
         height = width/defaultRatio;
        }
        return [width, height]
}

[width, height] = setSize();

console.log(width, height);

// Append the svg object to the body of the page
const svg = d3.select("#graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

// Read data
d3.csv("./data/super-six-scores.csv").then( function(data) {

  // List of groups (here I have one group per column)
  const allGroup = ["andy", "david", "jake", "james", "jonnie", "josh", "sam"];

  // Reformat the data: we need an array of arrays of {x, y} tuples
  const dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data.filter(function(d) {
        if (d.name === grpName) {
          return true;
        }
        return false;
      }).map(function(d) { return {round: +d.round, score: +d.score_sum} })
    };
  });

  //console.log(dataReady);

  // Add X axis
  const x = d3.scaleLinear()
    .domain([d3.min(data, function(d) {return +d.round}),d3.max(data, function(d) {return +d.round})])
    .range([0,width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .style("font-size", "12px")
    .call(d3.axisBottom(x));

  // gridlines in x axis function
  function make_x_gridlines() {		
    return d3.axisBottom(x).ticks();
    }

  // add the X gridlines
  svg.append("g")			
  .attr("class", "grid")
  .attr("transform", "translate(0," + height + ")")
  .call(make_x_gridlines()
      .tickSize(-height)
      .tickFormat("")
  )

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "center")
    .attr("x", (width - 50)/2)
    .attr("y", height + margin.bottom)
    .text("Round");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.score_sum; })])
    .range([height, 0]);
  svg.append("g")
    .style("font-size", "12px")
    .call(d3.axisLeft(y));

  // gridlines in y axis function
  function make_y_gridlines() {		
    return d3.axisLeft(y).ticks()
    }

   // add the Y gridlines
   svg.append("g")			
   .attr("class", "grid")
   .call(make_y_gridlines()
       .tickSize(-width)
       .tickFormat("")
   )

  // Add Y axis label
  svg.append("text")
    .attr("text-anchor", "center")
    .attr("x", -margin.left)
    .attr("y", height/2)
    .text("Score");

  // A color scale: one color for each group
  const myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemeDark2);

  // Add the lines
  const line = d3.line()
  .x(d => x(+d.round))
  .y(d => y(+d.score))
    
  svg.selectAll("myLines")
    .data(dataReady)
    .join("path")
      .attr("d", d => line(d.values))
      .attr("stroke", d => myColor(d.name))
      .style("stroke-width", 2)
      .style("fill", "none")

  // Add the points
  svg
  // First we need to enter in a group
  .selectAll("myDots")
  .data(dataReady)
  .join('g')
    .style("fill", d => myColor(d.name))
  // Second we need to enter in the 'values' part of this group
  .selectAll("myPoints")
  .data(d => d.values)
  .join("circle")
    .attr("cx", d => x(d.round))
    .attr("cy", d => y(d.score))
    .attr("r", 3)
    .attr("stroke", "white")

// Add a legend at the end of each line
svg.selectAll("myLabels")
  .data(dataReady)
  .join('g')
    .append("text")
      .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each round series
      .attr("transform",d => `translate(${x(d.value.round)},${y(d.value.score)})`) // Put the text at the position of the last point
      .attr("x", d => {if(d.name === "jake"){return 55}else {return 12}}) // shift the text a bit more right
      .text(d => d.name)
      .style("fill", d => myColor(d.name))
      .style("font-size", 15);
});
