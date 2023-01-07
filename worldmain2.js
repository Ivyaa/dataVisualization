
const mysvg = d3.select("svg"),
width2 = +svg.attr("width"),
height2 = +svg.attr("height");

// Map and projection


function click(){
metric =this.dataset.name;
console.log(metric);
update(metric);
}


const path2 = d3.geoPath();
const projection2 = d3.geoMercator()
.scale(120)
.center([0,20])
.translate([width2 / 2, height2 / 2]);

// Data and color scale
const data2 = new Map();
const colorScale2 = d3.scaleThreshold()
.domain([0, 100, 1000, 10000, 100000, 1000000, 4000000])
.range(d3.schemeYlOrBr[8]);


// Load external data and boot
Promise.all([
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
d3.csv("data/new_data.csv", function(d) {
data2.set(d.Code, +d.HIV_AIDS)
})]).then(function(loadData){
let topo = loadData[0]

let mouseOver = function(d) {
d3.selectAll(".Country")
  .transition()
  .duration(200)
  .style("opacity", .5)
d3.select(this)
  .transition()
  .duration(200)
  .style("opacity", 1)
  .style("stroke", "black")
console.log(this)
}

let mouseLeave = function(d) {
d3.selectAll(".Country")
  .transition()
  .duration(200)
  .style("opacity", .8)
d3.select(this)
  .transition()
  .duration(200)
  .style("stroke", "transparent")
}

// Draw the map
mysvg.append("g")
.selectAll("path")
.data(topo.features)
.enter()
.append("path")
  // draw each country
  .attr("d", d3.geoPath()
  .projection(projection2)
  )
  // set the color of each country
  .attr("fill", function (d) {
  d.total = data.get(d.id) || 0;
  return colorScale(d.total);
  })
  .style("stroke", "transparent")
  .attr("class", function(d){ return "Country" } )
  .style("opacity", .8)
  .on("mouseover", mouseOver )
  .on("mouseleave", mouseLeave )

})