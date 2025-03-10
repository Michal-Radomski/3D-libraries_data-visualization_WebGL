import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

//* Scene
const scene: THREE.Scene = new THREE.Scene();

//* AxesHelper
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 0.1, 1000);
camera.position.z = 15;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(aspect.width, aspect.height);
renderer.setPixelRatio(window.devicePixelRatio);
// console.log("window.devicePixelRatio:", window.devicePixelRatio);
renderer.render(scene, camera);

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
//-----------

//* Create a sphere
const sphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  // new THREE.MeshBasicMaterial({ color: undefined, map: new THREE.TextureLoader().load("./img/globe.jpeg") })

  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("./img/globe.jpeg"),
      },
    },
  })
);
// console.log("sphere:", sphere);
scene.add(sphere);

//----------
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
