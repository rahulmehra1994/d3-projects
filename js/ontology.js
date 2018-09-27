function creator(radius, data, key) {
  var centerNodeName = key;
  console.log(centerNodeName, data[key]);
  var tempData = data[key];
  var len = tempData.length;
  var biggerCircleColor = "#daa520";
  var lineColor = "#A6ACAF";
  var smallerCircleColor = "crimson";
  var labelColor = "black";
  var width;
  var height;
  var outerCircleRadius = 30;
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
    .attr("id", key)
    .attr("width", width)
    .attr("height", height)
    .style("opacity", 0);

  animateWholeSvg();

  function animateWholeSvg() {
    d3.select("#" + key)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  }

  var circles = svgContainer
    .selectAll("circle")
    .data(tempData)
    .enter()
    .append("circle")
    .attr("cx", originX)
    .attr("cy", originY)
    .attr("r", function(d, i) {
      return 0;
    })
    .attr("fill", smallerCircleColor)
    .on("click", expandOntology)
    .style("cursor", "pointer");

  animateOuterCircles();

  function animateOuterCircles() {
    circles
      .transition()
      .duration(1000)
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
      });
  }

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
    .attr("refX", basicOffset * 0.2)
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

  // Define the div for the tooltip
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // basicOffset = basicOffset + 20;

  var outerCircleTexts = text
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
    // .style("font-transformation", "ca")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  var centerCirc = svgContainer
    .append("circle")
    .attr("cx", originX)
    .attr("cy", originY)
    .attr("r", radius * 0.6)
    .attr("fill", biggerCircleColor)
    .style("cursor", "pointer")
    .on("click", () => {
      deleteOntology(centerNodeName);
    });

  svgContainer
    .append("text")
    .attr("x", originX)
    .attr("y", originY)
    .text(centerNodeName.substr(0, 5))
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .style("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("class", "labels")
    .on("mouseover", () => {
      handleMouseOver([centerNodeName]);
    })
    .on("mouseout", handleMouseOut);

  function handleMouseOver(d) {
    div
      .transition()
      .duration(200)
      .style("opacity", 0.9);
    div
      .html(d[0])
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY - 28 + "px");
  }

  function handleMouseOut() {
    div
      .transition()
      .duration(500)
      .style("opacity", 0);
  }

  function expandOntology(d) {
    if (true) {
      if (visibleOntology.indexOf(d[0]) === -1) {
        visibleOntology.push(d[0]);
        creator(10, datas, d[0]);
      } else {
        alert("Ontology already visible.");
      }

      console.log("TCL: onclick ", datas, d[0]);
      var coords = d3.mouse(this);
    }
  }
  function deleteOntology(nodeToDelete) {
    console.log("nodeTODelete", nodeToDelete, "visible onto", visibleOntology);
    if (visibleOntology.length > 1) {
      if (confirm("You sure want to delete this ontology?")) {
        visibleOntology.pop(nodeToDelete);
        d3.select("#" + nodeToDelete).remove();
      }
    }
  }
}

var visibleOntology = new Array();
visibleOntology.push(Object.keys(datas)[0]);

creator(10, datas, Object.keys(datas)[0]);
