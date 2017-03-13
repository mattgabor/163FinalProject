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


var colorScale = d3.scale.linear().domain([5.9,23.9]).range(["white","#000080"]);

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
    .defer(d3.json, "../data/us-10m.v1.json")
    .defer(d3.csv, "../data/bad-drivers138.csv", function(d) {
      //console.log(d.state);
      //console.log(d.geoID);
      //console.log(d.totalNumber);
      fatalities.set(d.geoID, +d.totalNumber); })
    .await(ready);


  function ready(error, us){

    // for(var i=0;i<51;i++){
    //   console.log(colorScale(i));
    // }

    //console.log(us);
    //console.table(us);
    //console.log("fatalities");
    //console.table(fatalities);
    if(error){
      console.log("error");
    }

    var numStates = 0;
    var statesSelected = new Set();
    //console.log(statesSelected);

    var alternator = 0;


    var path = d3.geo.path().projection(scale(1,width,height))
    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("fill", function(d) {
        // console.log("TotalNumber");
        // console.log(fatalities.get(d.id));
        // console.log(colorScale(fatalities.get(d.id)));
        return colorScale(fatalities.get(d.id));})
      .attr("d", path)
      .on('click', function(d,i){
        alternator = (alternator + 1) % 2;

        updateTimeline(stateName[d.id], (alternator==0 ? "left" : "right"));
        //if already toggled, untoggle
        if(d3.select(this).attr("fill") == "#FFA500"){
          d3.select(this)
          .attr("fill", function(d) {
          return colorScale(fatalities.get(d.id));})
          statesSelected.delete(stateName[d.id]);
          numStates--;
        //if not toggled, check if two state are already selected
        }else if (numStates >=2){
          console.log("already two states selected");
        //else select it
        }else{
          numStates++;
          d3.select(this)
          .attr("fill", "#FFA500");
          statesSelected.add(stateName[d.id]);
          //console.log(d.id);
          //console.log(stateName[d.id]);
          //updateNeedle(stateName[d.id]);
        }

        //console.log(statesSelected);

      })
      .on('mouseover', function(d,i){
        if(d3.select(this).attr("fill") == "#FFA500"){
          //stay the same
        }else{
          d3.select(this)
          .attr("fill", "#0099cc");
        }
      })
      .on('mouseout', function(d,i){
        if(d3.select(this).attr("fill") == "#FFA500"){
          //stay the same
        }else{
          d3.select(this)
          .attr("fill", function(d) {
          return colorScale(fatalities.get(d.id));});
        }

      });
  };

  }

//   d3.json("../data/us-10m.v1.json", function (error, us){
//     var numStates = 0;
//     var statesSelected = new Set();
//     console.log(statesSelected);
//
//     var path = d3.geo.path().projection(scale(0.5,width,height))
//     svg.append("g")
//       .attr("class", "states")
//       .selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//       .enter().append("path")
//       .attr("fill", "gray")
//       .attr("d", path)
//       .on('click', function(d,i){
//         //if already toggled, untoggle
//         if(d3.select(this).attr("fill") == "#003399"){
//           d3.select(this)
//           .attr("fill", "gray");
//           statesSelected.delete(stateName[d.id]);
//           numStates--;
//         //if not toggled, check if two state are already selected
//         }else if (numStates >=2){
//           console.log("already two states selected");
//         //else select it
//         }else{
//           numStates++;
//           d3.select(this)
//           .attr("fill", "#003399");
//           statesSelected.add(stateName[d.id]);
//           console.log(d.id);
//           console.log(stateName[d.id]);
//           //updateNeedle(stateName[d.id]);
//         }
//
//         console.log(statesSelected);
//
//       })
//       .on('mouseover', function(d,i){
//         if(d3.select(this).attr("fill") == "#003399"){
//           //stay the same
//         }else{
//           d3.select(this)
//           .attr("fill", "#0099cc");
//         }
//       })
//       .on('mouseout', function(d,i){
//         if(d3.select(this).attr("fill") == "#003399"){
//           //stay the same
//         }else{
//           d3.select(this)
//           .attr("fill", "gray");
//         }
//
//       });
//   });
// }

/**
  changes the fill of all states back to default
*/
function clearStates(){
  d3.selectAll(".states")
    .selectAll("path")
    .attr("fill", "gray");
}
