import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// import * as dat from "dat.gui";

import "./style.scss";

const scene: THREE.Scene = new THREE.Scene();

//* textureLoader
const textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
const particleTexture: THREE.Texture = textureLoader.load("./src/texture/alphaSnow.jpg");

//* Particles
const geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
const verticesAmount: number = 10000;
const positionArray: Float32Array<ArrayBuffer> = new Float32Array(verticesAmount * 3); // We need 3000 slots

for (let i = 0; i < verticesAmount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 4;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
const material: THREE.PointsMaterial = new THREE.PointsMaterial();
material.size = 0.02;
material.transparent = true;
material.alphaMap = particleTexture;
material.depthTest = false;
const points: THREE.Points<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.PointsMaterial,
  THREE.Object3DEventMap
> = new THREE.Points(geometry, material);
scene.add(points);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 0.01, 100);
camera.position.z = 2;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(aspect.width, aspect.height);

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

const clock: THREE.Clock = new THREE.Clock();

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  points.rotation.y = elapsedTime * 0.05;
  points.rotation.x = elapsedTime * 0.05;
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
