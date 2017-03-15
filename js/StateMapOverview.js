var colorScale = d3.scale.linear().domain([5.9,23.9]).range(["white","#1f3a93"]);
var fatalities = d3.map();

var stateDataModel = {
  leftState: "null",
  rightState: "null",
  leftStateIsSelected: false,
  rightStateIsSelected: false
}

var defaultLeftState = "Nevada";
var defaultRightState = "New York";
var leftStateColor = "#e27928";
var rightStateColor = "#f64747";
var goodRed = "#A31621";

function initializeStateMapOverview() {

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

  var colorScale = d3.scale.linear().domain([5.9,23.9]).range(["#E0deef","#1f3a93"]);

  // var color = d3.scale.threshold()
  //   .domain(d3.range(1, 40))
  //   .range(d3.schemeBlues);

  var margin = {top: 20, right: 0, bottom: 30, left: 0},
    width = 1024 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  var svg = d3.select("#StateMapOverview").append("svg")
   .attr("width", width)
   .attr("height", height);


   var ticks = [5, 10, 15, 20, 25];

   var posLegendColor = d3.scale.linear().range(["#F64747","#E27928"]);

   var legendText = ["Left State", "Right State"];

   // pos legend
   svg.append("text")
     .attr("transform", "translate(850, 520)")
     .text("State Selection");

   var posLegend = svg.append("g")
      .attr("class", "legend")
      .attr("width", 140)
      .attr("transform", "translate(850, 530)")
    .attr("height", 200)
      .selectAll("g")
      .data(posLegendColor.domain().slice().reverse())
      .enter()
      .append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 18 + ")"; });

    posLegend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", posLegendColor);

    posLegend.append("text")
      .data(legendText)
        .attr("class", "label")
        .attr("x", 24)
        .attr("y", 7)
        .attr("dy", ".35em")
        .text(function(d) { return d; });

    // hue legend
    svg.append("text")
      .attr("transform", "translate(850, 390)")
      .text("Deaths per 1B Miles");

    svg.append("g")
      .attr("class", "hueLegend")
      .attr("transform", "translate(850, 400)");

    var hueLegend = d3.legend.color()
        .cells([5, 10, 15, 20, 25])
        .scale(colorScale);

    svg.select(".hueLegend")
      .call(hueLegend);

  function scale (scaleFactor,width,height) {
    return d3.geo.transform({
      point: function(x, y) {
        // this.stream.point( (x - width/2) * scaleFactor + width/2 , (y - height/2) * scaleFactor + height/2);
        this.stream.point(x * scaleFactor , y * scaleFactor);
      }
    });
  }



  d3.queue()
    .defer(d3.json, "data/us-10m.v1.json")
    .defer(d3.csv, "data/bad-drivers138.csv", function(d) {
      fatalities.set(d.geoID, +d.totalNumber); })
    .await(ready);


  function ready(error, us){

    if(error){
      ////console.log("error");
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
        // ////console.log("TotalNumber");
        // ////console.log(fatalities.get(d.id));
        // ////console.log(colorScale(fatalities.get(d.id)));
        return colorScale(fatalities.get(d.id));})
      .attr("d", path)
      .on('click', function(d,i){
        stateClicked(stateName[d.id], fatalities.get(d.id));
      })
      .on('mouseover', function(d,i){})
      .on('mouseout', function(d,i){});


      // //console.log(defaultLeftState)
      updateAll(defaultLeftState, defaultRightState);
      updateDropdowns(stateFullToAb[defaultLeftState], stateFullToAb[defaultRightState])

  };

  }

  function stateClicked(stateName, value){
    //console.log("state clicked before anything happens")
    // printDataModel();

    //the state is already selected
    if(stateName == stateDataModel.leftState){
      //console.log("This state is the current left state")
      stateDataModel.leftState = "null";
      stateDataModel.leftStateIsSelected = false;
      deColor(stateName, value);

    }else if(stateName == stateDataModel.rightState){
      //console.log("This state is the current right state")
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
        updateAll(stateDataModel.leftState, stateDataModel.rightState);
        updateDropdowns(stateFullToAb[stateDataModel.leftState], stateFullToAb[stateDataModel.rightState]);
        //change left state to passed in state
      }else if(!stateDataModel.rightStateIsSelected){
        //change left state to passed in state
        stateDataModel.rightState = stateName;
        stateDataModel.rightStateIsSelected = true;
        color(stateName, "right");
        updateAll(stateDataModel.leftState, stateDataModel.rightState);
        updateDropdowns(stateFullToAb[stateDataModel.leftState], stateFullToAb[stateDataModel.rightState]);
      }else{
        //no states free
        alert("Please deselect a state before selecting another one.");
      }
    }

  //console.log("state before update")
  // printDataModel();

  // updateAll(stateDataModel.leftState, stateDataModel.rightState);
  // updateDropdowns(stateFullToAb[stateDataModel.leftState], stateFullToAb[stateDataModel.rightState]);


  }

  function updateMap(leftState, rightState){
    //console.log("updateMap");
    deselectBothStates();
    slectLeftRightStates(leftState, rightState);
  }

  //get state from dropdown left
  //decolor left
  //color left for state passed in
  //change state selected to new state

  //get state from dropdown right
  //decolor left
  //color left for state passed in
  //change state selected to new state

  function slectLeftRightStates(leftState, rightState){
    //console.log("selecting left right states", leftState, rightState);
    stateDataModel.leftState = leftState;
    stateDataModel.leftStateIsSelected = true;
    color(leftState, "left");
    stateDataModel.rightState = rightState;
    stateDataModel.rightStateIsSelected = true;
    color(rightState, "right");
  }

  function deselectBothStates(){
    //console.log("Deselecting Both States");
    if(stateDataModel.leftStateIsSelected){
      deSelectCurrentStateOnSide("left");
    }
    if(stateDataModel.rightStateIsSelected){
      deSelectCurrentStateOnSide("right");
    }
  }

  function deSelectCurrentStateOnSide(side){
    ////console.log("de select current state");

    if (side=="right"){
      var oldRightState = stateDataModel.rightState;
      ////console.log("old right state", oldRightState);
      stateDataModel.rightState = "null";
      stateDataModel.rightStateIsSelected = false;
      deColor(oldRightState, .5); //TODO: change to real value
    }else if (side=="left"){
      var oldLeftState = stateDataModel.leftState;
      stateDataModel.leftState = "null";
      stateDataModel.leftStateIsSelected = false;
      deColor(oldLeftState, .5); //TODO: change to real value

    }else{
      //alert.("Error: invalid side sepecificed when trying to select state")
    }
  }

  //de-color a specific state, not using value?
  function deColor(stateName, value){

    //console.log("decoloring state for: " + stateName + "with value: " + value);
    ////console.log("   #geoID" + getGeoIdForState(stateName));
    var currentState = d3.select("#geoID" + getGeoIdForState(stateName));
    currentState.attr("fill", colorScale(fatalities.get(getGeoIdForState(stateName))));
  }

  function color(stateName, side){
    //console.log("coloring state for: ", stateName);
    ////console.log("   #geoID" + getGeoIdForState(stateName));
    var currentState = d3.select("#geoID" + getGeoIdForState(stateName));
    if(side == "right"){
      //console.log(" on right");
      currentState.attr("fill", rightStateColor);
    }else if(side == "left"){
      //console.log(" on left");
      currentState.attr("fill", leftStateColor);
    }else{
      console.error("did not color correctly, error")
    }

  }

  // function printDataModel(){
    //console.log("current state data model");
    //console.log("Left State: " + stateDataModel.leftState
      // + ", " + "Right State: " + stateDataModel.rightState
      // + ", " + stateDataModel.leftStateIsSelected
      // + ", " + stateDataModel.rightStateIsSelected);
  // }
