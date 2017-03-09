function initializeMap(){

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

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 550 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#StateMapOverview").append("svg")
   .attr("width", width)
   .attr("height", height);


  function scale (scaleFactor,width,height) {
    return d3.geoTransform({
      point: function(x, y) {
        // this.stream.point( (x - width/2) * scaleFactor + width/2 , (y - height/2) * scaleFactor + height/2);
        this.stream.point(x * scaleFactor , y * scaleFactor);
      }
    });
  }

  d3.json("../data/us-10m.v1.json", function (error, us){
    var path = d3.geoPath().projection(scale(0.5,width,height))
    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("fill", "gray")
      .attr("d", path)
      .on('click', function(d,i){
        clearStates();
        d3.select(this)
        .attr("fill", "#003399");
        console.log(d.id);
        console.log(stateName[d.id]);
        updateNeedle(stateName[d.id]);
      })
      .on('mouseover', function(d,i){
        if(d3.select(this).attr("fill") == "#003399"){
          //stay the same
        }else{
          d3.select(this)
          .attr("fill", "#0099cc");
        }
      })
      .on('mouseout', function(d,i){
        if(d3.select(this).attr("fill") == "#003399"){
          //stay the same
        }else{
          d3.select(this)
          .attr("fill", "gray");
        }

      });
  });
}

/**
  changes the fill of all states back to default
*/
function clearStates(){
  d3.selectAll(".states")
    .selectAll("path")
    .attr("fill", "gray");
}
