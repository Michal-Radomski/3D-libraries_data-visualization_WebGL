import * as THREE from "three";

import "./style.scss";

// Temp
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 640.0 / 480.0, 0.1, 1000);

const canvas = document.querySelector("canvas#glcanvas") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, precision: "highp", alpha: true });
renderer.setSize(640.0, 480.0);
renderer.render(scene, camera);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(cube);

camera.position.z = 5;

const animate = (): void => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
