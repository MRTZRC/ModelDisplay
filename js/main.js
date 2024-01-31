
import * as THREE from  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Basic Threejs variables
var scene;
var camera;
var renderer;

//3D Cub
var cube;

function init()
{

  scene = new THREE.Scene();
  
  // ---------------- RENDERER ----------------
  
  renderer = new THREE.WebGLRenderer( { antialias : true } );
  renderer.setPixelRatio( window.devicePixelRatio  );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement ); // we add the HTML element to the HTML page
  
  // ---------------- CAMERA ----------------
  
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( -500, 400, -500 );
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add( camera );
  
  // ---------------- LIGHTS ----------------
  
  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
  scene.add( ambientLight );
  
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
  scene.add( directionalLight );
  
  // ---------------- 3D CUBE ----------------
  
  const geometry = new THREE.BoxGeometry( 150, 150, 150 );
  const material = new THREE.MeshPhongMaterial( {color: 0x00ffff} );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  // ---------------- My Model ----------------

  //Instantiate a loader for the .gltf file
  const loader = new GLTFLoader();

  //Load the file
  loader.load(
    `../public/models/realistic_human_eye.glb`,
    function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      scene.add(object);
    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );

  
  // ---------------- STARTING THE RENDER LOOP ----------------

  render();
  
}

function render()
{
  
  // rotating the cube each render tick
   cube.rotation.x += 0.005;
   cube.rotation.y += 0.01;

  renderer.render( scene, camera );   // We are rendering the 3D world
  requestAnimationFrame( render );  // we are calling render() again,  to loop
}

init();


