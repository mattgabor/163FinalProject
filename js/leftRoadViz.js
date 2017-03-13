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
    .attr("xlink:href", "img/roadWithLotOnLeft.png")
    .attr("x", 80)
    .attr("y", 40)
    .attr("id", "leftRoad")
}

function drawRightRoadAssets() {
  var roadSvgContainer = d3.select("#rightRoadViz")
    .append("svg")
    .attr("width", roadWidth + roadMargin.left + roadMargin.right)
    .attr("height", roadHeight + roadMargin.top + roadMargin.bottom)

  // add road background
  var rightRoad = roadSvgContainer
    .append("image")
    .attr("xlink:href", "img/roadWithLotOnLeft.png")
    .attr("x", 80)
    .attr("y", 40)
    .attr("id", "rightRoad")
}

// loads data from both CSVs
function loadInitialRoadVizData(stateCode, selector, direction) {
  d3.queue()
    .defer(d3.csv, causeFile)
    .defer(d3.csv, carFile)
    .await(
      function(error, cause, car) {
      if (error) {
          console.error('ERROR: ' + error);
      }
      else {
          drawCars(cause, car, selector, direction, stateCode);
      }
    });
}

// called when a user switches states from map or selector
function updateRoadVizData(stateCode, direction) {
  d3.csv(causeFile, function(error, causeData) {
     updateCars(stateCode, causeData, direction);
  })
}
