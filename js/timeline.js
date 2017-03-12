var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 512 - margin.left - margin.right,
  height = 786 - margin.top - margin.bottom;

var scaleFactor = 200;

function getRowForState(state){
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

function formatStateData(currentStateData){
  var data =[];
  data[0] = {year:1994, value:currentStateData.y1994};
  data[1] = {year:1995, value:currentStateData.y1995};
  data[2] = {year:1996, value:currentStateData.y1996};
  data[3] = {year:1997, value:currentStateData.y1997};
  data[4] = {year:1998, value:currentStateData.y1998};
  data[5] = {year:1999, value:currentStateData.y1999};
  data[6] = {year:2000, value:currentStateData.y2000};
  data[7] = {year:2001, value:currentStateData.y2001};
  data[8] = {year:2002, value:currentStateData.y2002};
  data[9] = {year:2003, value:currentStateData.y2003};
  data[10] = {year:2004, value:currentStateData.y2004};
  data[11] = {year:2005, value:currentStateData.y2005};
  data[12] = {year:2006, value:currentStateData.y2006};
  data[13] = {year:2007, value:currentStateData.y2007};
  data[14] = {year:2008, value:currentStateData.y2008};
  data[15] = {year:2009, value:currentStateData.y2009};
  data[16] = {year:2010, value:currentStateData.y2010};
  data[17] = {year:2011, value:currentStateData.y2011};
  data[18] = {year:2012, value:currentStateData.y2012};
  data[19] = {year:2013, value:currentStateData.y2013};
  return data;
}

function normalizeToAverage(stateData, averageData){
  var data =[];
  data[0] = {year:1994, value:(stateData[0].value - averageData[0].value)};
  data[1] = {year:1995, value:(stateData[1].value - averageData[1].value)};
  data[2] = {year:1996, value:(stateData[2].value - averageData[2].value)};
  data[3] = {year:1997, value:(stateData[3].value - averageData[3].value)};
  data[4] = {year:1998, value:(stateData[4].value - averageData[4].value)};
  data[5] = {year:1999, value:(stateData[5].value - averageData[5].value)};
  data[6] = {year:2000, value:(stateData[6].value - averageData[6].value)};
  data[7] = {year:2001, value:(stateData[7].value - averageData[7].value)};
  data[8] = {year:2002, value:(stateData[8].value - averageData[8].value)};
  data[9] = {year:2003, value:(stateData[9].value - averageData[9].value)};
  data[10] = {year:2004, value:(stateData[10].value - averageData[10].value)};
  data[11] = {year:2005, value:(stateData[11].value - averageData[11].value)};
  data[12] = {year:2006, value:(stateData[12].value - averageData[12].value)};
  data[13] = {year:2007, value:(stateData[13].value - averageData[13].value)};
  data[14] = {year:2008, value:(stateData[14].value - averageData[14].value)};
  data[15] = {year:2009, value:(stateData[15].value - averageData[15].value)};
  data[16] = {year:2010, value:(stateData[16].value - averageData[16].value)};
  data[17] = {year:2011, value:(stateData[17].value - averageData[17].value)};
  data[18] = {year:2012, value:(stateData[18].value - averageData[18].value)};
  data[19] = {year:2013, value:(stateData[19].value - averageData[19].value)};
  return data;
}


function initializeTimeline(){
  defaultState = "California";


d3.csv("../data/timeline.csv", function(error, data) {



  if (error) throw error;

  nationalAverageFormatted = formatStateData(data[getRowForState("USA")]);

  currentStateData = data[getRowForState(defaultState)];
  currentStateDataFormatted = formatStateData(currentStateData);
  normalizedStateData = normalizeToAverage(currentStateDataFormatted, nationalAverageFormatted);

  var leftYPos = 0;
  var widthScale = d3.scale.linear().domain([.5,3]).range(-width/2, width/2);
  var middle = width/2;

  var leftSvg = d3.select("#leftTimeline")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var barTip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.year + "</br> " + (d.value*100).toFixed(2);});

  leftSvg.call(barTip);

  // //works
  // leftSvg.selectAll("rect")
  //   .data(dataTest)
  //   .enter().append("rect")
  //   .attr("x",0 )
  //   .attr("y", function(){leftYPos = leftYPos+25; return leftYPos;})
  //   .attr("width", function(d){return d.value})
  //   .attr("height", 20);

  //vertical 0 axis line
  leftSvg.append("line")
    .attr("x1", width/2)
    .attr("y1", 0)
    .attr("x2", width/2)
    .attr("y2", height)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  //top line
  leftSvg.append("line")
    .attr("x1", 0+50)
    .attr("y1", 0)
    .attr("x2", width-50)
    .attr("y2", 0)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

    //botttom line
    leftSvg.append("line")
      .attr("x1", 0+50)
      .attr("y1", height)
      .attr("x2", width-50)
      .attr("y2", height)
      .attr("stroke-width", 2)
      .attr("stroke", "black");


  leftSvg.selectAll("rect")
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
    .attr("y", function(){leftYPos = leftYPos+33; return leftYPos;})
    .attr("width", function(d){
      return Math.abs(d.value*scaleFactor);
    })
    .attr("height", 30)
    .attr("fill", function(d){
      //console.log(d.value);
      if(d.value <0){
        return "green";
      }else{
        return "red";
      }
    });
  });

    // leftSvg.selectAll("circle")
    // .data(data)
    // .enter().append("circle")
    //   .attr("cx", function(d) { return d.y1994*200; })
    //   .attr("cy", function(d) { return d.y2012*200; })
    //   .attr("r", 2);
}
function updateTimeline(state){

  d3.csv("../data/timeline.csv", function(error, data) {



    //console.log("redrawing timeline for state: ");
    //console.log(state);
    nationalAverageFormatted = formatStateData(data[getRowForState("USA")]);
    currentStateData = data[getRowForState(state)];
    currentStateDataFormatted = formatStateData(currentStateData);
    normalizedStateData = normalizeToAverage(currentStateDataFormatted, nationalAverageFormatted);
    //console.log(normalizedStateData);


    var timelineSvg = d3.select("#leftTimeline").select("svg");

    var leftYPos = 0;
    var middle = width/2;

    timelineSvg.selectAll("rect")
      .data(normalizedStateData)
      .transition().duration(700)
      .attr("x",function(d){
        if(d.value <0){
          return middle + d.value*scaleFactor;
        }else{
          return middle;
        }
        })
      .attr("y", function(){leftYPos = leftYPos+33; return leftYPos;})
      .attr("width", function(d){
        return Math.abs(d.value*scaleFactor);
      })
      .attr("height", 30)
      .attr("fill", function(d){
        //console.log(d.value);
        if(d.value <0){
          return "green";
        }else{
          return "red";
        }
      })
  });

}
