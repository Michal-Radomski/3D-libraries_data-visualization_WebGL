import * as THREE from "three";

import "./style.scss";
import { OrbitControls } from "three/examples/jsm/Addons.js";

//* Scene
const scene: THREE.Scene = new THREE.Scene();

//* Mesh
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(cube);

//* Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 640.0 / 480.0, 0.1, 1000);
camera.position.z = 5;

//* Renderer
const canvas = document.querySelector("canvas#glcanvas") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, precision: "highp", alpha: true });
renderer.setSize(640.0, 480.0);
renderer.render(scene, camera);

//* OrbitControls
const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0; //* Default: 2.0

//* Helpers
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//* Animate
(function animate(): void {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
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
