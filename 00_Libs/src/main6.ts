import * as THREE from "three";
import { GLTF, GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";

const scene: THREE.Scene = new THREE.Scene();

//* Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
scene.add(camera);

const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement; // Select the canvas element
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas }); // Add the WebGLRenderer
renderer.render(scene, camera); // Display what the camera in the scene captured
renderer.setSize(window.innerWidth, window.innerHeight);

// Load models asynchronously
const gltfloader: GLTFLoader = new GLTFLoader();

//* OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enablePan = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;

// Load model1 and model2
Promise.all([gltfloader.loadAsync("./src/models/lara_1.gltf"), gltfloader.loadAsync("./src/models/lara_2.gltf")]).then(
  (models: [GLTF, GLTF]) => {
    const model1: THREE.Group<THREE.Object3DEventMap> = models[0].scene;
    const model2: THREE.Group<THREE.Object3DEventMap> = models[1].scene;

    // Add models to the scene
    scene.add(model1);
    scene.add(model2);

    console.log("model1:", model1);
    console.log("model2:", model2);

    // Move model1 to the left and model2 to the right relative to the camera
    const direction: THREE.Vector3 = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const right: THREE.Vector3 = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();

    model1.position.addScaledVector(right, -1); // Move left
    model2.position.addScaledVector(right, 1); // Move right

    //* Animate
    (function animate(): void {
      orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    })();
  }
);
