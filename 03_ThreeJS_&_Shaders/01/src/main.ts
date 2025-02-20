import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log("THREE:", THREE);
// import gsap from "gsap";

import "./style.scss";

//^ V1
// //* Scene Mesh Camera Renderer
// //* 1. Scene
// const scene: THREE.Scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0xcccccc, 1, 200);

// //* 2. Mesh (Objects)
// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2); //* Cube
// // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "#A020F0" });
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xa020f0, fog: true, wireframe: true });
// const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );
// mesh.rotation.x = Math.PI * 0.25 * -1;
// // mesh.scale.x = 1;
// // mesh.scale.y = 1;
// // mesh.scale.z = 2;
// // mesh.scale.set(1, 1, 2);
// scene.add(mesh);

// //* 3. Camera
// const aspect = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // https://en.wikipedia.org/wiki/Viewing_frustum
// const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // Near: 1, and Far: 2000
// camera.position.z = 3;
// camera.position.x = 1;
// camera.position.y = 1;
// camera.zoom = 1;
// scene.add(camera);

// //* 4. Renderer
// const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement; // Select the canvas element
// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, precision: "highp", alpha: false }); // Add the WebGLRenderer
// renderer.setSize(aspect.width, aspect.height); // Renderer size
// renderer.render(scene, camera); // Display what the camera in the scene captured

// //* ---
// //* MeshTwo
// // const geometryT = new THREE.BoxGeometry(1, 1, 1);
// // const materialT = new THREE.MeshBasicMaterial({ color: "green" });
// // const meshT = new THREE.Mesh(geometryT, materialT);
// // meshT.position.y = 2;

// // // Group
// // const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();

// // // Adding the two meshes inside the Group Class
// // group.add(mesh, meshT);
// // // group.position.x = 3;
// // scene.add(group);

// // AxesHelper
// const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

// //* ---
// // Orbit Controls
// const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);
// // console.log("controls:", controls);

// //* Clock Class -> fps stands for frame per second
// const clock = new THREE.Clock();
// // console.log("clock:", clock);

// //* GSAP
// // gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 }); //* x -> red axe, y -> green axe and z -> blue axe
// // gsap.to(mesh.position, { duration: 2, delay: 2, x: -1 }); //* x -> red axe, y -> green axe and z -> blue axe

// // Animation loop
// (function animate(): void {
//   //* RequestAnimationFrame
//   window.requestAnimationFrame(animate);
//   // requestAnimationFrame(animate);

//   controls.update(); // IMPORTANT: Update the controls in the animation loop
//   controls.autoRotate = false;
//   controls.enablePan = true;
//   renderer.render(scene, camera);

//   const elapsedTime: number = clock.getElapsedTime();
//   // console.log("elapsedTime:", elapsedTime);

//   //* Update Rotation On X Axis and Y axis
//   mesh.rotation.x = elapsedTime;
//   mesh.rotation.y = elapsedTime * Math.PI * 0.1; // Will rotate the cube a turn per second

//   //* Linear Function
//   // mesh.position.x = elapsedTime * 0.25;
//   // mesh.position.y = elapsedTime * 0.25;

//   // mesh.position.x = -elapsedTime * 0.25
//   // mesh.position.y = elapsedTime * 0.25;

//   // mesh.position.x = 1+elapsedTime * 0.25
//   // mesh.position.y = elapsedTime * 0.25;

//   // mesh.position.x = 1 - elapsedTime * 0.25;
//   // mesh.position.y = elapsedTime * 0.25;

//   //* Sin Function
//   // mesh.position.x = Math.sin(elapsedTime);

//   //* Cos Function
//   // mesh.position.x = Math.cos(elapsedTime);

//   //* Circular Move
//   // mesh.position.x = Math.sin(elapsedTime);
//   // mesh.position.y = Math.cos(elapsedTime);

//   //* Tan Function
//   // mesh.position.x = Math.tan(elapsedTime);
//   // mesh.position.y = Math.tan(elapsedTime);
// })();

//^ V2
// console.log("window.devicePixelRatio:", window.devicePixelRatio);
const scene: THREE.Scene = new THREE.Scene();

// Mesh One
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
const purpleMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
purpleMesh.position.x = 1;

// Mesh Two
const geometry2: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const yellowMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry2,
  material2
);
yellowMesh.position.x = -1;

// Mesh Three
const geometry3: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material3: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const greenMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry3,
  material3
);

// Mesh Four
const geometry4: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material4: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "white" });
const whiteMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry4,
  material4
);
whiteMesh.position.set(1, 1, 0);
// whiteMesh.position.x=1;
// whiteMesh.position.y=1;
// whiteMesh.position.z=0;

// Mesh Five
const geometry5: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material5: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "pink" });
const pinkMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry5,
  material5
);
pinkMesh.position.set(-1, 1, 0);

// Mesh Six
const geometry6: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material6: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const blueMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry6,
  material6
);
blueMesh.position.y = 1;

scene.add(purpleMesh, yellowMesh, greenMesh, whiteMesh, pinkMesh, blueMesh);

//* LookAt
yellowMesh.lookAt(whiteMesh.position);
purpleMesh.lookAt(pinkMesh.position);
pinkMesh.lookAt(greenMesh.position);

//* Mouse Listener
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event: MouseEvent): void => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
  // console.log("cursor.x, cursor.y:", cursor.x, cursor.y);
  // console.log("event?.layerX, event?.layerY:", event?.layerX, event?.layerY);
  // console.log("event.clientX, event.clientY:", event.clientX, event.clientY);
});

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// const camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000); //* OrthographicCamera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); //* PerspectiveCamera
camera.position.z = 2.5;
camera.position.x = 2;
camera.position.y = 2;

scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//* Clock Class
// const clock: THREE.Clock = new THREE.Clock();

//* OrbitControls
const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0; //* Default: 2.0
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

const animate = (): void => {
  controls.update(); // IMPORTANT: Update the controls in the animation loop

  // const elapsedTime: number = clock.getElapsedTime();
  // console.log("elapsedTime:", elapsedTime);

  greenMesh.lookAt(new THREE.Vector3(cursor.x, -cursor.y, 1));
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();

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

const axesHelper: THREE.AxesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// * ---
const geometry8: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
const verticesArray: Float32Array<ArrayBuffer> = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute: THREE.BufferAttribute = new THREE.BufferAttribute(verticesArray, 3);
geometry8.setAttribute("position", positionAttribute);
// console.log("geometry8:", geometry8);

const material8: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const mesh8: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.MeshBasicMaterial,
  THREE.Object3DEventMap
> = new THREE.Mesh(geometry8, material8);
scene.add(mesh8);
