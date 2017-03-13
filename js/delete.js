if(state == Alabama){return 1;}
if(state == Alaska){return 2;}
if(state == Arizona){return 3;}
if(state == Arkansas){return 4;}
if(state == California){return 5 ;}
if(state == Colorado){return 6;}
if(state == Connecticut){return 7 ;}
if(state == Delaware){return 8;}
if(state == District of Columbia){return 9;}
if(state == Florida){return 10;}
if(state == Georgia){return 11;}
if(state == Hawaii){return 12;}
if(state == Idaho){return 13;}
if(state == Illinois){return 14 ;}
if(state == Indiana){return 15;}
if(state == Iowa){return 16;}
if(state == Kansas){return 17;}
if(state == Kentucky){return 18;}
if(state == Louisiana){return 19;}
if(state == Maine){return 20;}
if(state == Maryland){return 21 ;}
if(state == Massachusetts){return 22 ;}
if(state == Michigan){return 23;}
if(state == Minnesota){return 24;}
if(state == Mississippi){return 25;}
if(state == Missouri){return 26;}
if(state == Montana){return 27;}
if(state == Nebraska){return 28;}
if(state == Nevada){return 29;}
if(state == New Hampshire){return 30;}
if(state == New Jersey){return 31;}
if(state == New Mexico){return 32;}
if(state == New York){return 33;}
if(state == North Carolina){return 34;}
if(state == North Dakota){return 35;}
if(state == Ohio){return 36;}
if(state == Oklahoma){return 37;}
if(state == Oregon){return 38;}
if(state == Pennsylvania){return 39;}
if(state == Rhode Island){return 40;}
if(state == South Carolina){return 41;}
if(state == South Dakota){return 42;}
if(state == Tennessee){return 43;}
if(state == Texas){return 44;}
if(state == Utah){return 45;}
if(state == Vermont){return 46 ;}
if(state == Virginia){return 47;}
if(state == Washington){return 48;}
if(state == West Virginia){return 49;}
if(state == Wisconsin){return 50;}
if(state == Wyoming){return 51;}
if(state == USA){return 52;}

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
//     (circle.attr("fill") == "red"){
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


// //console.log(data);
// data.forEach(function(d) {
//   ©(d.State == "USA"){
//     d.y1994 = +d.y1994;
//     d.y1995 = +d.y1995;
//     d.y1996 = +d.y1996;
//     d.y1997 = +d.y1997;
//     d.y1998 = +d.y1998;
//     d.y1999 = +d.y1999;
//     d.y2000 = +d.y2000;
//     d.y2001 = +d.y2001;
//     d.y2002 = +d.y2002;
//     d.y2003 = +d.y2003;
//     d.y2004 = +d.y2004;
//     d.y2005 = +d.y2005;
//     d.y2006 = +d.y2006;
//     d.y2007 = +d.y2007;
//     d.y2008 = +d.y2008;
//     d.y2009 = +d.y2009;
//     d.y2010 = +d.y2010;
//     d.y2011 = +d.y2011;
//     d.y2012 = +d.y2012;
//     d.y2013 = +d.y2013;
//     d.y2014 = +d.y2014;
//     //console.log(d);
//   }
//
//   if(d.State == "California"){
//     d.y1994 = +d.y1994;
//     d.y1995 = +d.y1995;
//     d.y1996 = +d.y1996;
//     d.y1997 = +d.y1997;
//     d.y1998 = +d.y1998;
//     d.y1999 = +d.y1999;
//     d.y2000 = +d.y2000;
//     d.y2001 = +d.y2001;
//     d.y2002 = +d.y2002;
//     d.y2003 = +d.y2003;
//     d.y2004 = +d.y2004;
//     d.y2005 = +d.y2005;
//     d.y2006 = +d.y2006;
//     d.y2007 = +d.y2007;
//     d.y2008 = +d.y2008;
//     d.y2009 = +d.y2009;
//     d.y2010 = +d.y2010;
//     d.y2011 = +d.y2011;
//     d.y2012 = +d.y2012;
//     d.y2013 = +d.y2013;
//     d.y2014 = +d.y2014;
//     //console.log(d);
//   }
