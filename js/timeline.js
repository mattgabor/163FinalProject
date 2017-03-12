function initializeTimeline(){

  //dummy data for now
  var statesSelected = new Set();
  statesSelected.add("California");
  statesSelected.add("Texas");



  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 512 - margin.left - margin.right,
    height = 786 - margin.top - margin.bottom;


d3.csv("../data/timelineTransposed.csv", function(error, data) {
  if (error){console.log("error");}
  var currentState = d3.keys(data[0]).filter(function(key) { return (key == "California"); });
  console.table(currentState);
});

d3.csv("../data/timeline.csv", function(error, data) {

  if (error) throw error;
  console.log("Inside csv for timeline data")
  //
  var currentState = d3.keys(data[0]).filter(function(key) { return (key == "California"); });
  console.log(currentState);

  //console.log(data);
  data.forEach(function(d) {
    if(d.State == "USA"){
      d.y1994 = +d.y1994;
      d.y1995 = +d.y1995;
      d.y1996 = +d.y1996;
      d.y1997 = +d.y1997;
      d.y1998 = +d.y1998;
      d.y1999 = +d.y1999;
      d.y2000 = +d.y2000;
      d.y2001 = +d.y2001;
      d.y2002 = +d.y2002;
      d.y2003 = +d.y2003;
      d.y2004 = +d.y2004;
      d.y2005 = +d.y2005;
      d.y2006 = +d.y2006;
      d.y2007 = +d.y2007;
      d.y2008 = +d.y2008;
      d.y2009 = +d.y2009;
      d.y2010 = +d.y2010;
      d.y2011 = +d.y2011;
      d.y2012 = +d.y2012;
      d.y2013 = +d.y2013;
      d.y2014 = +d.y2014;
      //console.log(d);
    }

    if(d.State == "California"){
      d.y1994 = +d.y1994;
      d.y1995 = +d.y1995;
      d.y1996 = +d.y1996;
      d.y1997 = +d.y1997;
      d.y1998 = +d.y1998;
      d.y1999 = +d.y1999;
      d.y2000 = +d.y2000;
      d.y2001 = +d.y2001;
      d.y2002 = +d.y2002;
      d.y2003 = +d.y2003;
      d.y2004 = +d.y2004;
      d.y2005 = +d.y2005;
      d.y2006 = +d.y2006;
      d.y2007 = +d.y2007;
      d.y2008 = +d.y2008;
      d.y2009 = +d.y2009;
      d.y2010 = +d.y2010;
      d.y2011 = +d.y2011;
      d.y2012 = +d.y2012;
      d.y2013 = +d.y2013;
      d.y2014 = +d.y2014;
      //console.log(d);
    }

  });

  var middle = width/2;

  var leftSvg = d3.select( "#timeline" )
    .append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

    // leftSvg.selectAll("circle")
    // .data(data)
    // .enter().append("circle")
    //   .attr("cx", function(d) { return d.y1994*200; })
    //   .attr("cy", function(d) { return d.y2012*200; })
    //   .attr("r", 2);

    var leftYPos = 0;
    leftSvg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x",0 )
    .attr("y", function(){leftYPos = leftYPos+10; return leftYPos;})
    .attr("width", function(d) { return d.y1994*100; })
    .attr("height", 10);









  var widthScale = d3.scale.linear().domain([.5,3]).range();

  //
  // // Scale the range of the data
  // x.domain(d3.extent(data, function(d) { return d.year; }));
  // var max = d3.max(data, function(d) {
  //   //console.log(d.currentValue[0]);
  //   return d.currentValue[0];})
  // y.domain([0,max + .2*max]);
  //
  // // define the line
  // var valuelineUpdate = d3.line()
  //     .x(function(d) { return x(d.year); })
  //     .y(function(d) { return y(d.currentValue); });
  //
  //
  // //svg.selectAll("g").exit().remove()
  // g.selectAll(".line")
  //   .data([data])
  //   .transition().duration(300)
  //   .attr("d", valuelineUpdate);
  //
  // g.selectAll("circle")
  //   .data(data)
  //   .transition().duration(325)
  //   .attr("cx", function(d) { return x(d.year); })
  //   .attr("cy", function(d) { return y(d.currentValue); });
  //
  //   function dotClicked(d,circle){
  //     if(circle.attr("fill") == "red"){
  //       circle.attr("fill","black");
  //     }else{
  //       circle.attr("fill","red");
  //     }
  //   }
  //
  // g.selectAll(".yAxis").call(d3.axisLeft(y));
  //
  // g.selectAll(".lcLabel")
  //   .text(category);

});

}
