Eindproject Minor Programmeren door Wander van de Ven
======================================================================================================================
Logboek
--------------------------------------------------------------------------------------------------------
> ma 30 mei:
> Kiezen van onderwerp: Toerisme. De toerisme stromen van de wereld. Het verifieren van 3 verschillene hypothesen. Begin zoeken data.
>
di 31 mei:
> Verder zoeken van Data. Data wereld onvindbaar. Data Europa is vindbaar op EuroStat. Begin maken van Data vliegtickets.
woe 1 juni:
> Stop data vliegtickets zoeken. Beginnen met omvormen van CSV files en het schrijven van een functie om de CSV file tot JSON te vormen. 
>
do 2 juni:
> Zoeken naar een datamap van Europa. Bestaat niet. SVG wordt na lang zoeken gekozen. Veel internet speurwerk hoe deze te gaan kleuren. Bovenal extra functies te kunnen toevoegen zoals markering. 
Zien hoe deze id's op te vragen zijn. Sommige landen zijn niet ophaalbaar met id.
>
vr 3 juni:
> ziek
>
za 4 juni:
> ziek
>
zo 5 juni:
> inlezen in DataMap. Iets beter.
>
ma 6 juni:
> SVG blijkt onhandig. Mensen hebben Datamaps gevonden die veel scherper is. Deze geimplementeerd. Met een zoomfunctie kan deze Europa visualiseren. 
d3.json van de toerisme aantallen lukt, een fillkey wordt toegevoegd en vervolgens ook het kleuren van de map per land.
>
di 7 juni:
> Er worden landen gevisualiseerd die niet bij Europa horen. Datamaps lokaal opgeslagen en landen verwijderd. Een begin wordt gemaakt van het maken van de donut.
De donut visualiseren mbv dezelfde tsv lukt. Nu mijn data in dezelfde structuur omvormen.
>
woe 8 juni:
omvormen van Data gelukt. Donut wordt gevormd, maar landennamen worden over elkaar heengeschreven en sommige landen worden nieteens weergegeven. Hun toerisme aantallen zijn te klein. 
Mbv van het uitzetten van de sorter van d3 piechart wordt getracht dit tegen te gaan. Maar het feit blijft dat sommige aantallen te klein zijn. 
Morgen verder. 
>
do 9 juni:
> Helemaal besloten de ticketprijzen niet te visualiseren in plaats daarvan koopkrachtquota. Deze vandaag voor alle landen opgezocht en in dezelfde format
als de toerisme aantallen geschreven. De datamap legenda ingevoegd. CSS voor tekst geimplementeerd. Geprobeerd de donut te verbeteren maar nog niet gelukt.
>
vr 10 juni:
Besloten niet alleen inkomende stromen maar ook uitgaande stromen te visualiseren. 
Door de tabel van Excel te transponeren en dezelfde stappen te gebruiken kunnen deze in javascript worden geimporteerd.
Extra variabelen aangemaakt voor in en outflow. Beide d3.json achter elkaar gezet, beide importeerbaar.
>
ma 13 juni:
Nu zowel ingaande als uitgaande stromen te visualiseren. Knoppen gemaakt die ' choose taalfamilies' aanzet. 
Mbv bootstrap, werken beide nog niet. Begonnen met ScatterDiagram.
>
di 14 juni:
De knoppen een output waarde meegegeven. Deze wordt in javascript opgevraagd en zodoende kan ik deze gebruiken. De Piechart verkleind en mooi gemaakt. 
Tevens een functie gevonden die mijn data objecten sorteert van groot naar klein. Nu slechts de grootste 7 in mijn piechart visualiseren. Ingaande en uitgaande stromen visualiseerbaar met knop.
Donut oproepbaar maar steeds onder elkaar geplaatst, morgen anders.
>
woe 15 juni:
Donut verwijderbaar om daarna weer aan te maken.
De legenda is enorm lelijk geworden omdat deze heel groot wordt. Deze de hele dag geprobeerd selectief aan te kunnen zetten voor instroom, danwel uitstroom. 
Niet gelukt. Overige landen bij elkaar opgeteld voor donut, anders niet te zien welk aandeel de 7 grootste in geheel hadden. Begin gemaakt met scatterdiagram.
>
do 16 juni:
scatterdiagam werkt. Hele dag bezig geweest met trendlijn in de scatter. Pagina mooier gemaakt voor morgen.
>
vr 17 juni:
Flink CSS'en om de piechart en de datamaps een plek te geven. Titels ingevoegd en een plaatje. Daarnaast gelukt om de uitgaande stromen van toerisme te visaliseren mbv de button.
Gepresenteerd en een aantal goede tips om verder mee te werken. 
>
ma 20 juni:
> Kleuren van PieChart anders --> nu niet meer schijn'interactie'. Het markeren van de landen is niet mogelijk. Dan moeten 2 kaarten met opacity over elkaar heen gemaakt worden. Het wordt waarschijnlijk niet mooi. 
Zodoende besloten de landen met verschillende kleuren te omlijnen. Makkelijker gezegd dan gedaan. Veel op internet gekeken, niets... Na lang overleggen
heeft Daniel een goede tip. Een functie die bij elke landcode een bepaalde waarde returnt in geography.config is de oplossing. 
Legenda zelf gemaakt.
Donut ombeurt grootste, kleinste, 1 na grooste enz inplaatsbaar. Donut af.
>
di 21 juni:
Verder met de geography.config en de kleuren. CSS'en en het oplossen van het feit dat de buttons niet op dezelfde hoogte staan.
headers verwijderen en in plaats daarvan in <p> divjes plaatsen om zo bootstrap te omzeilen. 'BEL' blijkt niet te werken doordat functie is geschreven voor de 'language family knop'. Anders omlijning van borders niet mogelijk. Aan verslag.
2e knop werkt nu ook, 'Choose Cause'. Legenda zelf gemaakt. Proberen de fouten op te lossen. Scatter diagram biased door 0-waarden toerisme, deze verwijderd.
>
woe 22 juni:
Verslag. Legenda proberen te verbeteren, niet gelukt. CSS'en. 'Choose-Cause' kan alleen de borders tekenen in een nieuwe Datamap.
Dat is gelukt en deze ook verwijderbaar. Maar nu werkt updatCloropeth niet meer. In functie gezet. 'BEL' weer niet werkbaar en
combinatie 'Choose Cause' en 'In/out' niet werkbaar. Datamaps in functie omdat updateCloropeth niet werkt. Tekstjes ingevoegd.
>
do 23 juni:
Hele dag verslag en getracht de problemen in de visualisaties op te lossen met Sascha. 2 uur lang naar gekeken helaas niet gelukt
Opdracht ingeleverd.
