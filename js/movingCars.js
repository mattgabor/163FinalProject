// Initial viz setup
var roadMargin = {top: 10, right: 10, bottom: 10, left: 10},
    roadWidth = 800 - roadMargin.left - roadMargin.right,
    roadHeight = 800 - roadMargin.top - roadMargin.bottom;

function drawRoadAssets() {


}

// change name of this function
function drawRoadViz(dataFile) {

  var firstRowY = 20,
      secondRowY = 80,
      spaceBetweenCar = 20;

  var roadSvgContainer = d3.select("#roadViz")
    .append("svg")
    .attr("width", roadWidth + roadMargin.left + roadMargin.right)
    .attr("height", roadHeight + roadMargin.top + roadMargin.bottom)


    d3.csv(dataFile, function(error, data) {
      // possibly filter data

      data.forEach(function(d) {
        d.totalNumber = +d.totalNumber;
        d.speeding = +d.speeding;
        d.alcohol = +d.alcohol;
        d.distracted = +d.distracted;
      });


      // create car marker
      var marker = roadSvgContainer.append("image")
        .attr("xlink:href", "img/whiteCar.png")
        .attr("transform", "translate(" + 20 + "," + 20 + ")")
        .attr("height", 55);

    }) // end d3.csv()
} // end drawRoad
