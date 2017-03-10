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

// loads data from both CSVs
function loadRoadVizData(causeFile, carFile) {
  d3.queue()
    .defer(d3.csv, causeFile)
    .defer(d3.csv, carFile)
    .await(
      function(error, cause, car) {
      if (error) {
          console.error('ERROR: ' + error);
      }
      else {
          drawCars(cause, car);
      }
    });
}


function drawCars(causeData, carData) {
  var roadSvgContainer = d3.select("#roadViz").selectAll("svg");

  var points = [
  [0, 0],
  [0, 460]
  ];

  causeData.forEach(function(d) {
    d.totalNumber = +d.totalNumber;
    d.speeding = +d.speeding;
    d.alcohol = +d.alcohol;
    d.distracted = +d.distracted;
    d.carCount = getCarCount(d);
  });

  carData.forEach(function(d, i) {
    d.carNum = +d.carNum;
    d.x = +d.x;
    d.y = +d.y;

    var carG = roadSvgContainer.append("g");
    // create and position car
    var car = carG.append("image")
      .attr("xlink:href", "img/whiteCar.png")
      .attr("height", 50)
      .attr("x", d.x)
      .attr("y", d.y)
      .attr("id", "car" + (i + 1));
  });

  var path = roadSvgContainer.append("path")
    .data([points])
    .attr("d",
      d3.svg.line()
        .tension(0) // Catmull–Rom
        .interpolate("cardinal")
    )

  for (var i = 6; i < 11; i++) {
    var carNum = "#car" + i;
    console.log(carNum);
    var testCar = d3.select(carNum);
    var delay = i * 100;
    carTransition(path, testCar, delay)
  }
} // end drawCars



function carTransition(path, car, delay) {
  car.transition()
    .delay(delay)
    .duration(3000)
    .attrTween("transform", translateAlong(path.node()))
    // .attr("transform", "rotate(30)")
    // .each("end", carTransition);
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}

function getCarCount(stateData) {
  var speedCars = Math.round(stateData.speeding * 0.1);
  var alcCars = Math.round(stateData.alcohol * 0.1);
  var distCars = Math.round(stateData.distracted * 0.1);
  var otherCars = 10 - speedCars - alcCars - distCars;
  var carCount = {"speed": speedCars, "alc": alcCars, "dist": distCars, "other": otherCars};

  return carCount;
}
