import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";

// Scene
const scene: THREE.Scene = new THREE.Scene();

//* V1
// Mesh
// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });
// const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );
// scene.add(mesh);

//* MeshTwo
// const geometryT = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
// const materialT = new THREE.MeshBasicMaterial({ color: "green" });
// const meshT = new THREE.Mesh(geometryT, materialT);
// meshT.position.y = 2;

// // Group
// const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();

// // Adding the two meshes inside the Group Class
// group.add(mesh, meshT);
// // group.position.x = 3;
// scene.add(group);

//* V2
// Mesh
const geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
const verticesArray: Float32Array<ArrayBuffer> = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute: THREE.BufferAttribute = new THREE.BufferAttribute(verticesArray, 3);
geometry.setAttribute("position", positionAttribute);
console.log("geometry:", geometry);

const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: "purple",
  wireframe: true,
});
const mesh: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.MeshBasicMaterial,
  THREE.Object3DEventMap
> = new THREE.Mesh(geometry, material);
scene.add(mesh);

// AxesHelper
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // near value is 1, and far value is 2000
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(aspect.width, aspect.height); //Renderer size
renderer.render(scene, camera); //display what the camera in the scene captured

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

//Clock Class
const clock = new THREE.Clock();

//* Animate
(function animate(): void {
  //GetElapsedTime
  const elapsedTime: number = clock.getElapsedTime();

  //Update Rotation On X Axis and Y axis
  mesh.rotation.x = elapsedTime;
  mesh.rotation.y = elapsedTime * Math.PI * 0.1; //will rotate the cube a turn per second

  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  //* Renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
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
