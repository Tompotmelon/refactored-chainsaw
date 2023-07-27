console.log('this works')
mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

//initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-73.9651476, 40.8075355], // starting position [lng, lat] Columbia University
    zoom: 11, // starting zoom
});

//build a custom layer for 3d layering. These are mapbox functions and methods.
map.on('style.load', function() {
    map.addLayer({
        id: 'custom_layer',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function(map, mbxContext){
            tb = new Threebox(
            map, 
            mbxContext,
            { defaultLights: true }
            );
            //put options
            const scale = 3.2;
            const options = {
                obj: './models/scene.gltf',
                type: 'gltf',
                scale: { x: scale, y: scale, z: 2.7 },
                rotation: { x: 90, y: -90, z: 0 },
                units: 'meters',
            }
        }
    });

        
        

        // load the model
        tb.loadObj(options, (building) => {

            building.setCoords([-73.976799, 40.754145]);
            building.setRotation({ x: 0, y: 0, z: 241 });
            tb.add(building);                        
        })

        

        render: function () {
        tb.update();
        }
    })