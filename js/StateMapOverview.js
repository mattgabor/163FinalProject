var colorScale = d3.scale.linear().domain([5.9,23.9]).range(["white","#1f3a93"]);
// //color a specific sate for left state
//
// function changeState(newState, side){
//   var oldState;
//   if (side == "right"){
//     oldState = statesSelected[0];
//     statesSelected[0] = newState;
//   }else{
//     oldState = statesSelected[1];
//     statesSelected[1] = newState;
//   }

var stateDataModel = {
  leftState: "null",
  rightState: "null",
  leftStateIsSelected: false,
  rightStateIsSelected: false
}

var leftStateColor = "#e27928";
var rightStateColor = "#f64747";
var goodRed = "#A31621";


function initializeStateMapOverview(){

  var stateName = {};
  stateName["01"]= "Alabama";
  stateName["02"]= "Alaska";
  stateName["04"]= "Arizona";
  stateName["05"]= "Arkansas";
  stateName["06"]= "California";
  stateName["08"]= "Colorado";
  stateName["09"]= "Connecticut";
  stateName["10"]= "Delaware";
  stateName["11"]= "District of Columbia";
  stateName["12"]= "Florida";
  stateName["13"]= "Georgia";
  stateName["15"]= "Hawaii";
  stateName["16"]= "Idaho";
  stateName["17"]= "Illinois";
  stateName["18"]= "Indiana";
  stateName["19"]= "Iowa";
  stateName["20"]= "Kansas";
  stateName["21"]= "Kentucky";
  stateName["22"]= "Louisiana";
  stateName["23"]= "Maine";
  stateName["24"]= "Maryland";
  stateName["25"]= "Massachusetts";
  stateName["26"]= "Michigan";
  stateName["27"]= "Minnesota";
  stateName["28"]= "Mississippi";
  stateName["29"]= "Missouri";
  stateName["30"]= "Montana";
  stateName["31"]= "Nebraska";
  stateName["32"]= "Nevada";
  stateName["33"]= "New Hampshire";
  stateName["34"]= "New Jersey";
  stateName["35"]= "New Mexico";
  stateName["36"]= "New York";
  stateName["37"]= "North Carolina";
  stateName["38"]= "North Dakota";
  stateName["39"]= "Ohio";
  stateName["40"]= "Oklahoma";
  stateName["41"]= "Oregon";
  stateName["42"]= "Pennsylvania";
  stateName["44"]= "Rhode Island";
  stateName["45"]= "South Carolina";
  stateName["46"]= "South Dakota";
  stateName["47"]= "Tennessee";
  stateName["48"]= "Texas";
  stateName["49"]= "Utah";
  stateName["50"]= "Vermont";
  stateName["51"]= "Virginia";
  stateName["53"]= "Washington";
  stateName["54"]= "West Virginia";
  stateName["55"]= "Wisconsin";
  stateName["56"]= "Wyoming";
  stateName["72"]= "Puerto Rico";






  // var color = d3.scale.threshold()
  //   .domain(d3.range(1, 40))
  //   .range(d3.schemeBlues);

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1024 - margin.left - margin.right,
    height = 786 - margin.top - margin.bottom;

  var svg = d3.select("#StateMapOverview").append("svg")
   .attr("width", width)
   .attr("height", height);


  function scale (scaleFactor,width,height) {
    return d3.geo.transform({
      point: function(x, y) {
        // this.stream.point( (x - width/2) * scaleFactor + width/2 , (y - height/2) * scaleFactor + height/2);
        this.stream.point(x * scaleFactor , y * scaleFactor);
      }
    });
  }

  var fatalities = d3.map();

  d3.queue()
    .defer(d3.json, "data/us-10m.v1.json")
    .defer(d3.csv, "data/bad-drivers138.csv", function(d) {
      fatalities.set(d.geoID, +d.totalNumber); })
    .await(ready);


  function ready(error, us){

    if(error){
      //console.log("error");
    }

    var alternator = 0;

    var path = d3.geo.path().projection(scale(1,width,height))
    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("id", function(d) {
        return "geoID" + d.id;
      })
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("fill", function(d) {
        // //console.log("TotalNumber");
        // //console.log(fatalities.get(d.id));
        // //console.log(colorScale(fatalities.get(d.id)));
        return colorScale(fatalities.get(d.id));})
      .attr("d", path)
      .on('click', function(d,i){
        // //console.log("click");
        // //console.log(d3.select(this)[0][0].id);
         //console.log(fatalities.get(d.id));
        stateClicked(stateName[d.id], fatalities.get(d.id));


      })
      .on('mouseover', function(d,i){
        // //console.log("hover");

      })
      .on('mouseout', function(d,i){
        // //console.log("out");

      });
      stateClicked("New York");
      stateClicked("Texas");
  };

  }

  // color("California", "left");
  // color("Texas", "right");

  function stateClicked(stateName, value){
    console.log("clicked: " + stateName);
    //console.log(stateName);
    //console.log();

    //the state is already selected
    if(stateName == stateDataModel.leftState){
      stateDataModel.leftState = "null";
      stateDataModel.leftStateIsSelected = false;
      deColor(stateName, value);

    }else if(stateName == stateDataModel.rightState){
      console.log("this state was the right state");
      stateDataModel.rightState = "null"
      stateDataModel.rightStateIsSelected = false;
      deColor(stateName, value); //sets back to the id of fatailities or whatever
    }else{
      //state that is clicked is not selected
      //check to see which state has a slot
      if(!stateDataModel.leftStateIsSelected){
        stateDataModel.leftState = stateName;
        stateDataModel.leftStateIsSelected = true;
        color(stateName, "left");

        //change left state to passed in state
      }else if(!stateDataModel.rightStateIsSelected){
        //change left state to passed in state
        stateDataModel.rightState = stateName;
        stateDataModel.rightStateIsSelected = true;
        color(stateName, "right");
      }else{
        //no states free
        alert("Please De-select a state before selecting another one");
      }
    }
    console.log("current state data model");
    console.log("Left State: " + stateDataModel.leftState
        + ", " + "Right State: " + stateDataModel.rightState
        + ", " + stateDataModel.leftStateIsSelected
        + ", " + stateDataModel.rightStateIsSelected);
  }
  //change the left state in the data model

  //de-color a specific state
  function deColor(stateName, value){
    console.log("decoloring state for: " + stateName + "with value: " + value);
    //console.log("   #geoID" + getGeoIdForState(stateName));
    var currentState = d3.select("#geoID" + getGeoIdForState(stateName));
    currentState.attr("fill", colorScale(value));
  }

  function color(stateName, side){
    //console.log("coloring state for id:");
    //console.log("   #geoID" + getGeoIdForState(stateName));
    var currentState = d3.select("#geoID" + getGeoIdForState(stateName));
    if(side == "right"){
      currentState.attr("fill", rightStateColor);
    }else{
      currentState.attr("fill", leftStateColor);
    }

  }
