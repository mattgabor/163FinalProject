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

  // var rightRoad = roadSvgContainer
  //   .append("image")
  //   .attr("xlink:href", "img/rightRoad.png")
  //   .attr("x", 520)
  //   .attr("y", 80)
  //   .attr("id", "rightRoad")
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

  var orderOfExecution = [[6, 1, 7, 2, 8], [3, 9, 4], [5, 10]];

  causeData.forEach(function(d) {
    d.totalNumber = +d.totalNumber;
    d.speeding = +d.speeding;
    d.alcohol = +d.alcohol;
    d.distracted = +d.distracted;
    d.carCount = getCarCount(d);
  });

  carData.forEach(function(d, i) {
    d.carNum = +d.carNum;
    d.row = +d.row;
    d.x = +d.x;
    d.y = +d.y;
    d.path = [[+d.pos1x, +d.pos1y],
              [+d.pos2x, +d.pos2y],
              [+d.pos3x, +d.pos3y],
              [+d.pos4x, +d.pos4y]];

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

  roadSvgContainer.append("path")
    .data([[[0,0], [0, 518]]])
    .attr("d",
      d3.svg.line()
        .tension(0)
        .interpolate("basis"))
    .attr("id", "straightPathFirstRow");

  roadSvgContainer.append("path")
    .data([[[0,0], [0, 460]]])
    .attr("d",
      d3.svg.line()
        .tension(0)
        .interpolate("basis"))
    .attr("id", "straightPathSecondRow");


  // FIXME: Make rotation work

  // var gCarRot6 = d3.select("#gcarRot6")
    // .transition()
    // .duration(1000)
    // .delay(1500)
    // .attr("transform", function(d) {
      // console.log(d)
    // })

  setDestinations(44, causeData, orderOfExecution);
} // end drawCars



function moveCar(car, path, duration, delay) {
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

function setDestinations(stateNum, causeData, orderOfExecution) {
  var delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  var durations = [3000, 4000, 5000, 6000, 7000, 6000, 7000, 8000, 9000, 10000]

  var stateCarCount = causeData[stateNum].carCount;
  // console.log(orderOfExecution)
  var allExecutions = [orderOfExecution[0], orderOfExecution[1], orderOfExecution[2]];
  // var speedExec = orderOfExecution[0];
  // var alcExec = orderOfExecution[1];
  // var distExec = orderOfExecution[2];

  var categoryMaxCars = [5, 3, 2];
  var stateCategoryCounts = [stateCarCount.speed, stateCarCount.alc, stateCarCount.dist];

  var loopCount = 0;
  // loop through each type of fatality
  for (var i = 0; i < 3; i++) {
    // loop through potential speeding fatalities
    for (var j = 0; j < categoryMaxCars[i]; j++) {
      var currentCar = allExecutions[i][j];
      var carToMove = d3.select("#gcar" + currentCar)

      if (j <= stateCategoryCounts[i]) {
        var alongPath = d3.select("#path" + currentCar);
      } else {
        // check how far down to go
        if (currentCar < 5) {
          var alongPath = d3.select("#straightPathFirstRow");
        } else {
          var alongPath = d3.select("#straightPathSecondRow");
        }
      }
      moveCar(carToMove, alongPath, durations[loopCount], delays[loopCount]);
      loopCount++;
    } // end fatality count loop
  } // end fatality type loop
} // end setDestinations()
