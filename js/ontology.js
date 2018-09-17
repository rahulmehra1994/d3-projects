var data = [
  {
    n1: [
      ["1", "in"],
      ["2", "out"],
      ["3", "in"],
      ["4", "in"],
      ["5", "out"],
      ["1", "in"],
      ["2", "out"],
      ["3", "in"],
      ["4", "in"],
      ["5", "out"]
    ]
  }
];

var markers = [
  {
    id: 0,
    name: "circle",
    path: "M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0",
    viewbox: "-6 -6 12 12"
  },
  {
    id: 1,
    name: "square",
    path: "M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z",
    viewbox: "-5 -5 10 10"
  },
  {
    id: 2,
    name: "arrow",
    path: "M 0,0 m -5,-5 L 5,0 L -5,5 Z",
    viewbox: "-5 -5 10 10"
  },
  {
    id: 2,
    name: "stub",
    path: "M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z",
    viewbox: "-1 -5 2 10"
  }
];

var width = 1000;
var height = 1000;
//Make an SVG Container
var svgContainer = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var tempData = data[0][Object.keys(data[0])[0]];
var offset = 30 * [tempData.length * 0.2];
var len = tempData.length;

var originX = 350;
var originY = 350;
var innerCircleRadius = 20;
var outerCircleRadius = 10;
var offset = 30;
var angle = 10;
var radius = 10;
var basicOffset = 10;

var gap = 10;

var chunkSize = outerCircleRadius * 2 + gap * 2;

function adjuster(r) {
  var circum = 2 * Math.PI * r;
  var count = circum / chunkSize;
  console.log("adjuster ", r, chunkSize, circum / chunkSize, len);
  if (count > len) {
    radius = r;
    return;
  } else {
    adjuster(r + 1);
  }
}

adjuster(radius);
console.log(radius);

var scaleX = d3.scale
  .linear()
  .domain([0, tempData.length])
  .range([0, width]);

var scaleY = d3.scale
  .linear()
  .domain([0, tempData.length])
  .range([0, height]);

var circles = svgContainer
  .selectAll("circle")
  .data(tempData)
  .enter()
  .append("circle")
  .attr("cx", function(d, i) {
    return originX + (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len);
  })
  .attr("cy", function(d, i) {
    return originY - (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len);
  })
  .attr("r", function(d, i) {
    return outerCircleRadius;
  })
  .attr("fill", "red");

  var color = d3.scale.category10()

var marker = svgContainer
  .append("svg:defs")
  .selectAll("marker")
  .data(markers)
  .enter()
  .append("svg:marker")
  .attr("id", function(d) {
    return "marker_" + d.name;
  })
  .attr("markerHeight", 5)
  .attr("markerWidth", 5)
  .attr("markerUnits", "strokeWidth")
  .attr("orient", "auto")
  .attr("refX", outerCircleRadius + 10)
  .attr("refY", 0)
  .attr("viewBox", function(d) {
    return d.viewbox;
  })
  .append("svg:path")
  .attr("d", function(d) {
    return d.path;
  })
  .attr("fill", function(d, i) {
    return color(i);
  });

var lines = svgContainer
  .selectAll("line")
  .data(tempData)
  .enter()
  .append("line")
  .attr("x1", originX)
  .attr("y1", originY)
  .attr("x2", function(d, i) {
    return originX + (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len);
  })
  .attr("y2", function(d, i) {
    return originY - (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len);
  })
  .attr("marker-end", function(d) {
    if (d[1] === "out") {
      return "url(#marker_circle)";
    }
  })
  .attr("stroke", "red")
  .attr("stroke-width", 2);



var text = svgContainer
  .selectAll("text")
  .data(tempData)
  .enter()
  .append("text");

basicOffset = basicOffset + 20;

var texts = text
  .attr("x", function(d, i) {
    console.log(d);
    return originX + (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len);
  })
  .attr("y", function(d, i) {
    return originY - (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len);
  })
  .text(function(d, i) {
    return i;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "red")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(0, 5)");

// svgContainer
//   .append("circle")
//   .attr("cx", originX)
//   .attr("cy", originY)
//   .attr("r", radius * 0.5)
//   .fill('color', 'lightgrey');
