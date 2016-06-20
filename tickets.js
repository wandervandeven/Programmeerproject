//Wander van de Ven
//10470476

countries = ["BEL", "BGR", "CZE", "DNK", "DEU", "EST", "IRL", "GRC", "ESP", "FRA", "HRV", "ITA", "LVA", "LTU",
"LUX", "HUN", "NLD", "AUT", "POL", "PRT", "ROU", "SVN", "SVK", "FIN", "SWE", "GBR", "NOR", "CHE"]

//to be used variable
var numbers

// queue()
//   .defer(d3.json, 'tourism_af.json')
//   .defer(d3.json, 'koopkrachtquota.json')


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

console.log(country_picked)

//text in- of uitstroom
function textInUit(in_or_out, country_picked) {
  if (in_or_out == 0)
    document.getElementById("in_of_uit").innerHTML = "De instroom van toeristen in" + ' ' + country_picked;
  else {
    document.getElementById("in_of_uit").innerHTML = "De uitstroom van toeristen uit" + ' ' + country_picked;
  }
};

//which country was picked
//country_picked = 0;





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
            highlightBorderColor: '#bada55',
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
          data: in_tourism[countries[0]],
          paintBorder: 'BEL',          
           //when a country is clicked, call function MakeBarChart
           done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              //makeMap(geography.id)
              if (in_or_out == 0)
                graph.updateChoropleth(in_tourism[geography.id]);
              else
                graph.updateChoropleth(out_tourism[geography.id]);
              makePieChart(geography.id)
              makeScatterChart(geography.id)
              country_picked = geography.id
              textInUit(in_or_out, country_picked)

              //give highest prices
              // makeBarChart()
           });
          }
    });


//Legend





//PieChart

function makePieChart(id) {
  
  d3.select("#piechart").remove()

  var data2 = []
  if (in_or_out == 0)
    var country_ticket = in_tourism[id]
  else 
    var country_ticket = out_tourism[id]
  
  
  for (var key in country_ticket) {
    data2.push({"country": key, "ticket": +country_ticket[key].ticket})
  }

  data2.sort(function(a,b) {
    return parseFloat(b.ticket) - parseFloat(a.ticket);
  })

  var data = []
  var summer = 0;
  for (i = 0; i < 7; i++) {
    if (data2[i].ticket != undefined)   
      data.push(data2[i]);
  }
  for (i = 7; i < 28; i++){
    if (data2[i].ticket != undefined)  
      summer = summer + data2[i].ticket;
  }
  data.push({"country": 'remainder', "ticket": summer})

  console.log(data)

  if (data.length < 1) {
    console.log('no pie')
    document.getElementById('text-piechart').innerHTML = 'No Data to show';
  }
  else {
    document.getElementById('text-piechart').innerHTML = '';
  temp1 = data[0]
  temp2 = data[2]
  temp3 = data[4]

  data[0] = data[7]
  data[7] = temp1
  data[2] = data[5]
  data[5] = temp2
  data[4] = data[3]
  data[3] = temp3

  var width = 600,
      height = 500,
      radius = Math.min(width, height) / 4;

  // if (in_or_out == 0) {
    var b = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#084594", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594",];
  // }
  // else {
  //  var b = ["#d6604d", '#f4a582', '#fddbc7', '#d1e5f0', '#fb6a4a', '#92c5de', '#4393c3', '#80b1d3', 'blue']

  //"#fcbba1", '#67000d', "#fcbba1", "#4292c6", "#2171b5", "#084594", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594",];
  // }
















// #ccebc5

  var color = d3.scale.ordinal() 
      .range(b);
    
  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(90);

  var labelArc = d3.svg.arc()
      .outerRadius(radius + 50)
      .innerRadius(radius - 0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.ticket; });

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








//ScatterChart

function makeScatterChart(id){

  var margin = {top: 20, right: 20, bottom: 80, left: 40},
      width = 400 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // /* 
  //  * value accessor - returns the value to encode for a given data object.
  //  * scale - maps value to a visual display encoding, such as a pixel position.
  //  * map function - maps from data value to display value
  //  * axis - sets up axis
  //  */ 

  var quotum = [];

  if (in_or_out == 0)
    var quota2 = quota_in[id];
  else
    var quota2 = quota_out[id];

  d3.select("#scatter").remove()

  //MAKE ALL DATA READY
  if (in_or_out == 0)
    var country_ticket = in_tourism[id]
  else 
    var country_ticket = out_tourism[id]
  
  
  //push everything to quotum
  for (var key in country_ticket)
  { 
    //update variables
    if (+quota2[key] != 0 && +country_ticket[key].ticket != 0)
      quotum.push({"country" : key, "quotum" : +quota2[key], "tourists" : +country_ticket[key].ticket/1000000});
  }

  //variable to make scatter
  var data = quotum;


   //x quotum, y tourists
  // setup x 
  var xValue = function(d) { return d.quotum;}, // data -> value
      xScale = d3.scale.linear().range([0, width]), // value -> display
      xMap = function(d) { return xScale(xValue(d));}, // data -> display
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");

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
        .text("Koopkrachtquotum (landx/landy)");

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
        .text("Toeristen Aantal ");

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
                 .style("opacity", .9);
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



  var xSeries = d3.range(1, xLabels.length + 1)
  var ySeries = data.map(function(d) { return parseFloat(d.tourists); });
  var leastSquaresCoeff = leastSquares(xSeries, ySeries);
  // apply the reults of the least squares regression
  var x1 = xLabels[0];
  var y1 = leastSquaresCoeff[0]*xSeries[0] + leastSquaresCoeff[1];
  var x2 = xLabels[xLabels.length - 1];
  var y2 = leastSquaresCoeff[0] * xSeries[xSeries.length - 1] + leastSquaresCoeff[1];
  var trendData = [[x1,y1,x2,y2]];
  var trendline = svg.selectAll(".trendline")
  .data(trendData);
  trendline.enter()
    .append("line")
    .attr("class", "trendline")
    .attr("x1", function(d) { console.log(d[0]); return xScale(d[0])})
    .attr("y1", function(d) { return yScale(d[1]); })
    .attr("x2", function(d) { return xScale(d[2]); })
    .attr("y2", function(d) { return yScale(d[3]); })
    .attr("stroke", "red")
    .attr("stroke-width", 1.5);

};







//make first Piechart en ScatterChart

makePieChart("BEL", in_tourism)
makeScatterChart('BEL')



//button 
d3.select('#button').on('click', function(geography) {
  if (in_or_out == 0) {
    in_or_out = 1;
    graph.updateChoropleth(out_tourism[country_picked]);
    textInUit(in_or_out);
    makePieChart(country_picked);
    makeScatterChart(country_picked);
    textInUit(in_or_out, country_picked)
    
  }
  else {    
    in_or_out = 0;
    graph.updateChoropleth(in_tourism[country_picked]);
    textInUit(in_or_out)
    makePieChart(country_picked)
    makeScatterChart(country_picked)
    textInUit(in_or_out, country_picked)
  }
})

//dropdown
d3.selectAll('.dropdown-menu li').on('click', function(d){
   var data = d3.select(this).property('value');
   // console.log(data)
})




});
});  