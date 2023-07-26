console.log('Hello Three.js')

// import the THREE library
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// import the D3 library
//==== libraries and addons
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//import SVGLoader
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// get a reference to the scene-container element that will eventually hold the scene
const container = document.querySelector('#scene-container')

// set the width and height of the container to a global variable
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

// create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#233143');

// create variables for camera parameters
const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100
// create a camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
// position the camera away from the origin
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

// add grid helper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// create the renderer
const renderer = new THREE.WebGLRenderer();
// set the size of the renderer
renderer.setSize(WIDTH, HEIGHT)
// add automatically created canvas element to the webpage
container.appendChild(renderer.domElement);

// load external data here <-- D3 data binding
// set the chart margins, padding and dimensions for future use
const chart_width = window.innerWidth;
const chart_height = window.innerHeight - 60;
const padding = 10;
const margin = { top: 30, right: 0, bottom: 60, left: 30 };

// append the svg to the threejs canvas
let svg = d3
  // a <canvas> element was automatically created and appended to the webpage, so we can select it
    .select("canvas")
  // append the svg element to the canvas
    .append("svg")
    // set the width and height attributes to the svg element
    .attr("width", chart_width + margin.left + margin.right)
    .attr("height", chart_height + margin.top * margin.bottom)
    // limit the height of the bars to the height of the chart
    .range([chart_height, 0]) // this is flipped
    // you can giv the svg element its own class name
    .attr("class", "bar-chart");
console.log(svg)

    d3.csv("assets/fifa_world_cup_attendance/FIFA-World-Cup-Attendance.csv", d3.autoType)
    .then(data => {
// Declare the y (vertical position) scale, Total_Attendance
const y_scale = d3.scaleLinear()
  .range([chart_height, 0])
  .domain([0, d3.max(data, d => d["Total_Attendance"])])

  // Declare the x (horizontal position) scale, Year
const x_scale = d3.scaleTime()
    .domain([new Date(xMin), new Date(xMax)]) 
    .range([0, chart_width]);

 // Declare the z (horizontal position) scale, Hosts
const zScale = d3.scaleBand()
  .domain(data.map(d => d["Hosts"])) // array of host country names
  .range([0, data.length]);

    // min and max variables
    let xMin = d3.min(data, (d) => d['Year'])
    let xMax = d3.max(data, (d) => d['Year'])

      console.log(data)

         //Build the Bars
    const barWidth = Math.round(chart_width / data.length)

    svg.selectAll('rect')
    .data(data)
    .enter() // take data items one by one and perform further operations on each element

    svg.selectAll('rect')
  .data(data)
  .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", d => height - y_scale(d["Total_Attendance"]))
    .attr("width", barWidth - padding)
    .attr("transform", ((d, i) => {
      let translate = barWidth * i
      console.log(translate)
      return `translate(${translate}, 0)`
  }))

 // make a reference to all the svgs
const svgList = document.querySelectorAll("rect");
  
 // instantiate a loader
const loader = new SVGLoader();
for (let i = 0; i < svgList.length; i++) {
  const svgMarkup = svgList[i].outerHTML
}
// load a SVG resource
const svgData = loader.parse(svgMarkup);

const shape = svgData.paths[0].toShapes(true)[0];

const extrudeOptions = {
  steps: 2,
  depth: barWidth, // set depth to bar width
}
const geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

const material = new THREE.MeshNormalMaterial({ 
  color: 'green'
});

const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );

mesh.position.set(0, 0 , 0);
    })



// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );


function animate() {
    requestAnimationFrame( animate );

    renderer.render(scene, camera);
}
animate()
