// drawMap("datafilename");
// drawCars("data/file.csv");
// drawScatter("data/file.csv");
var causeFile = "data/bad-drivers138.csv";
var carFile = "data/carPositionsOneSide.csv";

drawLeftRoadAssets();
drawRightRoadAssets();

loadInitialRoadVizData(0, "#leftRoadViz", "left");
loadInitialRoadVizData(0, "#rightRoadViz", "right");

// updateRoadVizData(22, "left");
// updateRoadVizData(22, "right");

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
  updateRoadVizData(getRowForState(leftState), "left")
  updateRoadVizData(getRowForState(rightState), "right")
}

function getRowForState(state) {
  //add 2 to pass to matt
  if(state == "Alabama"){return 0;}
  if(state == "Alaska"){return 1;}
  if(state == "Arizona"){return 2;}
  if(state == "Arkansas"){return 3;}
  if(state == "California"){return 4;}
  if(state == "Colorado"){return 5;}
  if(state == "Connecticut"){return 6;}
  if(state == "Delaware"){return 7;}
  if(state == "District of Columbia"){return 8;}
  if(state == "Florida"){return 9;}
  if(state == "Georgia"){return 10;}
  if(state == "Hawaii"){return 11;}
  if(state == "Idaho"){return 12;}
  if(state == "Illinois"){return 13;}
  if(state == "Indiana"){return 14;}
  if(state == "Iowa"){return 15;}
  if(state == "Kansas"){return 16;}
  if(state == "Kentucky"){return 17;}
  if(state == "Louisiana"){return 18;}
  if(state == "Maine"){return 19;}
  if(state == "Maryland"){return 20;}
  if(state == "Massachusetts"){return 21;}
  if(state == "Michigan"){return 22;}
  if(state == "Minnesota"){return 23;}
  if(state == "Mississippi"){return 24;}
  if(state == "Missouri"){return 25;}
  if(state == "Montana"){return 26;}
  if(state == "Nebraska"){return 27;}
  if(state == "Nevada"){return 28;}
  if(state == "New Hampshire"){return 29;}
  if(state == "New Jersey"){return 30;}
  if(state == "New Mexico"){return 31;}
  if(state == "New York"){return 32;}
  if(state == "North Carolina"){return 33;}
  if(state == "North Dakota"){return 34;}
  if(state == "Ohio"){return 35;}
  if(state == "Oklahoma"){return 36;}
  if(state == "Oregon"){return 37;}
  if(state == "Pennsylvania"){return 38;}
  if(state == "Rhode Island"){return 39;}
  if(state == "South Carolina"){return 40;}
  if(state == "South Dakota"){return 41;}
  if(state == "Tennessee"){return 42;}
  if(state == "Texas"){return 43;}
  if(state == "Utah"){return 44;}
  if(state == "Vermont"){return 45;}
  if(state == "Virginia"){return 46;}
  if(state == "Washington"){return 47;}
  if(state == "West Virginia"){return 48;}
  if(state == "Wisconsin"){return 49;}
  if(state == "Wyoming"){return 50;}
  if(state == "USA"){return 51;}
}
