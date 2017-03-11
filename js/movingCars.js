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

  var path6 = [
    [0, 0],
    [0, 170],
    [-150, 170],
    [-150, 10]
  ];

  var path1 = [
    [0, 0],
    [0, 200],
    [-100, 230],
    [-100, 70]
  ];

  var path7 = [
    [0, 0],
    [0, 170],
    [-195, 170],
    [-195, 70]
  ];

  var path2 = [
    [0, 0],
    [0, 200],
    [-145, 230],
    [-145, 130]
  ];

  var path8 = [
    [0, 0],
    [0, 130],
    [-190, 170],
    [-190, 135]
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

    var carG = roadSvgContainer.append("g")
      .attr("id", "gcar" + (i + 1));
    // create and position car
    var car = carG.append("image")
      .attr("xlink:href", "img/whiteCar.png")
      .attr("height", 50)
      .attr("x", d.x)
      .attr("y", d.y)
      .attr("id", "car" + (i + 1));
  });

  var path_6 = roadSvgContainer.append("path")
    .data([path6])
    // .attr("stroke", "red")
    // .attr("stroke-width", 3)
    .attr("d",
      d3.svg.line()
        .tension(0) // Catmull–Rom
        .interpolate("basis")
    )

  var path_1 = roadSvgContainer.append("path")
    .data([path1])
    .attr("d",
      d3.svg.line()
        .tension(0) // Catmull–Rom
        .interpolate("basis")
    )

    var path_7 = roadSvgContainer.append("path")
      .data([path7])
      .attr("d",
        d3.svg.line()
          .tension(0) // Catmull–Rom
          .interpolate("basis")
      )


      var path_2 = roadSvgContainer.append("path")
        .data([path2])
        .attr("d",
          d3.svg.line()
            .tension(0) // Catmull–Rom
            .interpolate("basis")
        )

        var path_8 = roadSvgContainer.append("path")
          .data([path8])
          .attr("d",
            d3.svg.line()
              .tension(0) // Catmull–Rom
              .interpolate("basis")
          )

  var testCarG6 = d3.select("#gcar6");
  var testCarG1 = d3.select("#gcar1");
  var testCarG2 = d3.select("#gcar2");
  var testCarG7 = d3.select("#gcar7");
  var testCarG8 = d3.select("#gcar8");
  carTransition(path_6, testCarG6, 0);
  carTransition(path_1, testCarG1, 300);
  carTransition(path_7, testCarG7, 1200);
  carTransition(path_2, testCarG2, 900);
  carTransition(path_8, testCarG8, 600);


  // var testCar = d3.select("#car6")
    // .transition()
    // .delay(0)
    // .duration(3000)
    // .attr("transform", "translate(0, 0) rotate(50)");
  // console.log(testCar)
  // for (var i = 6; i < 11; i++) {
  //   var carNum = "#car" + i;
  //   console.log(carNum);
  //   var testCar = d3.select(carNum);
  //   var delay = i * 100;
  //   carTransition(path, testCar, delay)
  // }
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
