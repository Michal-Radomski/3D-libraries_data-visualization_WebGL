import * as THREE from "three";
import { FBXLoader, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";

const scene: THREE.Scene = new THREE.Scene();

//* Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

//* Loaders
const fbxloader: FBXLoader = new FBXLoader();
const gltfloader: GLTFLoader = new GLTFLoader();
console.log("gltfloader, fbxloader:", gltfloader, fbxloader);

//* Model + two animations
const animations: { animations: THREE.AnimationClip[] }[] = [];
let animationMixer = null as THREE.AnimationMixer | null;

// Model
fbxloader.load("./src/models2/model.fbx", (fbx: THREE.Group<THREE.Object3DEventMap>) => {
  animationMixer = new THREE.AnimationMixer(fbx);
  // const clipAction: THREE.AnimationAction = animationMixer.clipAction(animations[1].animations[0]);
  // clipAction.play();
  fbx.scale.set(0.01, 0.01, 0.01);
  fbx.position.y = -0.8;
  scene.add(fbx);
});

// First animation
fbxloader.load("./src/models2/1.fbx", (fbx: THREE.Group<THREE.Object3DEventMap>) => {
  console.log("fbx_1:", fbx);
  animations.push(fbx);
});

// Second animation
fbxloader.load("./src/models2/2.fbx", (fbx: THREE.Group<THREE.Object3DEventMap>) => {
  console.log("fbx_2:", fbx);
  animations.push(fbx);
});

window.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "1") {
    animationMixer?.stopAllAction();
    const clipAction = animationMixer?.clipAction(animations[0].animations[0]);
    clipAction?.play();
  }
  if (event.key === "2") {
    animationMixer?.stopAllAction();
    const clipAction = animationMixer?.clipAction(animations[1].animations[0]);
    clipAction?.play();
  }
});

//- ---
//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(aspect.width, aspect.height);
// @ts-ignore
renderer.physicallyCorrectLights = true;
// @ts-ignore
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#808080", 0.5);

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

//* OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

const clock: THREE.Clock = new THREE.Clock();
let previousTime = 0;

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);

  const elapsedTime: number = clock.getElapsedTime();
  const frameTime: number = elapsedTime - previousTime;
  previousTime = elapsedTime;

  if (animationMixer) {
    animationMixer.update(frameTime);
  }
})();
