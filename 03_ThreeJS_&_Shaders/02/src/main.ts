import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as CANNON from "cannon-es";
// console.log("CANNON:", CANNON);

import "./style.scss";

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#FFFFFF", 0.2);
scene.add(ambientLight);
const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight("#FFFFFF", 0.5);
directionalLight.castShadow = true;
directionalLight.position.set(5, 5, 0);
scene.add(directionalLight);

// Meshes
// 1 -Sphere Mesh
const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.3, 32);
const sphereMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
const sphereMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  sphereGeometry,
  sphereMaterial
);
sphereMesh.position.y = 1;
sphereMesh.castShadow = true;
scene.add(sphereMesh);

// 2 - Plane Mesh
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(15, 15);
const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
const planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  planeGeometry,
  planeMaterial
);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

// 3 - Box Mesh
const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const boxMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
const boxMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  boxGeometry,
  boxMaterial
);
boxMesh.position.set(1, 2, 0);
boxMesh.castShadow = true;
scene.add(boxMesh);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 5;
camera.position.y = 2;
scene.add(camera);

//* Physics
const world: CANNON.World = new CANNON.World();
world.gravity.set(0, -9.81, 0);

//* Physics Materials
const concreteMaterial: CANNON.Material = new CANNON.Material("concrete");
const plasticMaterial: CANNON.Material = new CANNON.Material("plastic");

//* Sphere
const sphericalShape: CANNON.Sphere = new CANNON.Sphere(0.3);
const sphereBody: CANNON.Body = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0, 1, 0),
  shape: sphericalShape,
  material: plasticMaterial,
});
world.addBody(sphereBody);

setTimeout(() => {
  sphereBody.applyLocalForce(new CANNON.Vec3(0, 1000, 0), new CANNON.Vec3(-0.3, 0, 0));
}, 5000);

//* Plane
const planeShape: CANNON.Plane = new CANNON.Plane();
const planeBody: CANNON.Body = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 0, 0),
  shape: planeShape,
  material: concreteMaterial,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI * 0.5);
world.addBody(planeBody);

//* Box
const boxShape: CANNON.Box = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25));
const boxBody: CANNON.Body = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(1, 2, 0),
  shape: boxShape,
  material: plasticMaterial,
});
world.addBody(boxBody);

const plasticConcreteContactMaterial: CANNON.ContactMaterial = new CANNON.ContactMaterial(
  plasticMaterial,
  concreteMaterial,
  {
    friction: 0.3,
    restitution: 0.7,
  }
);
world.addContactMaterial(plasticConcreteContactMaterial);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(aspect.width, aspect.height);

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

const clock = new THREE.Clock();

let previousElapsedTime: number = 0;

//* Animate
(function animate(): void {
  const elapsedTime: number = clock.getElapsedTime();
  const deltaTime: number = elapsedTime - previousElapsedTime;
  previousElapsedTime = elapsedTime;

  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);

  // Update physics world
  world.step(Math.min(deltaTime, 0.1));
  // console.log("sphereBody.position:", sphereBody.position);

  // Update sphere position
  // sphereMesh.position.x = sphereBody.position.x;
  // sphereMesh.position.y = sphereBody.position.y;
  // sphereMesh.position.z = sphereBody.position.z;
  sphereMesh.position.copy(sphereBody.position);
  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);
  // console.log("boxBody.quaternion:", boxBody.quaternion);

  // Apply a force
  sphereBody.applyForce(new CANNON.Vec3(0.2, 0, 0));
})();

//* Resizing
window.addEventListener("resize", (): void => {
  // New size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // New AspectRatio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  // New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
