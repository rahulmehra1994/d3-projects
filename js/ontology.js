var data = [
  {
    n1: [
      ["hello i am here", "in"],
      ["hello i am here", "out"],
      ["n3", "in"],
      ["n4", "out"],
      ["n5", "in"],
      ["n6", "in"],
      ["n7", "out"],
      ["n8", "in"],
      ["n9", "in"],
      ["hello i am here0", "out"],
      ["hello i am here", "in"],
      ["hello i am here", "out"],
      ["n3", "in"],
      ["n4", "out"],
      ["n5", "in"],
      ["n6", "in"],
      ["n7", "out"],
      ["n8", "in"],
      ["n9", "in"],
      ["hello i am here0", "out"],
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
    id: 3,
    name: "stub",
    path: "M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z",
    viewbox: "-1 -5 2 10"
  },
  {
    id: 4,
    name: "arrowIn",
    path: "M 0,0 m 5,5 L -5,0 L 5,-5 Z",
    viewbox: "-5 -5 10 10"
  }
];

var tempData = data[0][Object.keys(data[0])[0]];
var offset = 30 * [tempData.length * 0.2];
var len = tempData.length;
var biggerCircleColor = "#daa520";
var lineColor = "#A6ACAF";
var smallerCircleColor = "crimson";
var labelColor = "#3b5998";
var width;
var height;
var innerCircleRadius = 20;
var outerCircleRadius = 10;
var offset = 30;
var angle = 10;
var radius = 10;
var basicOffset = 40;
var gap = 0;
var chunkSize = outerCircleRadius * 2 + gap * 2;

function adjuster(r) {
  var circum = 2 * Math.PI * r;
  var count = circum / chunkSize;
  if (count > len) {
    radius = r;
    return;
  } else {
    adjuster(r + 1);
  }
}

adjuster(radius);
width = (radius * 2) + (basicOffset*2) + 2*(2 * outerCircleRadius) + 100;
height = (radius * 2) + (basicOffset*2) + 2*(2 * outerCircleRadius) + 100;
var originX = width/2;
var originY = height/2;

console.log(radius)

var svgContainer = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var scaleX = d3.scale
  .linear()
  .domain([0, tempData.length])
  .range([0, width]);


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
  .attr("fill", smallerCircleColor);

var color = d3.scale.category10();

var marker = svgContainer
  .append("svg:defs")
  .selectAll("marker")
  .data(markers)
  .enter()
  .append("svg:marker")
  .attr("id", function(d) {
    return "marker_" + d.name;
  })
  .attr("markerHeight", 6)
  .attr("markerWidth", 6)
  .attr("markerUnits", "strokeWidth")
  .attr("orient", "auto")
  .attr("refX", (basicOffset)/2)
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
  })
  .attr("stroke", "black")
  .attr("stroke-width", 1);

var lines = svgContainer
  .selectAll("line")
  .data(tempData)
  .enter()
  .append("line")
  .attr("x1", originX)
  .attr("y1", originY)
  .attr("x2", function(d, i) {
    return (
      originX +
      (radius + basicOffset - outerCircleRadius) *
        Math.sin((2 * Math.PI * i) / len)
    );
  })
  .attr("y2", function(d, i) {
    return (
      originY -
      (radius + basicOffset - outerCircleRadius) *
        Math.cos((2 * Math.PI * i) / len)
    );
  })
  .attr("marker-end", function(d) {
    if (d[1] === "out") {
      return "url(#marker_arrow)";
    }
    if (d[1] === "in") {
      return "url(#marker_arrowIn)";
    }
  })
  .attr("stroke", lineColor)
  .attr("stroke-width", 2);

var text = svgContainer
  .selectAll("text")
  .data(tempData)
  .enter()
  .append("text");

basicOffset = basicOffset + 20;

var texts = text
  .attr("x", function(d, i) {
    return originX + (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len);
  })
  .attr("y", function(d, i) {
    return originY - (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len);
  })
  .text(function(d, i) {
    return d[0];
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", labelColor)
  .style("font-weight", "bold")
  .attr("text-anchor", "middle")
  .attr('class', 'labels')
//   .attr("transform", 
//   function(d, i){
//     // if(i%2 === 0){
//     //   return "";
//     // }else{
//     //   return "translate(0, 5) rotate(10deg)";
//     // }
//     return "rotate(-9)"
//   }
// ).attr("transform", translate)

d3.selectAll('.labels')
.attr('transform', 'skewY(-20)')
.attr("transform-origin", '50% 50%')
 

svgContainer
  .append("circle")
  .attr("cx", originX)
  .attr("cy", originY)
  .attr("r", radius * 0.4)
  .attr("fill", biggerCircleColor);
