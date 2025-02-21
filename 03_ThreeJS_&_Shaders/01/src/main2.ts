import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// import * as dat from "dat.gui";

import "./style.scss";

const scene: THREE.Scene = new THREE.Scene();

// const gui: dat.GUI = new dat.GUI();

//^ Lights
//* AmbientLight - This light globally illuminates all objects in the scene equally - no helper, no shadow
// const ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#ffffff", 0.5);
// scene.add(ambientLight);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("Intensity One");

//* DirectionalLight - A light that gets emitted in a specific direction
// const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
// directionalLight.position.set(0, 2, 0);
// scene.add(directionalLight);
// gui.add(directionalLight, "intensity").min(0).max(1).step(0.01).name("Intensity Two");
// gui.add(directionalLight.position, "x").min(-3).max(3).step(0.01).name("X Dir");
// gui.add(directionalLight.position, "y").min(-3).max(3).step(0.01).name("Y Dir");
// //* DirectionalLightHelper
// const directionalLightHelper: THREE.DirectionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

//* HemisphereLight -> A light source positioned directly above the scene, with color fading from the sky color to the ground color.
//* This light cannot be used to cast shadows (2 lights).
// const hemisphereLight: THREE.HemisphereLight = new THREE.HemisphereLight("blue", "yellow", 1);
// scene.add(hemisphereLight);
// //* HemisphereLightHelper
// const hemisphereLightHelper: THREE.HemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5);
// scene.add(hemisphereLightHelper);

//* PointLight ->  A light that gets emitted from a single point in all directions
// const pointLight: THREE.PointLight = new THREE.PointLight("red", 0.8, 3);
// gui.add(pointLight.position, "x").min(-3).max(3).step(0.01).name("X Point");
// gui.add(pointLight.position, "y").min(-3).max(3).step(0.01).name("Y Point");
// gui.add(pointLight.position, "z").min(-3).max(3).step(0.01).name("Z Point");
// scene.add(pointLight);
// //* PointLightHelper
// const pointLightHelper: THREE.PointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

//* RectAreaLight -> RectAreaLight emits light uniformly across the face a rectangular plane
// const rectAreaLight: THREE.RectAreaLight = new THREE.RectAreaLight("#5D3FD3", 3, 2, 2);
// rectAreaLight.position.z = 0.5;
// scene.add(rectAreaLight);
// gui.add(rectAreaLight, "width").min(0).max(7).step(0.01).name("width");
// gui.add(rectAreaLight, "height").min(0).max(7).step(0.01).name("height");

// //* SpotLight ->  This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets
// const spotLight: THREE.SpotLight = new THREE.SpotLight(0xffffff, 1, 8, Math.PI * 0.25, 0.1, 1);
// gui.add(spotLight.position, "z").min(-3).max(3).step(0.01).name("Z Spot");
// gui.add(spotLight, "angle").min(0).max(3).step(0.01).name("Spot Angle");
// gui.add(spotLight, "penumbra").min(0).max(1).step(0.01).name("Spot Penumbra");
// spotLight.position.z = 2;
// scene.add(spotLight);
// //* SpotLightHelper
// const spotLightHelper: THREE.SpotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// //* Mesh
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 64, 64);
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
// const mesh: THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );
// scene.add(mesh);

// //* Mesh2: RectAreaLight and SpotLight
// const geometry2 = new THREE.PlaneGeometry(10, 10, 64, 64);
// const material2 = new THREE.MeshStandardMaterial();
// const mesh2 = new THREE.Mesh(geometry2, material2);
// scene.add(mesh2);

//^ Shadows
//* Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#ffffff", 0.35);
const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight("#ffffff", 0.7);
directionalLight.castShadow = true;
directionalLight.position.set(0, 2, 0);
scene.add(ambientLight, directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Optimize ShadowMap Size
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

//* boxMesh
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const boxMaterial = new THREE.MeshStandardMaterial({ wireframe: true });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.position.y = 0.7;
scene.add(boxMesh);

//* TorusKnot Mesh for testing shadow map types
const torusKnotGeometry: THREE.TorusKnotGeometry = new THREE.TorusKnotGeometry(0.2, 0.05);
const torusKnotMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
const torusKnotMesh: THREE.Mesh<THREE.TorusKnotGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> =
  new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.castShadow = true;
torusKnotMesh.position.y = 0.7;
scene.add(torusKnotMesh);

//* planeMesh
const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(2.75, 2.75);
const planeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
const planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  planeGeometry,
  planeMaterial
);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

//^ Rest
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
// camera.position.z = 2;
// camera.position.z = 9; // Camera position when we used RectAreaLight and SpotLight Mesh
camera.position.z = 3;
// camera.position.z = 0; // camera position when we want to optimize the shadow map
// camera.position.z = 2; // camera position when we used TorusKnotGeometry
camera.position.y = 1;

scene.add(camera);

const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.shadowMap.enabled = true;

const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

const clock: THREE.Clock = new THREE.Clock();

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);

  const elapsedTime: number = clock.getElapsedTime();
  boxMesh.position.x = Math.sin(elapsedTime);
  torusKnotMesh.rotation.x = Math.sin(elapsedTime);
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

//^ ShadowMap Types
// renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.type = THREE.PCFShadowMap; //* Percentage-Closer Filtering (PCF) algorithm (default)
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap; //* Variance Shadow Map (VSM) algorithm
