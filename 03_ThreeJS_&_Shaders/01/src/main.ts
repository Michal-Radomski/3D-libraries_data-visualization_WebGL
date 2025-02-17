import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log("THREE:", THREE);

import "./style.scss";

//* Scene Mesh Camera Renderer
//* 1. Scene
const scene: THREE.Scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcccccc, 1, 200);

//* 2. Mesh (Objects)
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2); //* Cube
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "#A020F0" });
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xa020f0, fog: true, wireframe: true });
const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
mesh.rotation.x = Math.PI * 0.25 * -1;
// mesh.scale.x = 1;
// mesh.scale.y = 1;
// mesh.scale.z = 2;
// mesh.scale.set(1, 1, 2);
scene.add(mesh);

//* 3. Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// https://en.wikipedia.org/wiki/Viewing_frustum
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // Near: 1, and Far: 2000
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
camera.zoom = 1;
scene.add(camera);

//* 4. Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement; // Select the canvas element
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, precision: "highp", alpha: false }); // Add the WebGLRenderer
renderer.setSize(aspect.width, aspect.height); // Renderer size
renderer.render(scene, camera); // Display what the camera in the scene captured

//* ---
//* MeshTwo
const geometryT = new THREE.BoxGeometry(1, 1, 1);
const materialT = new THREE.MeshBasicMaterial({ color: "green" });
const meshT = new THREE.Mesh(geometryT, materialT);
meshT.position.y = 2;

// Group
const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();

// Adding the two meshes inside the Group Class
group.add(mesh, meshT);
// group.position.x = 3;
scene.add(group);

// AxesHelper
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

//* ---
// Orbit Controls
const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);
// console.log("controls:", controls);

// Animation loop
(function animate(): void {
  requestAnimationFrame(animate);
  controls.update(); // IMPORTANT: Update the controls in the animation loop
  controls.autoRotate = true;
  controls.enablePan = true;
  renderer.render(scene, camera);
})();
