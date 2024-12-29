/*eslint-disable*/
const locations =JSON.parse(document.getElementById('map').dataset.locations) ;
console.log(locations);

console.log('Initializing map...');


mapboxgl.accessToken = 'pk.eyJ1IjoiZHVhbmVvMjAxMSIsImEiOiJjbTU5aDh2enkwMTJiMmlzNjN5bXlzMHNjIn0.py6_RB2ooTRmXUdNo062LQ';

// const map = new mapboxgl.Map({
//   container: 'map', // container ID
//    style: 'mapbox://styles/mapbox/streets-v11',
//   center: [-74.5, 40], // starting position [lng, lat]
//   zoom: 9 // starting zoom
// });

var map = new mapboxgl.map({
   container:'map',
   style:'mapbox://styles/mapbox/streets-v11'
})