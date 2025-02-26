import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";
// import { fragmentShaderSource, vertexShaderSource } from "./shaders";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";
// console.log("vShader, fShader:", vShader, fShader);

//* Scene
const scene: THREE.Scene = new THREE.Scene();

//* Mesh
const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1);
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
// const mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );

const material: THREE.RawShaderMaterial = new THREE.RawShaderMaterial({
  // vertexShader: vertexShaderSource as string,
  // fragmentShader: fragmentShaderSource as string,
  vertexShader: vShader as string,
  fragmentShader: fShader as string,
  glslVersion: undefined,
  side: THREE.DoubleSide,
});
// console.log("material?.defaultAttributeValues:", material?.defaultAttributeValues);
const mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(mesh);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(aspect.width, aspect.height);

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

// const clock = new THREE.Clock();

//* Animate
(function animate(): void {
  // const elapsedTime: number = clock.getElapsedTime();

  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

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
