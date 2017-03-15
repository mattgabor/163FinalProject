var causeFile = "data/bad-drivers138.csv";
var carFile = "data/carPositionsOneSide.csv";

initializeTimeline();

drawLeftRoadAssets();
drawRightRoadAssets();

loadInitialRoadVizData(0, "#leftRoadViz", "left");
loadInitialRoadVizData(1, "#rightRoadViz", "right");


initializeStateMapOverview();


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

  console.log("updating", leftState)
  console.log("updating", rightState)

  $("#leftTimelineDropdown select").val(leftState)
  $("#rightTimelineDropdown select").val(rightState)
  $("#leftRoadDropdown select").val(leftState)
  $("#rightRoadDropdown select").val(rightState)
}

function updateAll(leftState, rightState) {
  console.log("update all: " + leftState +", " + rightState);
  if(leftState != "null" && rightState != "null"){
    updateMap(leftState, rightState);
  }

  if(leftState != "null"){
    updateTimeline(leftState, "left");
    updateRoadVizData(getRowForState(leftState), "left")
  }

  if (rightState != "null"){
    updateTimeline(rightState, "right");
    updateRoadVizData(getRowForState(rightState), "right");
  }
  updateScatter(leftState,rightState);
}
