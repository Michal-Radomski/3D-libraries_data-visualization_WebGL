import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.scss";
// import { fragmentShaderSource, vertexShaderSource } from "./shaders";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";
// console.log("vShader, fShader:", vShader, fShader);

//* Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event: MouseEvent): void => {
  cursor.x = event.clientX / window.innerWidth;
  cursor.y = event.clientX / window.innerHeight;
});

//* Scene
const scene: THREE.Scene = new THREE.Scene();

//* Mesh
const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1, 64, 64);
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
// const mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );
// console.log("geometry?.attributes:", geometry?.attributes);

const material: THREE.RawShaderMaterial = new THREE.RawShaderMaterial({
  // vertexShader: vertexShaderSource as string,
  // fragmentShader: fragmentShaderSource as string,
  vertexShader: vShader as string,
  fragmentShader: fShader as string,
  glslVersion: undefined,
  side: THREE.DoubleSide,
  wireframe: true,
  // uniforms: {
  //   u_amplitude: { value: 12.0 },
  //   u_time: { value: 0.0 },
  //   u_color: { value: new THREE.Color("purple") },
  //   u_timecolor: { value: 0 },
  //   u_cursorcolor: { value: new THREE.Vector2(cursor.x, cursor.y) },
  // },
});
// console.log("material?.defaultAttributeValues:", material?.defaultAttributeValues);
const mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(mesh);

const amount: number = geometry?.attributes?.position?.count;
// console.log({ amount });
const newAttributeArray: Float32Array<ArrayBuffer> = new Float32Array(amount);
for (let i = 0; i < amount; i++) {
  // newAttributeArray[i] = i % 2;
  newAttributeArray[i] = Math.random();
}
// console.log("newAttributeArray:", newAttributeArray);
geometry.setAttribute("a_modulus", new THREE.BufferAttribute(newAttributeArray, 1));

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
  //GetElapsedTime
  // const elapsedTime: number = clock.getElapsedTime();

  //Update u_time
  // material.uniforms.u_time.value = elapsedTime;

  //Update u_timeColor
  // material.uniforms.u_timecolor.value = elapsedTime;

  //Update u_cursorcolor
  // material.uniforms.u_cursorcolor.value.x = cursor.x;
  // material.uniforms.u_cursorcolor.value.y = cursor.y;

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

// console.log("geometry?.attributes?.uv?.array:", geometry?.attributes?.uv?.array);
