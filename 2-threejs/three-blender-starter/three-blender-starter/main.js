console.log('this file is loaded')

// import three library
import * as THREE from 'three';

// addons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//import dat.GUI
import datgui from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/+esm'

//import Stats.js
import statsJs from 'https://cdn.jsdelivr.net/npm/stats-js@1.0.1/+esm'

// declare the gui variable and give it the custom name 'Basic Project'
const gui = new datgui.GUI({name: 'Basic Project'});

// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

/*
  ===== GLOBAL VARIABLES
*/
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

/*
  ===== SCENE
*/
const scene = new THREE.Scene();
scene.background = new THREE.Color('#233143');

/*
  ===== CAMERA
*/
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

/*
  ===== GRID HELPER
*/
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

/*
  ===== RENDERER
*/
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

/*
  ===== LOAD GLTF FILES
*/

// Instantiate a loader
//where we load the avocado model
const loader = new GLTFLoader();

// Load a glTF resource
loader.load('./models/Avocado.gltf', function(gltf){
  scene.add( gltf.scene );
})

/*
  ===== LIGHTING
*/
const ambientLight = new THREE.AmbientLight("white", 0.6)
scene.add(ambientLight)

// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

/*
  ===== ANIMATION LOOP
*/
function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
     // update the stats object on render
    stats.update()
  }
  animate()

  //dat.GUI is good for finding a good camera position.
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 30)
cameraFolder.add(camera.position, 'x', 0, 30)
cameraFolder.add(camera.position, 'y', 0, 30)
cameraFolder.open()

// declare the stats variable
const stats = new statsJs
// 0: fps, 1: ms, 2: mb, 3+: custom
stats.showPanel(0)
document.body.appendChild( stats.dom );