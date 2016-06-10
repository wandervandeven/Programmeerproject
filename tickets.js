//Wander van de Ven
//10470476

countries = ["BEL", "BGR", "CZE", "DNK", "DEU", "EST", "IRL", "GRC", "ESP", "FRA", "HRV", "ITA", "LVA", "LTU",
"LUX", "HUN", "NLD", "AUT", "POL", "PRT", "ROU", "SVN", "SVK", "FIN", "SWE", "GBR", "NOR", "CHE"]

//to be used variable
var numbers


d3.json("tickets.json", function(error, numbers) {
  if (error) return console.warn(error);



  // all variables to be used
      var tickets = []

      //go through all countries out of json array
      for (i = 0; i < 28; i++)
      { 
            //update variables
            tickets[countries[i]] = numbers[i];
      }



d3.json("tourism_af.json", function(error, data) {
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



for (i = 0; i < countries.length; i++) {
  for (j = 0; j < countries.length; j++) {
    //make right datastructure
    temp = in_tourism[countries[i]][countries[j]]
    in_tourism[countries[i]][countries[j]] = {ticket: temp}
    checker = +(in_tourism[countries[i]][countries[j]].ticket)
    
    //append the fillkey
    
    if (checker > 10000000){
      in_tourism[countries[i]][countries[j]]["fillKey"] = '7';
    }
    else if (checker > 5000000)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '6';
    else if (checker > 2500000)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '5';
    else if (checker > 1000000)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '4';
    else if (checker > 800000)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '3';
    else if (checker > 400000)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '2';
    else if (checker > 400000)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '1';
    else if (checker > 1)
      in_tourism[countries[i]][countries[j]]["fillKey"] = '0';
  }
}

for (i = 0; i < countries.length; i++) {
  for (j = 0; j < countries.length; j++) {
    //make right datastructure
    temp = out_tourism[countries[i]][countries[j]]
    out_tourism[countries[i]][countries[j]] = {ticket: temp}
    checker = +(out_tourism[countries[i]][countries[j]].ticket)
    
    //append the fillkey
    
    if (checker > 10000000){
      out_tourism[countries[i]][countries[j]]["fillKey"] = '7';
    }
    else if (checker > 5000000)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '6';
    else if (checker > 2500000)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '5';
    else if (checker > 1000000)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '4';
    else if (checker > 800000)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '3';
    else if (checker > 400000)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '2';
    else if (checker > 400000)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '1';
    else if (checker > 1)
      out_tourism[countries[i]][countries[j]]["fillKey"] = '0';
  }
}



in_or_out = 0;

// button = document.getElementById('button')
// console.log(button)
// button.onclick
country_picked = 0;
//button 
d3.select('#button').on('click', function(geography) {
  if (in_or_out === 0) {
    graph.updateChoropleth(in_tourism[country_picked]);
    makePieChart(country_picked)
    in_or_out = 1;
  }
  else {    
    graph.updateChoropleth(out_tourism[country_picked]);
    makePieChart(country_picked)
    in_or_out = 0;
  }
})

//dropdown
d3.selectAll('.dropdown-menu li').on('click', function(d){
   var data = d3.select(this).property('value');
   console.log(data)
})



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
              return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br> Tourism: ' +  data.ticket + ' '
            },
          highlightBorderWidth: 3
          },
          //fill scale
          fills: {
              '0' : "#ece7f2",
              '1' : "#d0d1e6",
              '2' : '#a6bddb',
              '3' : '#74a9cf',
              '4' : '#3690c0',
              '5' : '#0570b0',
              '6' : '#045a8d',
              '7' : '#023858',
              defaultFill: 'grey' 
           },
          data: in_tourism[countries[0]],
           //when a country is clicked, call function MakeBarChart
           done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              //makeMap(geography.id)
              if (in_or_out == 0)
                graph.updateChoropleth(in_tourism[geography.id]);
              else
                graph.updateChoropleth(out_tourism[geography.id]);
              makePieChart(geography.id)
              country_picked = geography.id
              //give highest prices
              // makeBarChart()
           });
          }
    });



makePieChart("BEL", in_tourism)

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
    data.push(data2[i]);
  }
  for (i = 7; i < 28; i++){
    summer = summer + data2[i].ticket;
  }
  data.push({"country": 'remaining', "ticket": summer})

  var width = 960,
      height = 500,
      radius = Math.min(width, height) / 3;

  var color = d3.scale.ordinal()
      .range(["#eff3ff", "#c6dbef", "#084594", "#6baed6", "#9ecae1", "#4292c6", "#2171b5", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594",]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(40);

  var labelArc = d3.svg.arc()
      .outerRadius(radius + 50)
      .innerRadius(radius - 30);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.ticket; });

  var svg = d3.select("#container2").append("svg")
      .attr("id", "piechart")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // d3.csv("data.csv", type, function(error, data) {
  //   if (error) throw error;
   

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.country); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".85em")
        .text(function(d) { return d.data.country; });
 

  function type(d) {
    d.population = +d.population;
    return d;
  }
}

function makeBarChart(){



}







});
});  