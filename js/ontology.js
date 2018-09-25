var dataOut = [
  {
    n1: [
      ["node2", "in"],
      ["hello i ", "out"],
      ["n3", "in"],
      ["n4", "out"],
      ["n5", "in"]
    ]
  }
];

var dataOut2 = [
  {
    node2: [
      ["n1", "in"],
      ["hello i ", "out"],
      ["n3", "in"],
      ["n4", "out"],
      ["n5", "in"],
      ["n6", "in"]
    ]
  }
];

var dataOut3 = [
  {
    node3: [
      ["n2", "in"],
      ["hello i ", "out"],
      ["n4", "out"],
      ["n5", "in"]
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

function creator(radius, data) {
  var tempData = data;
  var offset = 30 * [tempData.length * 0.2];
  var len = tempData.length;
  var biggerCircleColor = "#daa520";
  var lineColor = "#A6ACAF";
  var smallerCircleColor = "crimson";
  var labelColor = "black";
  var width;
  var height;
  var innerCircleRadius = 20;
  var outerCircleRadius = 30;
  var offset = 30;
  var angle = 10;
  var basicOffset = 40;
  var gap = 0;
  var chunkSize = outerCircleRadius * 2 + gap * 2;

  var adjuster = r => {
    var circum = 2 * Math.PI * r;
    var count = circum / chunkSize;
    if (count > len) {
      radius = r;
      return;
    } else {
      adjuster(r + 1);
    }
  };

  adjuster(radius);
  width = radius * 2 + basicOffset * 2 + 2 * (2 * outerCircleRadius) + 100;
  height = radius * 2 + basicOffset * 2 + 2 * (2 * outerCircleRadius) + 100;
  var originX = width / 2;
  var originY = height / 2;

  var svgContainer = d3
    .select("body")
    .append("svg")
    .attr("id", "a")
    .attr("width", width)
    .attr("height", height);

  var circles = svgContainer
    .selectAll("circle")
    .data(tempData)
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
      return (
        originX + (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len)
      );
    })
    .attr("cy", function(d, i) {
      return (
        originY - (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len)
      );
    })
    .attr("r", function(d, i) {
      return outerCircleRadius;
    })
    .attr("fill", smallerCircleColor)
    .on("click", onclick);

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
    .attr("refX", basicOffset / 2)
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
      return (
        originX + (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len)
      );
    })
    .attr("y", function(d, i) {
      return (
        originY - (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len)
      );
    })
    .text(function(d, i) {
      return d[0].substr(0, 5);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", labelColor)
    .style("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .attr("transform", function(d, i) {
      if (tempData.length <= i) {
        if (tempData[i + 1][0].length >= tempData[i][0].length) {
          return "translate(0, " + d[0].length * 2 + ")";
        } else {
          return "translate(0, " + d[0].length * 0.5 + ")";
        }
      }
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  console.log(tempData);

  var circles2 = svgContainer
    .append("circle")
    .attr("cx", originX)
    .attr("cy", originY)
    .attr("r", radius * 0.4)
    .attr("fill", biggerCircleColor)
    .on("click", function() {
      onclick2(tempData);
    });

  svgContainer
    .append("text")
    .attr("x", originX)
    .attr("y", originY)
    .text("sds")
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("class", "labels");

  function handleMouseOver(d, i) {
    // Add interactivity
    // Use D3 to select element, change color and size
    d3.select(this).attr({
      fill: "orange",
      r: radius * 2
    });

    // Specify where to put label of text
    svgContainer
      .append("text")
      .attr({
        id: "t" + d.x + "-" + d.y + "-" + i, // Create an id for text so we can select it later for removing on mouseout
        x: function() {
          return (
            originX +
            (radius + basicOffset) * Math.sin((2 * Math.PI * i) / len) -
            30
          );
        },
        y: function() {
          return (
            originY -
            (radius + basicOffset) * Math.cos((2 * Math.PI * i) / len) -
            15
          );
        }
      })
      .text(function() {
        return d[0]; // Value of the text
      });
  }

  function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
      fill: "black",
      r: radius
    });

    // Select text by id and then remove
    d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); // Remove text location
  }

  function onclick(d) {
    if (true) {
      d3.select("#a").remove();
      creator(10, dataOut2[0][Object.keys(dataOut2[0])[0]]);
      console.log("TCL: onclick -> data[2]", d);
      var coords = d3.mouse(this);
    }
  }

  function onclick2(d) {
    console.log(d);
    if (false) {
      d3.select("#a").remove();
      creator(10, d[2][d[0]]);
    }
  }
}

var dataModified = dataOut[0][Object.keys(dataOut[0])[0]];
console.log("TCL: dataModified", dataModified);

creator(10, dataModified, dataOut[0]);
