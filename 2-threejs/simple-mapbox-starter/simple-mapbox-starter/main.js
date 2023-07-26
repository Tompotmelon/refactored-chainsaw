console.log('this works')
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

//Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-73.9651476, 40.8075355], // starting position [lng, lat] Columbia University
    zoom: 11, // starting zoom
});