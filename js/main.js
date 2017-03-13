// drawMap("datafilename");
// drawCars("data/file.csv");
// drawScatter("data/file.csv");
var causeFile = "data/bad-drivers138.csv";
var carFile = "data/carPositionsOneSide.csv";

initializeStateMapOverview();
initializeTimeline();

drawLeftRoadAssets();
drawRightRoadAssets();

loadInitialRoadVizData(0, "#leftRoadViz", "left");
loadInitialRoadVizData(0, "#rightRoadViz", "right");

initializeScatter();

$("#leftRoadDropdown").change(function() {
  var leftStateName = $("#leftRoadDropdown").find(":selected").text();
  var rightStateName = $("#rightRoadDropdown").find(":selected").text();

  // also update selected of same side selector on other graph
  updateAll(leftStateName, rightStateName);
});

$("#rightRoadDropdown").change(function() {
  var leftStateName = $("#leftRoadDropdown").find(":selected").text();
  var rightStateName = $("#rightRoadDropdown").find(":selected").text();

  // also update selected of same side selector on other graph
  updateAll(leftStateName, rightStateName);
});

function updateAll(leftState, rightState) {
  // updateMap(leftState, rightState);
  // updateTimeline(leftState, rightState);
  // update road Viz
  console.log(leftState);
  console.log(rightState);
  updateTimeline(leftState, "left");
  updateTimeline(rightState, "right");
  updateRoadVizData(getRowForState(leftState), "left")
  updateRoadVizData(getRowForState(rightState), "right")
}
