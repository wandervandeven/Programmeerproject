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


console.log(tickets)




});  