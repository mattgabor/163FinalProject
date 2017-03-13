function initializeScatter() {
  var driverData;
      d3.csv("data/bad-drivers138_3.csv", function(error, data) {

        // change string (from CSV) into number format
        data.forEach(function(d) {
          d["percentage unemployement rate"]                        = +d["percentage unemployement rate"];
          d["percentage graduation rate"]                           = +d["percentage graduation rate"];
          d["percentage of immigrants"]                             = +d["percentage of immigrants"];
          // d["Percentage Of Drivers Involved In Fatal Collisions Who Had Not Been Involved In Any Previous Accidents"] = +d["Percentage Of Drivers Involved In Fatal Collisions Who Had Not Been Involved In Any Previous Accidents"];
          // d["Percentage Of Drivers Involved In Fatal Collisions Who Were Not Distracted"]                             = +d["Percentage Of Drivers Involved In Fatal Collisions Who Were Not Distracted"];
          d["Start"]                                                = +d["Start"];
         // console.log(d);
        });
          driverData = data;
          create(data);
      });

  var svg,
    xScale,
    yScale,
    newline,
    xAxis,
    yAxis,
    attr = {},
    padding = 30,
    width = 1024,
    height = 600;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>State:</strong> <span style='color:red'>"+ d["state"] +"</span><br><strong># Fatalities:</strong> <span style='color:red'>"+ d.y +"</span><br><strong>How much it's affected (%):</strong> <span style='color:red'>"+ d.x +"</span>";
    })

  setAttrFalse();
  // attr['repeat'] = false;
  // attr['other'] = false;

  function create(data) {
      var numDataPoints = 1000;

      //create data points
      attr['start'] = true;
      var dataset = create_data(data);

      // function for creation of line
      newline = d3.svg.line()
          .x(function(d) {
              return xScale(d.x);
          })
          .y(function(d) {
              return yScale(d.yhat);
          });

      ////// Define Scales /////////////////
       // xScale = d3.scale.linear()
       //                      .domain([0,d3.max(dataset, function(d){
       //                        return d.x;
       //                      })])
       //                      .range([padding,w - padding*2]);

      xScale = d3.scale.linear()
                            .domain([0,100])
                            .range([padding, width - padding * 2]);

      yScale = d3.scale.linear()
                            .domain([0,40]) //y range is reversed because svg
                            .range([height - padding, padding]);
      /////// Define Axis //////////////////////////////
      xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

      yAxis =	d3.svg.axis()
                    .scale(yScale)
                    .orient("left");
      // create svg
      svg = d3.select("#scatter")
                  .attr('class', 'gridLines')
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

      // cut off datapoints that are outside the axis
      svg.append("clipPath")
          .attr("id", "chart-area")
          .append("rect")
          .attr("x", padding)
          .attr("y", padding)
          .attr("width", width - padding * 3)
          .attr("height", height - padding *2);

      // append data points
      svg.append("g")
          .attr("id", "circles")
          .attr("clip-path", "url(#chart-area)")
          .selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("cx", function(d){
            return xScale(d.x);
          })
          .attr("cy", function(d){
            return yScale(d.y);
          })
          .attr("r", 12.5);


      // append regression line
      svg.append("path")
          .datum(dataset)
          .attr("clip-path", "url(#chart-area)")
          .attr("class", "line")
          .attr("d", newline);

      // append Axes ///////////////////////////
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + ( height - padding) + ")")
          .call(xAxis);

      svg.append("text")      // text label for the x axis
          .attr("id", "XText")
          .attr("fill", "black")
          .attr("x", 500 )
          .attr("y",  600 )
          .style("text-anchor", "middle")
          .text("Please choose an attribute");

      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);

      svg.append("text")      // text label for the x axis
          .attr("id", "YText")
          .attr("fill", "black")
          .attr("x", 180 )
          .attr("y",  30 )
          .style("text-anchor", "end")
          .text("Number of Fatalities");


      svg.call(tip);

      svg.selectAll(".dot")
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
  }

      d3.select("#percentageunemployementrate")
        .on("click", function(){
          document.getElementById("XText").innerHTML = "Percentage Unemployed";
          // create new data
          setAttrFalse();
          console.log(attr);
          attr["percentage unemployement rate"] = true;
          dataset = create_data(driverData);
          update(dataset);
        });

      d3.select("#percentagegraduationrate")
        .on("click", function(){
          document.getElementById("XText").innerHTML = "Percentage College Graduates";
          // create new data
          setAttrFalse();
          attr["percentage graduation rate"] = true;
          dataset = create_data(driverData);
          update(dataset);
        });

      d3.select("#percentageofimmigrants")
        .on("click", function(){
          document.getElementById("XText").innerHTML = "Percentage Immigrants";
          // create new data
          setAttrFalse();
          attr["percentage of immigrants"] = true;
          dataset = create_data(driverData);
          update(dataset);
        });


      function setAttrFalse(){
          attr['start']                           = false;
          attr['percentage unemployement rate']   = false;
          attr['percentage graduation rate']      = false;
          attr['percentage of immigrants']        = false;
      }

      function update(dataset){
          console.log(dataset);

          // console.log(dataset[0].x);

          xScale = d3.scale.linear()
                    .domain([0,d3.max(dataset, function(d){
                      return d.x;
                    }) + 1])
                    .range([padding, width - padding * 2]);

          svg.selectAll("circle")
              .data(dataset)
              .transition()
              .duration(1000)
              .attr("cx", function(d){
                return xScale(d.x);
              })
              .attr("cy", function(d){
                return yScale(d.y);
              });

          xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");

          yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

          svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

          svg.select(".y.axis")
              .transition()
              .duration(1000)
              .call(yAxis);


          svg.select("path")
              .datum(dataset)
              // .transition()
              // .duration(10)
              .attr("d", newline);
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
          // console.log(attr)
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
          // console.log(x_mean)
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
      if(attr["start"]){
          value = value + +data["Start"];
      }
      else if (attr["percentage unemployement rate"]){
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

  function calculate_Pvalue (array1, array1_size, array2, array2_size) {

      if (array1_size <= 1) {
          return 1.0;
      }
      if (array2_size <= 1) {
          return 1.0;
      }

      var mean1 = 0.0;
      var mean2 = 0.0;

      for (var x = 0; x < array1_size; x++) {
          mean1 += array1[x];
      }
      for (var x = 0; x < array2_size; x++) {
          mean2 += array2[x];
      }
      if (mean1 == mean2) {
          return 1.0;
      }
      mean1 /= array1_size;
      mean2 /= array2_size;

      var variance1 = 0.0;
      var variance2 = 0.0;

      for (var x = 0; x < array1_size; x++) {
          variance1 += (array1[x]-mean1)*(array1[x]-mean1);
      }
      for (var x = 0; x < array2_size; x++) {
          variance2 += (array2[x]-mean2)*(array2[x]-mean2);
      }
      if ((variance1 == 0.0) && (variance2 == 0.0)) {
          return 1.0;
      }
      variance1 = variance1/(array1_size-1);
      variance2 = variance2/(array2_size-1);

      var WELCH_T_STATISTIC = (mean1-mean2)/Math.sqrt(variance1/array1_size+variance2/array2_size);
      var DEGREES_OF_FREEDOM = Math.pow(((variance1/array1_size+variance2/array2_size),2.0)/((variance1*variance1)/(array1_size*array1_size*(array1_size-1))+(variance2*variance2)/(array2_size*array2_size*(array2_size-1))).toPrecision(6));
      // console.log(DEGREES_OF_FREEDOM) here is where the NANs start

      var a = DEGREES_OF_FREEDOM/2;
      var x = DEGREES_OF_FREEDOM/(WELCH_T_STATISTIC*WELCH_T_STATISTIC+DEGREES_OF_FREEDOM);
      var N = 65535;
      var h = (x/N).toPrecision(6);
      var sum1 = 0.0;
      var sum2 = 0.0;
      for(var i = 0; i < N; i++) {
        sum1 += (Math.pow(h * i + h / 2.0,a-1))/(Math.sqrt(1-(h * i + h / 2.0)));
        sum2 += (Math.pow(h * i,a-1))/(Math.sqrt(1-h * i));
      }
      var return_value = ((h / 6.0) * ((Math.pow(x,a-1))/(Math.sqrt(1-x)) + 4.0 * sum1 + 2.0 * sum2))/(Math.exp(lgammal(a)+0.57236494292470009-lgammal(a+0.5)));

      if ((Number.isFinite(return_value) == 0) || (return_value > 1.0)) {
          return 1.0;
      } else {
          return return_value;
      }
  }

  function lgammal(xx) {
      var j;
      var x;
      var y;
      var tmp;
      var ser;

      var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2,-0.5395239384953e-5];

      x = xx;
      y = x;
      tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
      ser = 1.000000000190015;
      for (j=0;j<=5;j++)
          ser += (cof[j] / ++y);
      return(Math.log((2.5066282746310005 * ser / x).toPrecision(5)) - tmp);
  }

  var d1 = [27.5,21.0,19.0,23.6,17.0,17.9,16.9,20.1,21.9,22.6,23.1,19.6,19.0,21.7,21.4];
  var d2 = [27.1,22.0,20.8,23.4,23.4,23.5,25.8,22.0,24.8,20.2,21.9,22.1,22.9,20.5,24.4];

  // console.log(calculate_Pvalue(d1,d1.length,d2,d2,length));
  // Checkbox

}
