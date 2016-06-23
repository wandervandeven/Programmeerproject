//Wander van de Ven
//10470476

countries = ["BEL", "BGR", "CZE", "DNK", "DEU", "EST", "IRL", "GRC", "ESP", "FRA", "HRV", "ITA", "LVA", "LTU",
"LUX", "HUN", "NLD", "AUT", "POL", "PRT", "ROU", "SVN", "SVK", "FIN", "SWE", "GBR", "NOR", "CHE"]

var lang_family = [
  ['BEL', 2],
  ['BGR', 6],
  ['CZE', 6],
  ['DNK', 4],
  ['DEU', 3],
  ['EST', 7],
  ['IRL', 3],
  ['GRC', ],
  ['ESP', 2],
  ['FRA',  2],
  ['HRV', 6],
  ['ITA', 2],
  ['LVA',  5],
  ['LTU', 5],
  ['LUX', ],
  ['HUN', ],
  ['NLD', 3],
  ['AUT', 3],
  ['POL', 6],
  ['PRT',  2],
  ['ROU', 2],
  ['SVK',  6],
  ['SVN', 6],
  ['FIN', 7],
  ['SWE', 4],
  ['GBR', 3],
  ['NOR', 4],
  ['CZE', 3],
  ];

var country_names = [
  ['BEL', 'Belgium'],
  ['BGR', 'Bulgaria'],
  ['CZE', 'Czech'],
  ['DNK', 'Denmark'],
  ['DEU', 'Germany'],
  ['EST', 'Estonia'],
  ['IRL', 'Ireland'],
  ['GRC', 'Greece'],
  ['ESP', 'Spain'],
  ['FRA',  'France'],
  ['HRV', 'Croatia'],
  ['ITA', 'Italy'],
  ['LVA',  'Latvia'],
  ['LTU', 'Lithuania'],
  ['LUX', 'Luxembourg'],
  ['HUN', 'Hungary'],
  ['NLD', "Netherlands"],
  ['AUT', 'Austria'],
  ['POL', 'Poland'],
  ['PRT',  'Portugal'],
  ['ROU', 'Romania'],
  ['SVK',  'Slovakia'],
  ['SVN', 'Slovenia'],
  ['FIN', 'Finland'],
  ['SWE', 'Sweden'],
  ['GBR', 'UK'],
  ['NOR', 'Norway'],
  ['CZE', 'Switzerland'],
  ];

//to be used variable
var numbers

// queue()
//   .defer(d3.json, 'tourism_af.json')
//   .defer(d3.json, 'koopkrachtquota.json')
    // returns slope, intercept and r-square of the line
function leastSquares(xSeries, ySeries) {
  var reduceSumFunc = function(prev, cur) { return prev + cur; };
  
  var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;
  var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
    .reduce(reduceSumFunc);
  
  var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
    .reduce(reduceSumFunc);
    
  var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
    .reduce(reduceSumFunc);
    
  var slope = ssXY / ssXX;
  var intercept = yBar - (xBar * slope);
  var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
  
  return [slope, intercept, rSquare];
}

d3.json("tourism_af.json", function(error, data) {
  if (error) return console.warn(error);

d3.json("koopkrachtquota-af.json", function(error, numbers) {
  if (error) return console.warn(error);

// all variables to be used
var out_tourism = []
var in_tourism = []

//go through all countries out of json array
for (i = 0; i < 28; i++)
{ 
      //update variables
      out_tourism[countries[i]] = data[i];
}

//go through all countries out of json array
for (i = 28; i < data.length; i++)
{ 
      //update variables
      in_tourism[countries[i - 28]] = data[i];
}

var quota_in = []
var quota_out = []
// all variables to be used
//go through all countries out of json array
for (i = 0; i < 28; i++)
{ 
      //update variables
      quota_in[countries[i]] = numbers[i];
}

for (i = 0; i < 56; i++)
{ 
      //update variables
      quota_out[countries[i]] = numbers[i + 28];
}





//reforme data
dataFormat(in_tourism, 'in');
dataFormat(out_tourism, 'out');

//function to give data a fillkey
function dataFormat(data, prefix){
  for (i = 0; i < countries.length; i++) {
    for (j = 0; j < countries.length; j++) {
      //make right datastructure
      temp = data[countries[i]][countries[j]]
      data[countries[i]][countries[j]] = {ticket: temp}
      checker = +(data[countries[i]][countries[j]].ticket)
      
      //append the fillkey
      if (checker > 10000000){
        data[countries[i]][countries[j]]["fillKey"] = prefix + '7';
      }
      else if (checker > 5000000)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '6';
      else if (checker > 2500000)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '5';
      else if (checker > 1000000)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '4';
      else if (checker > 800000)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '3';
      else if (checker > 400000)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '2';
      else if (checker > 200000)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '1';
      else if (checker > 0)
        data[countries[i]][countries[j]]["fillKey"] = prefix + '0';
      else
        data[countries[i]][countries[j]]["fillKey"] = 'none'
    }
  }
};  




//incoming or outgoing to show
var in_or_out = 0;

var country_picked = 'BEL';

textInUit(in_or_out, country_picked);

//text in- of uitstroom
function textInUit(in_or_out, country_picked) {
  var country_chosen = 0;
  for (i = 0; i < countries.length; i++)
    if (country_picked == country_names[i][0])
      country_chosen = country_names[i][1];

  if (in_or_out == 0)
    document.getElementById("in_of_uit").innerHTML = "The inflow of tourism into" + ' ' + country_chosen;
  else {
    document.getElementById("in_of_uit").innerHTML = "The outflow of tourism out of" + ' ' + country_chosen;
  }
};


//Datamap


var dropper = 1;

var graph = 0;

 // * (dropper -1))
var temper = in_tourism['BEL'];
// #ff7f00
// #cab2d6
makeMap(temper, dropper, 'BEL');

function makeMap(temper, dropper, country_picked) {

  d3.select("#container1").selectAll("svg").remove()

  var graph = new Datamap({
            element: document.getElementById("container1"),
            projection: 'mercator',
            setProjection: function(element) {
              var projection = d3.geo.equirectangular()
                .center([15, 53])
                .rotate([4.4, 0])
                .scale(750)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
              var path = d3.geo.path()
                .projection(projection);
              return {path: path, projection: projection};  
            },
            // create tooltip
            geographyConfig: {
              borderColor: function (data) {
              if ( dropper == 2) { 
                //console.log('dropper')
                for (i = 0; i < countries.length; i++) {
                  if( data.id == lang_family[i][0]){
                    if (lang_family[i][1] == 1)
                      return "#a6cee3" 
                    if (lang_family[i][1] == 2)
                      return "#1f78b4"
                    if (lang_family[i][1] == 3)
                      return "#b2df8a"
                    if (lang_family[i][1] == 4)
                      return "#33a02c"
                    if (lang_family[i][1] == 5)
                      return "#fb9a99"
                    if (lang_family[i][1] == 6)
                      return "#e31a1c"
                    if (lang_family[i][1] == 7)
                      return "#fdbf6f"
                  }
                }   
                return 'white';
              }  
            },
            borderWidth: 2,  
              highlightBorderColor: '#fdc086',
              highlightFillColor: 'black',
              popupTemplate: function(geography, data) {
                if (data.ticket < 1)
                  return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br> Tourism: ' +  'No Data'
                else
                  return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br> Tourism: ' +  Math.round(data.ticket/100000, 2) + ' ' + 'Million nights spent'
              },
            highlightBorderWidth: 3
            },
            //fill scale
            fills: {  
                  'in0' : "#ece7f2",
                  'in1' : "#d0d1e6",
                  'in2' : '#a6bddb',
                  'in3' : '#74a9cf',
                  'in4' : '#3690c0',
                  'in5' : '#0570b0',
                  'in6' : '#045a8d',
                  'in7' : '#023858',
               
                  'out0' : "#fee0d2",
                  'out1' : "#fcbba1",
                  'out2' : '#fc9272',
                  'out3' : '#fb6a4a',
                  'out4' : '#ef3b2c',
                  'out5' : '#cb181d',
                  'out6' : '#a50f15',
                  'out7' : '#67000d',
                  'defaultFill': 'grey',
                  'none' : 'grey'
             },
            data: temper,
            paintBorder: 'BEL',          
             //when a country is clicked, call function MakeBarChart
             done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                  //makeMap(geography.id)
                  country_picked = geography.id
                  //console.log(typeof(geography.id))
                  if (in_or_out == 0)
                    graph.updateChoropleth(in_tourism[geography.id]);
                  else
                    graph.updateChoropleth(out_tourism[geography.id]);
                  makePieChart(geography.id)
                  makeScatterChart(geography.id)
                  textInUit(in_or_out, country_picked)
                });
                
              }
      });
    //button
    d3.select('#button').on('click', function() {
      if (in_or_out == 0) {
        in_or_out = 1;
        //console.log(country_picked)
        //console.log(out_tourism)
        graph.updateChoropleth(out_tourism[country_picked]);
        makePieChart(country_picked);
        makeScatterChart(country_picked);
        textInUit(in_or_out, country_picked)
        console.log('test1')
        
      }
      else {    
        in_or_out = 0;
        //console.log(typeof(country_picked))
        //console.log(in_tourism)
        graph.updateChoropleth(in_tourism[country_picked]);
        makePieChart(country_picked) 
        makeScatterChart(country_picked)
        textInUit(in_or_out, country_picked)
        console.log('test2')
      }
    }) 
  };

//Legend





//PieChart

function makePieChart(id) {
  
  d3.select("#piechart").remove()
  //console.log('hallo')
  //console.log(id)
  console.log(in_or_out)

  if (!(countries.includes(id)))
    document.getElementById('text-piechart').innerHTML = 'No Data to show';
  else { 

    //ask for the right data
    if (in_or_out == 0){
      var country_ticket = in_tourism[id];
    }
    else 
      var country_ticket = out_tourism[id];
    //console.log(country_ticket)
    //make variable for piechart data
    var data2 = []

    //insert all data into variable
    for (var key in country_ticket) {
      data2.push({"country": key, "ticket": +country_ticket[key].ticket});
    }

    //sort the data
    data2.sort(function(a,b) {
      return parseFloat(b.ticket) - parseFloat(a.ticket);
    })

    //create 2 variables 
    var data_pie = []
    var summer = 0;

    //only take 7 biggest values to insert into pie chart
    for (i = 0; i < 7; i++) {
      //do not push if variable = 0 or undefined
      if ((data2[i].ticket != undefined) && (data2[i].ticket != 0)) {   
        data_pie.push(data2[i]); 
      }
    }
    //sum the rest of the values for remainder
    for (i = 7; i < 28; i++){
      if (data2[i].ticket != undefined)  
        summer = summer + data2[i].ticket;
    }
    //if the remainder != 0 nor undefined, insert into piechart data
    if (summer != undefined && summer != 0) 
      data_pie.push({"country": 'other countries', "ticket": summer})


    //no data? --> show message
    if (data_pie.length < 1) {
      document.getElementById('text-piechart').innerHTML = 'No Data to show';
    }
    else {
      document.getElementById('text-piechart').innerHTML = '';
      
      //create two indices 
      j = data_pie.length - 1;
      k = 0;

      // variable to use for piechart
      var data = [];


      //alternate big number and small number for pie chart
      for (i = 0; i < data_pie.length; i++) {
        if ( j > data_pie.length/2 ) {
          data.push(data_pie[j])
          j = j - 1;
        }  
        if (k <= data_pie.length/2) {
          data.push(data_pie[k])
          k = k + 1;
        }
      }    

      //define size
      var width = 600,
          height = 500,
          radius = Math.min(width, height) / 4;

      //colors for piechart
      var b = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#084594", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594",];

      //make d3 piechart
      var color = d3.scale.ordinal() 
          .range(b);
        
      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(90);

      var labelArc = d3.svg.arc()
          .outerRadius(radius + 50)
          .innerRadius(radius - 0);

      //do not sort piechart    
      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.ticket; });

      //put piechart into div with id s.t. removable once again
      var svg = d3.select("#container2").append("svg")
          .attr("id", "piechart")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(data))
          .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.country); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", "1em")
            .text(function(d) { return d.data.country; });

    }      
  }
};








//ScatterChart

function makeScatterChart(id){

  var margin = {top: 20, right: 20, bottom: 80, left: 40},
      width = 550 - margin.left - margin.right,
      height = 360 - margin.top - margin.bottom;

  // /* 
  //  * value accessor - returns the value to encode for a given data object.
  //  * scale - maps value to a visual display encoding, such as a pixel position.
  //  * map function - maps from data value to display value
  //  * axis - sets up axis
  //  */ 

  d3.select("#scatter").remove()

  if (!(countries.includes(id)) || (in_or_out == 1 && (id == 'SWE' || id == 'NOR' || id == 'AUT'))) {
    console.log('poepchinees')
    document.getElementById('text-scatterchart').innerHTML = 'No Data to show';
  } 
  else {
    document.getElementById('text-scatterchart').innerHTML = '';
    
    var quotum = [];

    //Make purchasing power data ready
    if (in_or_out == 0){
      var quota2 = quota_in[id];
    }
    else{
      var quota2 = quota_out[id];
    }
    //Make tourism data ready
    if (in_or_out == 0){
      var country_ticket = in_tourism[id];
    }
    else { 
      var country_ticket = out_tourism[id];
    }
    
    //push everything to quotum
    for (var key in country_ticket)
    { 
      //update variables
      //console.log(+country_ticket[key].ticket)
      if (+country_ticket[key].ticket != 0 && +country_ticket[key].ticket != undefined && +country_ticket[key].ticket != NaN){
        quotum.push({"country" : key, "quotum" : +quota2[key], "tourists" : +country_ticket[key].ticket/1000000});
      }
    }
    

    //check if quotum data isn't as supposed
    if (quotum.length < 1)
      console.log('fucking hell')
    else {
    
      //variable to make scatter
      var data = quotum;


       //x quotum, y tourists
      // setup x 
      var xValue = function(d) { return d.quotum;}, // data -> value
          xScale = d3.scale.linear().range([0, width]), // value -> display
          xMap = function(d) { return xScale(xValue(d));}, // data -> display
          xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.format(".2f"));

      // setup y
      var yValue = function(d) { return d.tourists;}, // data -> value
          yScale = d3.scale.linear().range([height, 0]), // value -> display
          yMap = function(d) { return yScale(yValue(d));}, // data -> display
          yAxis = d3.svg.axis().scale(yScale).orient("left");

      // add the graph canvas to the body of the webpage
      var svg = d3.select("#container5").append("svg")
          .attr("id", "scatter")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // add the tooltip area to the webpage
      var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);


        var xLabels = [d3.min(data, xValue), d3.max(data, xValue)]
        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain(xLabels);
        yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .attr("dy", "4em")
            .style("text-anchor", "end")
            .text("Purchasing Power quotum (countryx/countryy)");

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-3.5em")
            .style("text-anchor", "end")
            .text("Tourism amount (Mln days/year)");

        // draw dots
        svg.selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .on("mouseover", function(d) {
                console.log('mouse')
                tooltip.transition()
                     .duration(200)
                     .style("opacity", 0.9);
                tooltip.html(d.country + "<br/> (" + xValue(d) 
                + ", " + yValue(d) + ")")
                     .style("left", (d3.event.pageX + 20) + "px")
                     .style("top", (d3.event.pageY - 50) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                     .duration(500)
                     .style("opacity", 0);
            });
    };

      var xSeries = d3.range(1, xLabels.length + 1)
      var ySeries = data.map(function(d) { return parseFloat(d.tourists); });
      var leastSquaresCoeff = leastSquares(xSeries, ySeries);
      // apply the reults of the least squares regression
      var x1 = xLabels[0];
      var y1 = leastSquaresCoeff[0]*xSeries[0] + leastSquaresCoeff[1];
      var x2 = xLabels[xLabels.length - 1];
      var y2 = leastSquaresCoeff[0] * xSeries[xSeries.length - 1] + leastSquaresCoeff[1];
      
      // change endpoints of the regression line if y2 is lower/higher than minimal/maximal y-axis value
      // if (y2 < d3.min(ySeries))
      // {
      //   y2 = d3.min(ySeries);
      //   x2 = (d3.min(ySeries) - leastSquaresCoeff.intercept) / leastSquaresCoeff.slope;
      // }
      // else if (y2 > d3.max(ySeries))
      // {
      //   y2 = d3.max(ySeries);
      //   x2 = (d3.max(ySeries) - leastSquaresCoeff.intercept) / leastSquaresCoeff.slope;
      // }

      var trendData = [[x1,y1,x2,y2]];
      var trendline = svg.selectAll(".trendline")
      .data(trendData);
      trendline.enter()
        .append("line")
        .attr("class", "trendline")
        .attr("x1", function(d) { return xScale(d[0]); })
        .attr("y1", function(d) { return yScale(d[1]); })
        .attr("x2", function(d) { return xScale(d[2]); })
        .attr("y2", function(d) { return yScale(d[3]); })
        .attr("stroke", "red")
        .attr("stroke-width", 1.5);
  }

};





//make first Piechart and ScatterChart

makePieChart('BEL')
makeScatterChart('BEL')

//document.getElementsByClassName('BEL')[0].click()



//dropdown
  d3.selectAll('.dropdown-menu li').on('click', function(d){
    var dropper = d3.select(this).property('value');
    if (in_or_out == 0)
      makeMap(in_tourism[country_picked], dropper, country_picked)
    else
      makeMap(out_tourism[country_picked], dropper, country_picked)
  })



});
});  