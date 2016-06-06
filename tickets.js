//Wander van de Ven
//10470476

countries = ["BEL", "BGR", "CZE", "DNK", "DEU", "EST", "IRL", "GRC", "ESP", "FRA", "HRV", "ITA", "LVA", "LTU",
"LUX", "HUN", "NLD", "AUT", "POL", "PRT", "ROU", "SVN", "SVK", "FIN", "SWE", "GBR", "NOR", "CHE"]

//to be used variable
var numbers

d3.json("tickets.json", function(error, numbers) {
  if (error) return console.warn(error);

  // console.log(numbers)

  // all variables to be used
      var tickets = []

      //go through all countries out of json array
      for (i = 0; i < 28; i++)
      { 
            //update variables
            tickets[countries[i]] = numbers[i];
      }



// console.log(tickets[countries[1]][countries[2]])

for (i = 0; i < countries.length; i++) {
  for (j = 0; j < countries.length; j++) {
    //make right datastructure
    temp = tickets[countries[i]][countries[j]]
    tickets[countries[i]][countries[j]] = {ticket: temp}
    //append the fillkey
    if (tickets[countries[i]][countries[j]].ticket > 500)
      tickets[countries[i]][countries[j]]["fillKey"] = '6';
    else if (tickets[countries[i]][countries[j]].ticket > 400)
      tickets[countries[i]][countries[j]]["fillKey"] = '5';
    else if (tickets[countries[i]][countries[j]].ticket > 300)
      tickets[countries[i]][countries[j]]["fillKey"] = '4';
    else if (tickets[countries[i]][countries[j]].ticket > 200)
      tickets[countries[i]][countries[j]]["fillKey"] = '3';
    else if (tickets[countries[i]][countries[j]].ticket > 100)
      tickets[countries[i]][countries[j]]["fillKey"] = '2';
    else if (tickets[countries[i]][countries[j]].ticket > 1)
      tickets[countries[i]][countries[j]]["fillKey"] = '1';
    else
      tickets[countries[i]][countries[j]]["fillKey"] = '0';
  }
}
console.log(tickets)

// function(datamap) {
//   datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
//   makeMap(geography.id)
// });
    
// on_click geography.properties.id

// country = tickets[countries[1]];
// console.log(tickets)
// makeMap(country)

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
              return '<div class="hoverinfo"><b>' + geography.properties.name
            },
          highlightBorderWidth: 3
          },
          //fill scale
          fills: {
              '1' : "#eff3ff",
              '2' : '#c6dbef',
              '3' : '#9ecae1',
              '4' : '#6baed6',
              '5' : '#4292c6',
              '6' : '#2171b5',
              '7' : '#084594',
              // defaultFill: 'black' 
           },
          data: tickets[countries[1]]
           //when a country is clicked, call function MakeBarChart
           done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              //makeMap(geography.id)
              // graph.updateChoropleth(tickets[geography.id]);
           });
          }
    });


//geography.id


});  