//r value unemployement: 0.10269059227646
// r value graduation: -0.64172625634922
// r value immigrants: -0.49488581269112
var scatterLeftState = "Nevada";
var scatterRightState = "New York";

// function initializeScatter() {
var driverData;
    d3.csv("data/bad-drivers138_3.csv", function(error, data) {

      // change string (from CSV) into number format
      data.forEach(function(d) {
        d["percentage unemployement rate"]                        = +d["percentage unemployement rate"];
        d["percentage graduation rate"]                           = +d["percentage graduation rate"];
        d["percentage of immigrants"]                             = +d["percentage of immigrants"];
        // d["Percentage Of Drivers Involved In Fatal Collisions Who Had Not Been Involved In Any Previous Accidents"] = +d["Percentage Of Drivers Involved In Fatal Collisions Who Had Not Been Involved In Any Previous Accidents"];
        // d["Percentage Of Drivers Involved In Fatal Collisions Who Were Not Distracted"]                             = +d["Percentage Of Drivers Involved In Fatal Collisions Who Were Not Distracted"];
        // d["Start"]                                                = +d["Start"];
       // //console.log(d);
      });
        driverData = data;
        create(data);
    });

var scatterSvg,
  scatterXScale,
  scatterYScale,
  scatterNewLine,
  scatterXAxis,
  scatterYAxis,
  attr = {},
  padding = 60,
  // scatterWidth = 1024,
  // scatterHeight = 600,
  scatterMargin = {top: 20, right: 0, bottom: 100, left: 100};
      scatterWidth = 1000 - scatterMargin.left - scatterMargin.right,
      scatterHeight = 800 - scatterMargin.top - scatterMargin.bottom;

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong style='color:yellow'>State:</strong> <span style='color:white'>"+ d["state"] +"</span><br><strong style='color:yellow'># Fatalities:</strong> <span style='color:white'>"+ d.y +"</span><br><strong style='color:yellow'>How much it's affected (%):</strong> <span style='color:white'>"+ d.x +"</span>";
  })

setAttrFalse();
// attr['repeat'] = false;
// attr['other'] = false;

function create(data) {
    var numDataPoints = 1000;

    //create data points
    attr['percentage unemployement rate'] = true;
    var dataset = create_data(data);

    // function for creation of line
    scatterNewLine = d3.svg.line()
        .x(function(d) {
            return scatterXScale(d.x);
        })
        .y(function(d) {
            return scatterYScale(d.yhat);
        });

    ////// Define Scales /////////////////
    scatterXScale = d3.scale.linear()
                  .domain([d3.min(dataset, function(d){
                    return d.x;
                  }) - .2,d3.max(dataset, function(d){
                    return d.x;
                  }) + 1])
                  .range([padding, scatterWidth - padding * 2]);

    scatterYScale = d3.scale.linear()
                          .domain([0,40]) //y range is reversed because svg
                          .range([scatterHeight - padding, padding]);
    /////// Define Axis //////////////////////////////
    scatterXAxis = d3.svg.axis()
                  .scale(scatterXScale)
                  .orient("bottom");

    scatterYAxis =	d3.svg.axis()
                  .scale(scatterYScale)
                  .orient("left");
    // create svg
    scatterSvg = d3.select("#scatter")
                .append("svg")
                .attr("id", "scatterSvg")
                .attr("width", scatterWidth)
                .attr("height", scatterHeight);

    // cut off datapoints that are outside the axis
    scatterSvg.append("clipPath")
        .attr("id", "chart-area")
        .append("rect")
        .attr("x", padding)
        .attr("y", padding)
        .attr("width", scatterWidth - padding * 3)
        .attr("height", scatterHeight - padding *2);

    // append data points
    scatterSvg.append("g")
        .attr("id", "circles")
        .attr("clip-path", "url(#chart-area)")
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function(d){
          return scatterXScale(d.x);
        })
        .attr("cy", function(d){
          return scatterYScale(d.y);
        });

    // append regression line
    scatterSvg.append("path")
        .datum(dataset)
        .attr("clip-path", "url(#chart-area)")
        .attr("class", "line");

    // append Buttons
    scatterSvg.append("foreignObject")
      .attr("width", 600)
      .attr("height", 100)
      .attr("x", 80)
      .attr("y", 40)
      .append("xhtml:div")
      .attr("class", "scatterButtons")
      .html("<div class='btn-group' data-toggle='buttons'><label class='btn btn-primary active' id='percentageunemployementrate'><input type='radio' name='options' autocomplete='off' checked>Percentage Unemployed</label><label class='btn btn-primary' id='percentagegraduationrate'><input type='radio' name='options' autocomplete='off'>College Graduation Rate</label><label class='btn btn-primary' id='percentageofimmigrants'><input type='radio' name='options' autocomplete='off'>Percentage Immigrants</label></div>")

      d3.select("#percentageunemployementrate")
        .on("click", function(){
          document.getElementById("XText").innerHTML = "Percentage Unemployed";
          // create new data
          setAttrFalse();
          ////console.log(attr);
          attr["percentage unemployement rate"] = true;
          dataset = create_data(driverData);
          update(dataset);
          document.getElementById("rvalue").innerHTML = "r = 0.103: Very Weak Correlation";
        });

      d3.select("#percentagegraduationrate")
        .on("click", function(){
          document.getElementById("XText").innerHTML = "Percentage College Graduates";
          // create new data
          setAttrFalse();
          attr["percentage graduation rate"] = true;
          dataset = create_data(driverData);
          update(dataset);
          document.getElementById("rvalue").innerHTML = "r = -0.642: Strong Neg Correlation";
        });

      d3.select("#percentageofimmigrants")
        .on("click", function(){
          document.getElementById("XText").innerHTML = "Percentage Immigrants";
          // create new data
          setAttrFalse();
          attr["percentage of immigrants"] = true;
          dataset = create_data(driverData);
          update(dataset);
          document.getElementById("rvalue").innerHTML = "r = -0.495: Mild Neg Correlation";
        });


    // append Axes ///////////////////////////
    scatterSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + ( scatterHeight - padding) + ")")
        .call(scatterXAxis);

    scatterSvg.append("text")      // text label for the x axis
        .attr("id", "XText")
        .attr("fill", "black")
        .attr("x", scatterWidth - 500)
        .attr("y",  scatterHeight - 20)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Percentage Unemployed");

    scatterSvg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(scatterYAxis);

    scatterSvg.append("text")      // text label for the x axis
        .attr("id", "YText")
        .attr("fill", "black")
        .attr("x", scatterWidth - scatterWidth - 250 )
        .attr("y",  22)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .style("font-size", "16px")
        .text("Number of Fatalities");

    scatterSvg.call(tip);

    scatterSvg.selectAll(".dot")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    scatterSvg.selectAll(".dot")
      // .attr("fill","black")
      // .data(dataset)
      // .enter()
      .attr("r", function(d){
        if (d["state"] == scatterLeftState || d["state"] == scatterRightState){
          return 25;
        }
        else{
          return 12.5;
        }
      })
      // .attr("fill","white");
      .attr("fill", function(d){
        if (d["state"] == scatterLeftState || d["state"] == scatterRightState){
          return '#FFA500';
        }
        else{
          return '#000080';
        }
      });

  update(dataset);
}

    function setAttrFalse(){
        attr['start']                           = false;
        attr['percentage unemployement rate']   = false;
        attr['percentage graduation rate']      = false;
        attr['percentage of immigrants']        = false;
    }

    function update(dataset){
        //console(dataset);

        // //console.log(dataset[0].x);

        scatterXScale = d3.scale.linear()
                  .domain([d3.min(dataset, function(d){
                    return d.x;
                  }) - .2,d3.max(dataset, function(d){
                    return d.x;
                  }) + 1])
                  .range([padding, scatterWidth - padding * 2]);

        scatterSvg.selectAll("circle")
            .data(dataset)
            .transition()
            .duration(1000)
            .attr("cx", function(d){
              return scatterXScale(d.x);
            })
            .attr("cy", function(d){
              return scatterYScale(d.y);
            });

        scatterXAxis = d3.svg.axis()
              .scale(scatterXScale)
              .orient("bottom");

        scatterYAxis = d3.svg.axis()
              .scale(scatterYScale)
              .orient("left");

        scatterSvg.select(".x.axis")
          .transition()
          .duration(1000)
          .call(scatterXAxis);

        scatterSvg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(scatterYAxis);


        scatterSvg.select("path")
            .datum(dataset)
            // .transition()
            // .duration(10)
            .attr("d", scatterNewLine);
      scatterSvg.selectAll(".dot")
        // .attr("fill","black")
        // .data(dataset)
        // .enter()
        .attr("r", function(d){
          if (d["state"] == scatterLeftState || d["state"] == scatterRightState){
            return 25;
          }
          else{
            return 12.5;
          }
        })
        // .attr("fill","white");
        .attr("fill", function(d){
          if (d["state"] == scatterLeftState || d["state"] == scatterRightState){
            return '#FFA500';
          }
          else{
            return '#000080';
          }
        });
    }

    function create_data(driverData) {
        nsamples = 50
        var x = [];
        var y = [];
        var n = nsamples;
        var x_mean = 0;
        var y_mean = 0;
        var term1 = 0;
        var term2 = 0;
        var x_value = 0;
        // //console.log(attr)
        // create x and y values
        for (var i = 0; i < n; i++) {
            y.push(driverData[i]["Number of drivers involved in fatal collisions per billion miles"]);
            x.push(calculate_x_Value(driverData[i]))
            // x.push(driverData[i]["Start"]);
            x_mean = x_mean + +(x[i]);
            y_mean = y_mean + +(y[i]);
        }
        // calculate mean x and y
        x_mean /= n;
        y_mean /= n;

        // calculate coefficients
        var xr = 0;
        var yr = 0;
        for (i = 0; i < x.length; i++) {
            xr = x[i] - x_mean;
            yr = y[i] - y_mean;
            term1 += xr * yr;
            term2 += xr * xr;

        }
        var b1 = term1 / term2;
        var b0 = y_mean - (b1 * x_mean);
        // perform regression

        yhat = [];
        // fit line using coeffs
        for (i = 0; i < x.length; i++) {
            yhat.push(b0 + (x[i] * b1));
        }
        // //console.log(x_mean)
        var data = [];
        for (i = 0; i < y.length; i++) {
            data.push({
                "yhat": yhat[i],
                "y": y[i],
                "x": x[i],
                "state": driverData[i]["State"]
            })
        }
        return (data);
    }

function changeButtonColor(){}

function calculate_x_Value(data){
    var value   = 0;
    if (attr["percentage unemployement rate"]){
        value = value + +data["percentage unemployement rate"];
    }
    else if (attr["percentage graduation rate"]){
        value = value + +data["percentage graduation rate"];
    }
    else if (attr["percentage of immigrants"]){
        value = value + +data["percentage of immigrants"];
    }
    return value;
}
  // //console.log(calculate_Pvalue(d1,d1.length,d2,d2,length));
  // Checkbox

// }


function updateScatter(lhs,rhs){
  scatterLeftState = lhs;
  scatterRightState = rhs;
  document.getElementById("XText").innerHTML = "Percentage Unemployed";
  // create new data
  setAttrFalse();
  ////console.log(attr);
  attr["percentage unemployement rate"] = true;
  dataset = create_data(driverData);
  update(dataset);
  document.getElementById("rvalue").innerHTML = "r = 0.103: Very Weak Correlation";
}
