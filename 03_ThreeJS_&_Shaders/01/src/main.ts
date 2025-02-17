import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log("THREE:", THREE);

import "./style.scss";

//* Scene Mesh Camera Renderer
//* 1. Scene
const scene: THREE.Scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcccccc, 10, 15);

//* 2. Mesh (Objects)
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2); //* Cube
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "#A020F0" });
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xa020f0, fog: true, wireframe: false });
const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(mesh);

//* 3. Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // near value is 1, and far value is 2000
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
camera.zoom = 1;
scene.add(camera);

//* 4. Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement; //select the canvas element
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas }); //add the WebGLRenderer
renderer.setSize(aspect.width, aspect.height); //Renderer size
renderer.render(scene, camera); //display what the camera in the scene captured

// Orbit Controls
const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);

// Animation loop
function animate(): void {
  requestAnimationFrame(animate);
  controls.update(); // IMPORTANT: Update the controls in the animation loop
  renderer.render(scene, camera);
}

animate();
