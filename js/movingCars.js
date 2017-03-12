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

  var straightPath = [[0,0], [0, ]]

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
    d.path = [[+d.pos1x, +d.pos1y],
              [+d.pos2x, +d.pos2y],
              [+d.pos3x, +d.pos3y],
              [+d.pos4x, +d.pos4y]];
    console.log(d.path)

    var carG = roadSvgContainer.append("g")
      .attr("id", "gcar" + (i + 1));

    var carRotateG = carG.append("g")
      .attr("id", "gcarRot" + (i + 1));
    // create and position car
    var car = carRotateG.append("image")
      .attr("xlink:href", "img/whiteCar.png")
      .attr("height", 50)
      .attr("x", d.x)
      .attr("y", d.y)
      .attr("id", "car" + (i + 1));

    var carPath = roadSvgContainer.append("path")
      .data([d.path])
      .attr("d",
        d3.svg.line()
          .tension(0) // Catmull–Rom
          .interpolate("basis")
      )
      .attr("id", "path" + (i + 1));
  }); // end carData foreach

  var testCarG6 = d3.select("#gcar6");
  var testCarG1 = d3.select("#gcar1");
  var testCarG2 = d3.select("#gcar2");
  var testCarG7 = d3.select("#gcar7");
  var testCarG8 = d3.select("#gcar8");

  var path_6 = d3.select("#path6")

  carTransition(path_6, testCarG6, 3000, 0);
  carTransition(path_1, testCarG1, 5000, 300);
  carTransition(path_7, testCarG7, 2000, 1200);
  carTransition(path_2, testCarG2, 3000, 900);
  carTransition(path_8, testCarG8, 5000, 600);

  // FIXME: Make rotation work

  // var gCarRot6 = d3.select("#gcarRot6")
    // .transition()
    // .duration(1000)
    // .delay(1500)
    // .attr("transform", function(d) {
      // console.log(d)
    // })
} // end drawCars



function carTransition(path, car, duration, delay) {
  car.transition()
    .delay(delay)
    .duration(duration)
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
