//Wander van de Ven
//10470476

// //function to give every datapoint a fillkey
// function fill_dec(dataset){
//       console.log(dataset.length)
//       for (i = 0; i < countries.length; i++) {
//             if (dataset[countries[i]].in_year > 120)
//                   dataset[countries[i]]["fillKey"] = '7';    
//             else if (dataset[countries[i]].in_year > 80)
//                   dataset[countries[i]]["fillKey"] = '6';
//             else if (dataset[countries[i]].in_year > 65)
//                   dataset[countries[i]]["fillKey"] = '5';
//             else if (dataset[countries[i]].in_year > 50)
//                   dataset[countries[i]]["fillKey"] = '4';
//             else if (dataset[countries[i]].in_year > 35)
//                   dataset[countries[i]]["fillKey"] = '3';
//             else if (dataset[countries[i]].in_year > 25)
//                   dataset[countries[i]]["fillKey"] = '2';
//             else if (dataset[countries[i]].in_year > 1)
//                   dataset[countries[i]]["fillKey"] = '1';
//       // console.log(dataset)
//       }

countries = ["BEL", "BGR", "CZE", "DNK", "DEU", "EST", "IRL", "GRC", "ESP", "FRA", "HRV", "ITA", "LVA", "LTU",
"LUX", "HUN", "NLD", "AUT", "POL", "PRT", "ROU", "SVN", "SVK", "FIN", "SWE", "GBR", "NOR", "CHE"]

//to be used variable
var data;

d3.json("tourism.json", function(error, data) {
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
// console.log(in_tourism)



function displayName(name) {
  getElementById('country_name').firstChild.data = name;
}





}); 
 

// }
//     //basic map config with custom fills, mercator projection
//       var map = new Datamap({
//         scope: 'world',
//         element: document.getElementById('container1'),
//         projection: 'mercator',
//         height: 500,
//         fills: {
//           defaultFill: '#f0af0a',
//           lt50: 'rgba(0,244,244,0.9)',
//           gt50: 'red'
//         },
        
//         data: {
//           USA: {fillKey: 'lt50' },
//           RUS: {fillKey: 'lt50' },
//           CAN: {fillKey: 'lt50' },
//           BRA: {fillKey: 'gt50' },
//           ARG: {fillKey: 'gt50'},
//           COL: {fillKey: 'gt50' },
//           AUS: {fillKey: 'gt50' },
//           ZAF: {fillKey: 'gt50' },
//           MAD: {fillKey: 'gt50' }       
//         }
//       })
      
      
//       //sample of the arc plugin
//       map.arc([
//        {
//         origin: {
//             latitude: 40.639722,
//             longitude: 73.778889
//         },
//         destination: {
//             latitude: 37.618889,
//             longitude: -122.375
//         }
//       },
//       {
//           origin: {
//               latitude: 30.194444,
//               longitude: -97.67
//           },
//           destination: {
//               latitude: 25.793333,
//               longitude: -0.290556
//           }
//       }
//       ], {strokeWidth: 2});
       
      
//        //bubbles, custom popup on hover template
//      map.bubbles([
//        {name: 'Hot', latitude: 21.32, longitude: 5.32, radius: 10, fillKey: 'gt50'},
//        {name: 'Chilly', latitude: -25.32, longitude: 120.32, radius: 18, fillKey: 'lt50'},
//        {name: 'Hot again', latitude: 21.32, longitude: -84.32, radius: 8, fillKey: 'gt50'},

//      ], {
//        popupTemplate: function(geo, data) {
//          return "<div class='hoverinfo'>It is " + data.name + "</div>";
//        }
// });
// // //default year for data
// // temp = year_2003_in;
// // fill_dec(temp)    

// //create map centered at Europe
//   var graph = new Datamap({
//           element: document.getElementById("container1"),
//           projection: 'mercator',
//           setProjection: function(element) {
//             var projection = d3.geo.equirectangular()
//               .center([10, 50])
//               .rotate([4.4, 0])
//               .scale(600)
//               .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
//             var path = d3.geo.path()
//               .projection(projection);
//             return {path: path, projection: projection};  
//           },
//           // create tooltip
//           geographyConfig: {
//             highlightBorderColor: '#bada55',
//             popupTemplate: function(geography, data) {
//               return '<div class="hoverinfo"><b>' + geography.properties.name + '</b></br> Number of Students: ' +  data.in_year + ' '
//             },
//           highlightBorderWidth: 3
//           },
//           //fill scale
//           fills: {
//               '1' : "#eff3ff",
//               '2' : '#c6dbef',
//               '3' : '#9ecae1',
//               '4' : '#6baed6',
//               '5' : '#4292c6',
//               '6' : '#2171b5',
//               '7' : '#084594',
//               defaultFill: 'black' 
//            },
//            data: temp,
//            //when a country is clicked, call function MakeBarChart
//            // done: function(datamap) {
//            //    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
//            //      MakeBarChart(geography.id)
//            // });
//           }
//     });

// });


// var dataset = 0;
// var slide = document.getElementById('slide'),
//     sliderDiv = document.getElementById("sliderAmount");

// //on change of slider, refill the countries with colours
// slide.onchange = function() { 
//     sliderDiv.innerHTML = this.value    
    
//     //check which year is given by slider
//     if (this.value == 2006){
//       dataset = year_2006_in;
//       console.log(dataset)
//     }  
//     else if (this.value == 2009)
//       dataset = year_2009_in;
//     else if (this.value == 2012)
//       dataset = year_2012_in;
//     else
//       dataset = year_2003_in;

//     fill_dec(dataset)
        

//     graph.updateChoropleth(dataset)
// }


// //to be used variable  
// temp_data = [];


// //function to create data variable for BarChart
// function MakeBarChart(landcode){

//   temp_data[0] = {year: 2003, in_year : year_2003_in[landcode].in_year};

//   temp_data[1] = {year: 2006, in_year : year_2006_in[landcode].in_year};

//   temp_data[2] = {year: 2009, in_year : year_2009_in[landcode].in_year};

//   temp_data[3] = {year: 2012, in_year : year_2012_in[landcode].in_year};

//   data = temp_data;

//   console.log(data)

//   //delete svg
//   //d3.select(".chart").remove();   
  
// //create margins
//   var margin = {top: 20, right: 30, bottom: 30, left: 40},
//       width = 960 - margin.left - margin.right,
//       height = 500 - margin.top - margin.bottom;

//   var x = d3.scale.ordinal()
//       .rangeRoundBands([0, width], .1);

//   var y = d3.scale.linear()
//       .range([height, 0]);

//   var xAxis = d3.svg.axis()
//       .scale(x)
//       .orient("bottom");

//   var yAxis = d3.svg.axis()
//       .scale(y)
//       .orient("left");  

// //create new svg
//   var chart = d3.select("body")
//                   .append("svg")
//                     .attr("class", "chart")
//                     .attr("width", width + margin.left + margin.right)
//                     .attr("height", height + margin.top + margin.bottom)
//                   .append("g")
//                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
//   x.domain(data.map(function(d) { return d.year; }));
//   y.domain([0, d3.max(data, function(d) { return parseFloat(d.in_year); })]);

//   chart.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);

//   chart.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);

//   chart.selectAll(".bar")
//         .data(data)
//       .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return x(d.year); })
//         .attr("y", function(d) {return y(parseFloat(d.in_year)); })
//         .attr("height", function(d) { return height - y(parseFloat(d.in_year)); })
//         .attr("width", x.rangeBand());


//   function type(d) {
//     d.value = +d.value; // coerce to number
//     return d;
//   }
// }

// });




















