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
    .attr("y", 40)
    .attr("id", "leftRoad")
  //
  // roadSvgContainer.append("text")
  //   .text("12%")
  //   .attr("id", "leftSpeedLabel")
  //   .attr("class", "factorLabel")
  //   .attr("transform", "translate("+ 40 +","+ (215) +")")
  //   .style("text-anchor", "middle")
  //   .attr("y", roadMargin.top);
  //
  // roadSvgContainer.append("text")
  //   .text("14%")
  //   .attr("id", "leftSpeedLabel")
  //   .attr("class", "factorLabel")
  //   .attr("transform", "translate("+ 40 +","+ (565) +")")
  //   .style("text-anchor", "middle")
  //   .attr("y", roadMargin.top);
  //
  // roadSvgContainer.append("text")
  //   .text("15%")
  //   .attr("id", "leftSpeedLabel")
  //   .attr("class", "factorLabel")
  //   .attr("transform", "translate("+ 40 +","+ (440) +")")
  //   .style("text-anchor", "middle")
  //   .attr("y", roadMargin.top);
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
