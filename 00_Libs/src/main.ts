import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";

// Set up the Three.js scene
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.x = 10;

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a ground plane
const groundGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const groundMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  groundGeometry,
  groundMaterial
);
groundMesh.rotation.x = -Math.PI / 2.1;
scene.add(groundMesh);

// Set up the Cannon.js physics world
const world: CANNON.World = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Set gravity
// console.log("world:", world);

// Create a ground body in Cannon.js
const groundBody: CANNON.Body = new CANNON.Body({
  mass: 0, // Mass of 0 makes it static
});
const groundShape: CANNON.Plane = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

// Create a falling box
const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const boxMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  boxGeometry,
  boxMaterial
);
scene.add(boxMesh);

// Create a box body in Cannon.js
const boxBody: CANNON.Body = new CANNON.Body({
  mass: 1, // Mass of the box
});
boxBody.position.set(0, 5, 0); // Start above the ground
boxBody.addShape(new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))); // Half dimensions for shape
world.addBody(boxBody);

const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 1.0; //* Default: 2.0
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.enablePan = true;
orbitControls.enableZoom = true;

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  requestAnimationFrame(animate);

  // Step the physics world
  world.step(1 / 60); // Step the physics simulation

  // Update Three.js mesh positions based on Cannon.js bodies
  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);

  // Render the scene
  renderer.render(scene, camera);
})();
