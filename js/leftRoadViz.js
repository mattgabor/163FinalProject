// Initial viz setup
var roadMargin = {top: 0, right: 10, bottom: 10, left: 10},
    roadWidth = 500 - roadMargin.left - roadMargin.right,
    roadHeight = 700 - roadMargin.top - roadMargin.bottom;

function drawLeftRoadAssets() {

  var roadSvgContainer = d3.select("#leftRoadViz")
    .append("svg")
    .attr("width", roadWidth + roadMargin.left + roadMargin.right)
    .attr("height", roadHeight + roadMargin.top + roadMargin.bottom)

  // add road background
  var leftRoad = roadSvgContainer
    .append("image")
    .attr("xlink:href", "img/leftRoad.png")
    .attr("x", 80)
    .attr("y", 80)
    .attr("id", "leftRoad")

  var stateLabel = roadSvgContainer.append("text")
    .text("State 1")
    .attr("id", "state1")
    .attr("class", "stateLabel")
    .attr("transform", "translate("+ (roadWidth/1.4) +","+ 50 +")")
    .style("text-anchor", "middle")
    .attr("y", roadMargin.top);
}

// loads data from both CSVs
function loadLeftRoadVizData(causeFile, carFile, stateCode) {
  d3.queue()
    .defer(d3.csv, causeFile)
    .defer(d3.csv, carFile)
    .await(
      function(error, cause, car) {
      if (error) {
          console.error('ERROR: ' + error);
      }
      else {
          drawCars(cause, car, "#leftRoadViz", stateCode);
      }
    });
}
