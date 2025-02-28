import * as THREE from "three";
import {
  // AfterimagePass,
  // DotScreenPass,
  EffectComposer,
  // FilmPass,
  // GlitchPass,
  // LuminosityShader,
  OrbitControls,
  RenderPass,
  // RGBShiftShader,
  ShaderPass,
  // UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
// import * as dat from "dat.gui";

import "./style.scss";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";

// Scene
const scene: THREE.Scene = new THREE.Scene();

// GUI
// const gui: dat.GUI = new dat.GUI();

// Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#FFFFFF", 0.2);
const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight("#FFFFFF", 0.5);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

// Environment Map
const cubeTextureLoader: THREE.CubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture: THREE.CubeTexture = cubeTextureLoader.load([
  "./src/cubeImages/px.png",
  "./src/cubeImages/nx.png",
  "./src/cubeImages/py.png",
  "./src/cubeImages/ny.png",
  "./src/cubeImages/pz.png",
  "./src/cubeImages/nz.png",
]);
scene.background = envTexture;

// Mesh
const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.1;
material.envMap = envTexture;

const mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
mesh.position.z = -1.7;
scene.add(mesh);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2.5;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(aspect.width, aspect.height);

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

// EffectComposer
const effectComposer: EffectComposer = new EffectComposer(renderer);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(aspect.width, aspect.height);

// RenderPass
const renderPass: RenderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

//^ Passes
//* UnrealBloomPass
// const unrealBloomPass: UnrealBloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   1,
//   0,
//   0.45
// );
// unrealBloomPass.strength = 0.35; // default value = 1.0
// unrealBloomPass.radius = 0.0;
// unrealBloomPass.threshold = 0.45;
// unrealBloomPass.enabled = false;
// effectComposer.addPass(unrealBloomPass);
// gui.add(unrealBloomPass, "strength").min(0.0).max(1.0).step(0.001);
// gui.add(unrealBloomPass, "threshold").min(0.0).max(1.0).step(0.001);
// gui.add(unrealBloomPass, "enabled");

//* GlitchPass
// const glitchPass: GlitchPass = new GlitchPass();
// effectComposer.addPass(glitchPass);

//* DotScreenPass
// const dotScreenPass: DotScreenPass = new DotScreenPass();
// effectComposer.addPass(dotScreenPass);

//* FilmPass
// const filmPass: FilmPass = new FilmPass();
// effectComposer.addPass(filmPass);

//* AfterimagePass
// const afterimagePass: AfterimagePass = new AfterimagePass();
// effectComposer.addPass(afterimagePass);

//* LuminosityShader
// const luminosityShader: ShaderPass = new ShaderPass(LuminosityShader);
// effectComposer.addPass(luminosityShader);

//* RGBShiftShader
// const rgbShiftShader: ShaderPass = new ShaderPass(RGBShiftShader);
// effectComposer.addPass(rgbShiftShader);

//* Our Own Pass
const ourShader = {
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: vShader,
  fragmentShader: fShader,
};
const ourPass: ShaderPass = new ShaderPass(ourShader);
effectComposer.addPass(ourPass);

//* Clock
// const clock = new THREE.Clock();

//* Animate
(function animate(): void {
  // const elapsedTime: number = clock.getElapsedTime();

  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  //* Renderer
  // renderer.render(scene, camera);
  effectComposer.render();
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
