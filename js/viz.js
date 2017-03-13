// drawMap("datafilename");
// drawCars("data/file.csv");
// drawScatter("data/file.csv");
drawLeftRoadAssets();
drawRightRoadAssets();
loadRightRoadVizData("data/bad-drivers138.csv", "data/carPositionsOneSide.csv", 0);
loadLeftRoadVizData("data/bad-drivers138.csv", "data/carPositionsOneSide.csv", 5);

// $("#timelineLeftStateSelector").change(function() {
//   var leftStateName = $('#timelineLeftStateSelector').find(":selected").text();
//   var rightStateName = $('#timelineRightStateSelector').find(":selected").text();
//
//   // also update selected of same side selector on other graph
//   updateAll(leftStateName, rightStateName);
// });
//
// function updateAll(leftState, rightState) {
//   updateMap(leftState, rightState);
//   updateTimeline(leftState, rightState);
//   updateRoad(leftState, rightState);
// }
