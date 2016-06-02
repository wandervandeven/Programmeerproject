#http://www.anthonydebarros.com/2013/02/05/get-json-from-excel-using-python-xlrd/

import csv
from collections import OrderedDict
import json

plain_tickets = []

countries = ["BEL", "BGR", "CZE", "DNK", "DEU", "EST", "IRL", "GRC", "ESP", "FRA", "HRV", "ITA", "LVA", "LTU",
"LUX", "HUN", "NLD", "AUT", "POL", "PRT", "ROU", "SVN", "SVK", "FIN", "SWE", "GBR", "NOR", "CHE"]



# Open the workbook
with open ('Ticketprijzen.csv', 'rU') as f:
	reader = csv.reader(f, delimiter=';')
	# Iterate through rows, returning each as a list that you can index:
	for row in reader:
		tickets = OrderedDict()
		for i in range(len(countries)):
			tickets[countries[i]] = row[i]
		plain_tickets.append(tickets)

j = json.dumps(plain_tickets)
# Write to file
with open('tickets.json', 'w') as f:
    f.write(j)

 





    
    
      
