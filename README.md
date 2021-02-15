# Footprint
<code><img height="200" alt="Footprint Logo" src="https://github.com/mwi079/footprint/blob/main/client/assets/footprint.PNG"></code> 


## Puting everything I've learned so far on my coding journey together into something I'm passionate about.

In this application you input the details of a car journey and of your domestic electricity use and you'll be given your carbon footprint, as well as other useful information, for both. All unit conversions self coded to scratch my itch for problem solving.

## User instructions

A demo of this site can be seen at https://priceless-meitner-cc344e.netlify.app/
Alternatively, if you prefer to run locally, after download run "npm i" in the root and then again in the client folder. Then run "npm start" in the client folder. 

## User experience

The user is first greated by the main menu with responsive a descriptive buttons. 
<code><img height="400" alt="Footprint Homepage" src="https://github.com/mwi079/footprint/blob/main/client/assets/homepage.PNG"></code> 

The user first enter the information of the car they drive and a typical journay they take.
<code><img height="400" alt="Car Menu" src="https://github.com/mwi079/footprint/blob/main/client/assets/carMenu.PNG"></code> 

And now they input the typical domestic electricity use over a chosen period and at a chosen postcode (carbon production per kW of energy is region specific in the UK)
<code><img height="400" alt="Home Menu" src="https://github.com/mwi079/footprint/blob/main/client/assets/homeMenu.PNG"></code> 

The app now calculates the results and displayes them in the form of beautiful and responsive graphs
<code><img height="400" alt="Results 1" src="https://github.com/mwi079/footprint/blob/main/client/assets/results1.PNG"></code> 
<code><img height="400" alt="Results 2" src="https://github.com/mwi079/footprint/blob/main/client/assets/results2.PNG"></code>

Finally the user can see a graph explaining why this is all so important...
<code><img height="400" alt="Temperatur vs atm CO2 trend" src="https://github.com/mwi079/footprint/blob/main/client/assets/graph.PNG"></code>


## Tech Stack

- JavaScript
- React
- Material-UI
- Chart.JS

## APIs

- Vehicle data from https://www.fueleconomy.gov/feg/ws/
- UK Electricity Generation data from https://api.carbonintensity.org.uk/
- Global temperature and atmospheric CO2 concentration from https://global-warming.org/

**Further work**

- Find and use a more global API for domestic electricity carbon footprint (currently limited to UK post codes)
- Add a backend and authentication to track their footprint over time




