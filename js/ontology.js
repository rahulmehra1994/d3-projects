var data = [
  {
    n1: [
      ["n2", "in"],
      ["n3", "out"],
      ["n4", "in"],
      ["n5", "out"],
      ["n6", "in"],
      ["n7", "out"]
    ]
  }
  // { n2: [["n3", "in"], ["n4", "out"], ["n3", "in"], ["n4", "out"]] },
  // { n2: [["n3", "in"], ["n4", "out"], ["n3", "in"]] }
];

//Make an SVG Container
var svgContainer = d3
  .select("body")
  .append("svg")
  .attr("width", 1200)
  .attr("height", 800);

var originX = 200;
var originY = 200;
var innerCircleRadius = 20;
var outerCircleRadius = 5;

var tempData = data[0][Object.keys(data[0])[0]];
var offset = 30 * [tempData.length * 0.2];
var circles = svgContainer
  .selectAll("circle")
  .data(tempData)
  .enter()
  .append("circle")
  .attr("cx", function(d, i) {
    console.log(d);
    return originX + (innerCircleRadius + offset) * Math.sin(i);
  })
  .attr("cy", function(d, i) {
    return originY - (innerCircleRadius + offset) * Math.cos(i);
  })
  .attr("r", function(d, i) {
    return outerCircleRadius;
  });

  var text = svgContainer.selectAll("text")
                        .data(tempData)
                        .enter()
                        .append("text");

var offsetText = 30 * [tempData.length * 0.3];

var texts = text
  .attr("x",  function(d, i) {
    console.log(d);
    return originX + (innerCircleRadius + offsetText) * Math.sin(i);
  })
  .attr("y", function(d, i) {
    return originY - (innerCircleRadius + offsetText) * Math.cos(i);
  })
  .text(function(d) {
    return d[0];
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "red");

svgContainer
  .append("circle")
  .attr("cx", originX)
  .attr("cy", originY)
  .attr("r", 20);
