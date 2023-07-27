console.log('this works')
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

//Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-73.9651476, 40.8075355], // starting position [lng, lat] Columbia University
    zoom: 11, // starting zoom
});

//First step in loading API
const post_office = 'https://data.cityofnewyork.us/resource/bdha-6eqy.json'
//load in geoJSON from Luc Wilson
const daylighting_geojson = "./data/Columbia__Daylight_analysis.geojson"
const streets_geojson = "./data/Columbia_daylight_streets.geojson"


//fetch the data and render it to the map
//async () => is asking the function to wait
const fetchPostOfficeLocations = async () => {
    const response = await fetch(post_office);
    const data = await response.json();
    // console.log(data);
    for(let i in data){
        console.log(data[i].streetname)

        let latitude = data[i].the_geom.coordinates[1]
        let longitude = data[i].the_geom.coordinates[0]

    }
    //Create the markers and pop-ups
    for(let i in data){
        console.log(data[i].streetname)

        let latitude = data[i].the_geom.coordinates[1]
        let longitude = data[i].the_geom.coordinates[0]

    // create the marker
    new mapboxgl.Marker({ color: 'black' })
        .setLngLat([longitude, latitude])
        .addTo(map);
  // create the content
    let content = `${data[i].streetname} ${data[i].city}`
  // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(content)
  // attach the popup to the marker
    new mapboxgl.Marker({ color: 'black' })
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map);
    }
}
fetchPostOfficeLocations()


//iterate over the geojson data to see what our data set looks like
fetch(daylighting_geojson)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // iterate over each data object
        data.features.forEach(element => {
          // log the data to the browser
            console.log(element)
            
            const feb_percent_threshold = element.properties["Percent_Threshold_Daylight_Feb"]

        })
    })

    //load geojson to map
    map.on('load', () => {

        map.addSource('parks', {
            type: 'geojson',
            data: daylighting_geojson
        });
    
        map.addSource('streets', {
            type: 'geojson',
            data: streets_geojson
        });
        // Add a layer showing the daylighting layer
        map.addLayer({
            'id': 'parks-layer',
            'type': 'fill',
            'source': 'parks',
            'paint': {
                'fill-outline-color': 'rgba(0,0,0,0.5)',
                'fill-color': 'rgba(0,0,0,0.8)'
            }
        })
    
        map.addLayer({
            'id': 'streets-layer',
            'type': 'line',
            'source': 'streets',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 4
            }
        })
    })