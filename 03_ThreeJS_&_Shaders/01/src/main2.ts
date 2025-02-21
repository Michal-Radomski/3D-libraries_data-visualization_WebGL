import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";

import "./style.scss";

const scene: THREE.Scene = new THREE.Scene();

const gui: dat.GUI = new dat.GUI();

//^ Lights
//* AmbientLight
// const ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#ffffff", 0.5);
// scene.add(ambientLight);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("Intensity One");

//* DirectionalLight
// const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
// directionalLight.position.set(0, 2, 0);
// scene.add(directionalLight);
// gui.add(directionalLight, "intensity").min(0).max(1).step(0.01).name("Intensity Two");
// gui.add(directionalLight.position, "x").min(-3).max(3).step(0.01).name("X Dir");
// gui.add(directionalLight.position, "y").min(-3).max(3).step(0.01).name("Y Dir");
// //* DirectionalLightHelper
// const directionalLightHelper: THREE.DirectionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

//* HemisphereLight
// const hemisphereLight: THREE.HemisphereLight = new THREE.HemisphereLight("blue", "yellow", 1);
// scene.add(hemisphereLight);
// //* HemisphereLightHelper
// const hemisphereLightHelper: THREE.HemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5);
// scene.add(hemisphereLightHelper);

//* PointLight
// const pointLight: THREE.PointLight = new THREE.PointLight("red", 0.8, 3);
// gui.add(pointLight.position, "x").min(-3).max(3).step(0.01).name("X Point");
// gui.add(pointLight.position, "y").min(-3).max(3).step(0.01).name("Y Point");
// gui.add(pointLight.position, "z").min(-3).max(3).step(0.01).name("Z Point");
// scene.add(pointLight);
// //* PointLightHelper
// const pointLightHelper: THREE.PointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

//* RectAreaLight
// const rectAreaLight: THREE.RectAreaLight = new THREE.RectAreaLight("#5D3FD3", 3, 2, 2);
// rectAreaLight.position.z = 0.5;
// scene.add(rectAreaLight);
// gui.add(rectAreaLight, "width").min(0).max(7).step(0.01).name("width");
// gui.add(rectAreaLight, "height").min(0).max(7).step(0.01).name("height");

//* SpotLight
const spotLight: THREE.SpotLight = new THREE.SpotLight(0xffffff, 1, 8, Math.PI * 0.25, 0.1, 1);
gui.add(spotLight.position, "z").min(-3).max(3).step(0.01).name("Z Spot");
gui.add(spotLight, "angle").min(0).max(3).step(0.01).name("Spot Angle");
gui.add(spotLight, "penumbra").min(0).max(1).step(0.01).name("Spot Penumbra");
spotLight.position.z = 2;
scene.add(spotLight);
//* SpotLightHelper
const spotLightHelper: THREE.SpotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

//* Mesh
const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 64, 64);
const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
const mesh: THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(mesh);

//* Mesh2: RectAreaLight and SpotLight
const geometry2 = new THREE.PlaneGeometry(10, 10, 64, 64);
const material2 = new THREE.MeshStandardMaterial();
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
camera.position.z = 9; // Camera position when we used RectAreaLight and SpotLight Mesh
scene.add(camera);

const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//* Animate
(function animate(): void {
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
