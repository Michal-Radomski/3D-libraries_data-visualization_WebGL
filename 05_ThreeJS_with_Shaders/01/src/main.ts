import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";

//* Scene
const scene: THREE.Scene = new THREE.Scene();

//* AxesHelper
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 0.1, 1000); // near value is 1, and far value is 2000
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(aspect.width, aspect.height); //Renderer size
renderer.render(scene, camera); //display what the camera in the scene captured

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);

//* Animate
(function animate(): void {
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
