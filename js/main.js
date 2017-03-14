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
loadInitialRoadVizData(1, "#rightRoadViz", "right");

initializeScatter();

$("#leftRoadDropdown").change(function() {
  var leftStateName = $("#leftRoadDropdown").find(":selected").text();
  var leftStateVal = $("#leftRoadDropdown").find(":selected").val();

  var rightStateName = $("#rightRoadDropdown").find(":selected").text();
  var rightStateVal = $("#rightRoadDropdown").find(":selected").val();

  updateDropdowns(leftStateVal, rightStateVal)
  updateAll(leftStateName, rightStateName);
});

$("#rightRoadDropdown").change(function() {
  var leftStateName = $("#leftRoadDropdown").find(":selected").text();
  var leftStateVal = $("#leftRoadDropdown").find(":selected").val();

  var rightStateName = $("#rightRoadDropdown").find(":selected").text();
  var rightStateVal = $("#rightRoadDropdown").find(":selected").val();

  updateDropdowns(leftStateVal, rightStateVal)
  updateAll(leftStateName, rightStateName);
});

$("#leftTimelineDropdown").change(function() {
  var leftStateName = $("#leftTimelineDropdown").find(":selected").text();
  var leftStateVal = $("#leftTimelineDropdown").find(":selected").val();

  var rightStateName = $("#rightTimelineDropdown").find(":selected").text();
  var rightStateVal = $("#rightTimelineDropdown").find(":selected").val();

  updateDropdowns(leftStateVal, rightStateVal)
  updateAll(leftStateName, rightStateName);
});

$("#rightTimelineDropdown").change(function() {
  var leftStateName = $("#leftTimelineDropdown").find(":selected").text();
  var leftStateVal = $("#leftTimelineDropdown").find(":selected").val();

  var rightStateName = $("#rightTimelineDropdown").find(":selected").text();
  var rightStateVal = $("#rightTimelineDropdown").find(":selected").val();

  updateDropdowns(leftStateVal, rightStateVal)
  updateAll(leftStateName, rightStateName);

});

function updateDropdowns(leftState, rightState) {

  console.log(leftState)
  console.log(rightState)

  $("#leftTimelineDropdown select").val(leftState)
  $("#rightTimelineDropdown select").val(rightState)
  $("#leftRoadDropdown select").val(leftState)
  $("#rightRoadDropdown select").val(rightState)
}

function updateAll(leftState, rightState) {
  // updateMap(leftState, rightState);
  updateTimeline(leftState, "left");
  updateTimeline(rightState, "right");
  updateRoadVizData(getRowForState(leftState), "left")
  updateRoadVizData(getRowForState(rightState), "right")
}
