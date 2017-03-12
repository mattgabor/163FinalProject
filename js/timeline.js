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

function initializeTimeline(){
  defaultState = "USA";

  //dummy data for now
  // var statesSelected = new Set();
  // statesSelected.add("California");
  // statesSelected.add("Texas");



  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 512 - margin.left - margin.right,
    height = 786 - margin.top - margin.bottom;


d3.csv("../data/timeline.csv", function(error, data) {

  var dataTest = [
    {name: 'rect1', value: 50},
    {name: 'rect2', value: 75},
    {name: 'rect3', value: 100},
    {name: 'rect4', value: 150}
  ];

  console.log(dataTest);

  if (error) throw error;
  console.log("Inside csv for timeline data")
  //
  // var currentState = d3.keys(data[0]).filter(function(key) { return (key == "California"); });
  // console.log(currentState);
  console.log(getRowForState(defaultState));
  currentStateData = data[getRowForState(defaultState)];
  console.log(currentStateData);

  var leftYPos = 0;
  var widthScale = d3.scale.linear().domain([.5,3]).range();
  var middle = width/2;

  var leftSvg = d3.select("#timeline")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  leftSvg.selectAll("rect")
    .data(dataTest)
    .enter().append("rect")
    .attr("x",0 )
    .attr("y", function(){leftYPos = leftYPos+25; return leftYPos;})
    .attr("width", function(d){return d.value})
    .attr("height", 20);

  });



    // leftSvg.selectAll("circle")
    // .data(data)
    // .enter().append("circle")
    //   .attr("cx", function(d) { return d.y1994*200; })
    //   .attr("cy", function(d) { return d.y2012*200; })
    //   .attr("r", 2);





}
