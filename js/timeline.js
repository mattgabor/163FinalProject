var margin = {top: 40, right: 20, bottom: 30, left: 10},
  width = 512 - margin.left - margin.right,
  height = 786 - margin.top - margin.bottom;

var scaleFactor = 200;

function initializeTimeline(){
  // defaultLeftState = "New York";
  // defaultRightState = "Texas";


d3.csv("data/timeline.csv", function(error, data) {
  if (error) throw error;

  function drawTimeline(state, side){
    nationalAverageFormatted = formatStateData(data[getRowForState("USA")]);
    currentStateData = data[getRowForState(state)];
    currentStateDataFormatted = formatStateData(currentStateData);
    normalizedStateData = normalizeToAverage(currentStateDataFormatted, nationalAverageFormatted);

    var currentSvg;
    if(side == "left"){
      currentSvg = d3.select("#leftTimeline")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    }else{
      currentSvg = d3.select("#rightTimeline")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    }

    currentSvg.append("g").append("text")
      .text("1995")
      .attr("class","yearLabel")
      .attr("transform", "translate(0, 100)");

    currentSvg.append("g").append("text")
      .text("2000")
      .attr("class","yearLabel")
      .attr("transform", "translate(0, 265)");

    currentSvg.append("g").append("text")
      .text("2005")
      .attr("class","yearLabel")
      .attr("transform", "translate(0, 430)");

    currentSvg.append("g").append("text")
      .text("2010")
      .attr("class","yearLabel")
      .attr("transform", "translate(0, 595)");

//230
//comment
  currentSvg.append("g").append("text")
      .text("0")
      .attr("class","axisLabel")
      .attr("transform", "translate(241,30)");

    currentSvg.append("g").append("text")
        .text("1")
        .attr("class","axisLabel")
        .attr("transform", "translate(441,30)");

      currentSvg.append("g").append("text")
        .text(".5")
        .attr("class","axisLabel")
        .attr("transform", "translate(341,30)");


      currentSvg.append("g").append("text")
          .text("-1")
          .attr("class","axisLabel")
          .attr("transform", "translate(41,30)");

        currentSvg.append("g").append("text")
          .text("-.5")
          .attr("class","axisLabel")
          .attr("transform", "translate(141,30)");

      var barTip = d3.tip()
        .attr('class', 'd3-tip').html(function(d) { return "<strong style='color:yellow'>Year:</strong> <span style='color:white'>" + d.year + "</br> " + "</span><br><strong style='color:yellow'>Value: </strong> <span style='color:white'>" + (d.value).toFixed(2) + "</span>";});

      barTip.direction('e')
      currentSvg.call(barTip);

      //vertical 0 axis line
      currentSvg.append("line")
        .attr("x1", width/2)
        .attr("y1", 0 + margin.top)
        .attr("x2", width/2)
        .attr("y2", height)
        .attr("stroke-width", 3)
        .attr("stroke", "black");

      //top line
      currentSvg.append("line")
        .attr("x1", margin.left)
        .attr("y1", 0 + margin.top)
        .attr("x2", width)
        .attr("y2", 0 + margin.top)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

        //botttom line
        currentSvg.append("line")
          .attr("x1", 0+margin.bottom)
          .attr("y1", height)
          .attr("x2", width)
          .attr("y2", height)
          .attr("stroke-width", 3)
          .attr("stroke", "black");

      var leftYPos = margin.top+9;
      var middle = width/2;

      currentSvg.selectAll("rect")
        .data(normalizedStateData)
        .enter().append("rect")
        .on('click', function(d,i){})
        .on('mouseover', function(d,i){
          barTip.show(d);
          // d3.select(this)
          // .style("cursor", "pointer")
          // .style("stroke", "")
          // .attr("opacity",.5);
        })
        .on('mouseout', function(d,i){
          barTip.hide(d);
          // d3.select(this)
          // .attr("opacity",1)
          // .style("cursor", "pointer");
        })
        .attr("x",function(d){
          if(d.value <0){
            //console.log("negative start point");
            //console.log(width/2 - d.value*scaleFactor);
            return width/2 + d.value*scaleFactor;
          }else{
            return width/2;
          }
          })
        .attr("y", function(){
          var retVal = leftYPos;
          leftYPos = leftYPos+33;
          return retVal;
        })
        .attr("width", function(d){
          return Math.abs(d.value*scaleFactor);
        })
        .attr("height", 30)
        .attr("fill", function(d){
          //console.log(d.value);
          if(d.value <0){
            return "#1E824C";
          }else{
            return "#c91624";
          }
        });
  }

  drawTimeline(defaultLeftState, "left");
  drawTimeline(defaultRightState, "right");

  });

    // leftSvg.selectAll("circle")
    // .data(data)
    // .enter().append("circle")
    //   .attr("cx", function(d) { return d.y1994*200; })
    //   .attr("cy", function(d) { return d.y2012*200; })
    //   .attr("r", 2);
}
function updateTimeline(state, side){
    //console.log("State before CSV " + state)
    d3.csv("data/timeline.csv", function(error, data) {

    nationalAverageFormatted = formatStateData(data[getRowForState("USA")]);
    console.log("-------------")
    console.log(nationalAverageFormatted)

    //console.log("State after CSV " + state)
    //console.log(getRowForState(state));

    currentStateData = data[getRowForState(state)];
    currentStateDataFormatted = formatStateData(currentStateData);

    normalizedStateData = normalizeToAverage(currentStateDataFormatted, nationalAverageFormatted);
    var svgToBeUpdated;
    if(side == "left"){
      svgToBeUpdated = d3.select("#leftTimeline").select("svg");
    }else{
      svgToBeUpdated = d3.select("#rightTimeline").select("svg");
    }

    var leftYPos = margin.top+9;
    var middle = width/2;

    svgToBeUpdated.selectAll("rect")
      .data(normalizedStateData)
      .transition().duration(1000)
      .attr("x",function(d){
        if(d.value <0){
          return middle + d.value*scaleFactor;
        }else{
          return middle;
        }
        })
      .attr("y", function(){
        var retVal = leftYPos;
        leftYPos = leftYPos+33;
        return retVal;
      })
      .attr("width", function(d){
        return Math.abs(d.value*scaleFactor);
      })
      .attr("height", 30)
      .attr("fill", function(d){
        //console.log(d.value);
        if(d.value <0){
          return "#1E824C";
        }else{
          return "#c91624";
        }
      })
  });

}
