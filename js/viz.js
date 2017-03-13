// drawMap("datafilename");
// drawCars("data/file.csv");
// drawScatter("data/file.csv");
var causeFile = "data/bad-drivers138.csv";
var carFile = "data/carPositionsOneSide.csv";

drawLeftRoadAssets();
drawRightRoadAssets();
loadRightRoadVizData(0);
loadLeftRoadVizData(5);

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
  // updateLeftRoadVizData(22)
  // updateRightRoadVizData(22)
}
