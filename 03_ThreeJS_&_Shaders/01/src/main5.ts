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
dracoloader.setDecoderPath("/draco/");
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
gltfloader.load("./src/models/monkeyGLTF.gltf", (gltf: GLTF): void => {
  scene.add(gltf.scene);
  console.log("glb.scene:", gltf.scene);
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
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

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

// const clock: THREE.Clock = new THREE.Clock();
// let previousTime = 0;

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);

  // const elapsedTime = clock.getElapsedTime();
  // const frameTime = elapsedTime - previousTime;
  // previousTime = elapsedTime;

  // if (animationMixer) {
  //   animationMixer.update(frameTime);
  // }
})();
