// Initial viz setup
var roadMargin = {top: 10, right: 10, bottom: 10, left: 10},
    roadWidth = 1000 - roadMargin.left - roadMargin.right,
    roadHeight = 800 - roadMargin.top - roadMargin.bottom;

function drawRoadAssets() {

  var roadSvgContainer = d3.select("#roadViz")
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

  var rightRoad = roadSvgContainer
    .append("image")
    .attr("xlink:href", "img/rightRoad.png")
    .attr("x", 520)
    .attr("y", 80)
    .attr("id", "rightRoad")
}

// change name of this function
function drawRoadViz(dataFile) {

  var roadSvgContainer = d3.select("#roadViz").selectAll("svg");

  // roadSvgContainer.remove();

  var firstRowY = 85,
      secondRowY = 115,
      spaceBetweenCar = 20;

  d3.csv(dataFile, function(error, data) {
    // possibly filter data

    data.forEach(function(d) {
      d.totalNumber = +d.totalNumber;
      d.speeding = +d.speeding;
      d.alcohol = +d.alcohol;
      d.distracted = +d.distracted;
    });

    // create car marker
    // var marker = roadSvgContainer.append("image")
    //   .attr("xlink:href", "img/whiteCar.png")
    //   .attr("height", 50)
    //   .attr("x", 251)
    //   .attr("y", firstRowY)
    //
    // var marker = roadSvgContainer.append("image")
    //   .attr("xlink:href", "img/whiteCar.png")
    //   .attr("height", 50)
    //   .attr("x", 622)
    //   .attr("y", firstRowY)
    //
    // var marker = roadSvgContainer.append("image")
    //   .attr("xlink:href", "img/whiteCar.png")
    //   .attr("height", 50)
    //   .attr("x", 622)
    //   .attr("y", 144)

    }) // end d3.csv()
} // end drawRoad
