import * as THREE from "three";
import { DRACOLoader, FBXLoader, GLTF, GLTFLoader, OBJLoader, OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";

const scene: THREE.Scene = new THREE.Scene();

//* Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

//* Loaders
const objloader: OBJLoader = new OBJLoader();

const gltfloader: GLTFLoader = new GLTFLoader();

const dracoloader: DRACOLoader = new DRACOLoader();
dracoloader.setDecoderConfig({ type: "js" });
dracoloader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
gltfloader.setDRACOLoader(dracoloader);

const fbxloader: FBXLoader = new FBXLoader();

console.log("objloader, gltfloader, dracoloader, fbxloader:", objloader, gltfloader, dracoloader, fbxloader);

//* Loading OBJ Model -> no animation!
// objloader.load("./src/models/monkey.obj", (objObject: THREE.Group<THREE.Object3DEventMap>): void => {
//   console.log(1, "objObject:", objObject);
//   objObject.position.y = 1;
//   objObject.children[0].position.z = -3;
//   // @ts-ignore
//   // console.log(" objObject.children[0].material:", objObject.children[0].material); // MeshPhongMaterial
//   // @ts-ignore
//   objObject.children[0].material = new THREE.MeshNormalMaterial();
//   console.log(2, "objObject:", objObject); // MeshPhongMaterial
//   scene.add(objObject);
// });

//* Loading GLB model
// gltfloader.load("./src/models/monkeyGLB.glb", (glb: GLTF): void => {
//   scene.add(glb.scene);
//   console.log("glb.scene:", glb.scene);
// });

//* Loading GLTF model
// gltfloader.load("./src/models/monkeyGLTF.gltf", (gltf: GLTF): void => {
//   scene.add(gltf.scene);
//   console.log("glb.scene:", gltf.scene);
// });

//* Loading GLTF Model Using DRACOLoader
// gltfloader.load("./src/models/monkeyGLTF_compression.gltf", (gltf: GLTF): void => {
//   console.log("compressed: gltf.scene:", gltf.scene);
//   scene.add(gltf.scene);
// });

//* Loading animatedCube
// let animationMixer = null as THREE.AnimationMixer | null;
// gltfloader.load("./src/models/animatedCube.glb", (glb: GLTF): void => {
//   animationMixer = new THREE.AnimationMixer(glb.scene);
//   const clipAction = animationMixer.clipAction(glb.animations[0]);
//   clipAction.play();
//   scene.add(glb.scene);
//   glb.scene.scale.set(0.5, 0.5, 0.5);
//   console.log("animated glb:", glb);
// });

//* Loading FBX Model
// let animationMixer = null as THREE.AnimationMixer | null;
// fbxloader.load("./src/models/Taunt.fbx", (fbx: THREE.Group<THREE.Object3DEventMap>): void => {
//   animationMixer = new THREE.AnimationMixer(fbx);
//   const clipAction = animationMixer.clipAction(fbx.animations[0]);
//   clipAction.play();
//   fbx.scale.set(0.01, 0.01, 0.01);
//   fbx.position.y = -0.8;
//   scene.add(fbx);
//   console.log("fbx:", fbx);
// });

//* New model with two animations
let animationMixer = null as THREE.AnimationMixer | null;
gltfloader.load("./src/models/newModel.glb", (glb: GLTF): void => {
  animationMixer = new THREE.AnimationMixer(glb.scene);
  // const clipAction = animationMixer.clipAction(glb.animations[0]); // first animation
  const clipAction = animationMixer.clipAction(glb.animations[3]); // second animation
  clipAction.play();
  glb.scene.position.y = -0.8;
  scene.add(glb.scene);
  console.log("animated glb.scene:", glb.scene);
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
