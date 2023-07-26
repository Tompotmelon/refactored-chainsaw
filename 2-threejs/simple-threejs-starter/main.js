//I am port 3030 for this server
console.log('this works')
// import the THREE library
import * as THREE from 'three';
//import OrbitControls library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// get a reference to the scene-container element that will eventually hold the scene
const container = document.querySelector('#scene-container');

// create a scene
const scene = new THREE.Scene();
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight
//set scene's bakcground color to the same color as the scene's container. Default color is black. This is to avoid flashing when it loads.
scene.background = new THREE.Color("#233143")

// create a camera
//here are the four parameters for the perspective camera to define the frustum
const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100
//the camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(4, 0, 15)//closer to us than (0,0,0)

// create the renderer
const renderer = new THREE.WebGLRenderer();
// set the size of your renderer
renderer.setSize( WIDTH, HEIGHT );
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

//CREATE OBJECT
//create geometry
const geometry = new THREE.BoxGeometry( 4, 4, 4 ); 
//create the material
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); 
//create the mesh by putting the geometry and material in together
const cube = new THREE.Mesh( geometry, material );
//set geometry's position in the scene 
cube.position.set(0, 0, 4)
// pass mesh to the scene
scene.add(cube)

//render
//renderer.render(scene, camera);

//CHALLENGE
const sphericalGeo = new THREE.SphereGeometry( 1.5, 32, 32 );
  // create a material
const sphericalmaterial = new THREE.MeshBasicMaterial( { color: "blue" } );
  // create mesh with geometry and material
const ball = new THREE.Mesh( sphericalGeo, sphericalmaterial );
  // set position
ball.position.set(5, 0, 8);
  // pass ball mesh to the scene
scene.add(ball)

//personal exploration
const coneGeo = new THREE.ConeGeometry(2, 2, 4)
const conematrl = new THREE.MeshBasicMaterial( { color: "red"} )
const pyramid = new THREE.Mesh( coneGeo, conematrl)
pyramid.position.set(9, 0, 8)
scene.add(pyramid)

//gridhelper
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

//render
//renderer.render(scene, camera);

// orbit controls allow us to pan with the mouse
const controls = new OrbitControls( camera, renderer.domElement );
//call animate function
const animate = () => {
    // call the animate() function every frame - creates a loop
    requestAnimationFrame(animate)
      // increase the cube's rotation each frame
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01
      //increase pyramid's rotation each frame
    pyramid.rotation.x += 0.01
    pyramid.rotation.y += 0.02
    pyramid.rotation.z += 0.01
    // render the updated scene and camera
    renderer.render(scene, camera);

//CHALLENGE
    cube.position.x += 
    cube.position.y += 0.01
    }
  // don't forget to call the function
animate()