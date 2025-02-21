import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log("THREE:", THREE);
// import gsap from "gsap";
import * as dat from "dat.gui";

import "./style.scss";

//^ V1
// //* Scene Mesh Camera Renderer
// //* 1. Scene
// const scene: THREE.Scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0xcccccc, 1, 200);

// //* 2. Mesh (Objects)
// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2); //* Cube
// // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "#A020F0" });
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xa020f0, fog: true, wireframe: true });
// const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );
// mesh.rotation.x = Math.PI * 0.25 * -1;
// // mesh.scale.x = 1;
// // mesh.scale.y = 1;
// // mesh.scale.z = 2;
// // mesh.scale.set(1, 1, 2);
// scene.add(mesh);

// //* 3. Camera
// const aspect = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // https://en.wikipedia.org/wiki/Viewing_frustum
// const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000); // Near: 1, and Far: 2000
// camera.position.z = 3;
// camera.position.x = 1;
// camera.position.y = 1;
// camera.zoom = 1;
// scene.add(camera);

// //* 4. Renderer
// const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement; // Select the canvas element
// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, precision: "highp", alpha: false }); // Add the WebGLRenderer
// renderer.setSize(aspect.width, aspect.height); // Renderer size
// renderer.render(scene, camera); // Display what the camera in the scene captured

// //* ---
// //* MeshTwo
// // const geometryT = new THREE.BoxGeometry(1, 1, 1);
// // const materialT = new THREE.MeshBasicMaterial({ color: "green" });
// // const meshT = new THREE.Mesh(geometryT, materialT);
// // meshT.position.y = 2;

// // // Group
// // const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();

// // // Adding the two meshes inside the Group Class
// // group.add(mesh, meshT);
// // // group.position.x = 3;
// // scene.add(group);

// // AxesHelper
// const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

// //* ---
// // Orbit Controls
// const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);
// // console.log("controls:", controls);

// //* Clock Class -> fps stands for frame per second
// const clock = new THREE.Clock();
// // console.log("clock:", clock);

// //* GSAP
// // gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 }); //* x -> red axe, y -> green axe and z -> blue axe
// // gsap.to(mesh.position, { duration: 2, delay: 2, x: -1 }); //* x -> red axe, y -> green axe and z -> blue axe

// // Animation loop
// (function animate(): void {
//   //* RequestAnimationFrame
//   window.requestAnimationFrame(animate);
//   // requestAnimationFrame(animate);

//   controls.update(); // IMPORTANT: Update the controls in the animation loop
//   controls.autoRotate = false;
//   controls.enablePan = true;
//   renderer.render(scene, camera);

//   const elapsedTime: number = clock.getElapsedTime();
//   // console.log("elapsedTime:", elapsedTime);

//   //* Update Rotation On X Axis and Y axis
//   mesh.rotation.x = elapsedTime;
//   mesh.rotation.y = elapsedTime * Math.PI * 0.1; // Will rotate the cube a turn per second

//   //* Linear Function
//   // mesh.position.x = elapsedTime * 0.25;
//   // mesh.position.y = elapsedTime * 0.25;

//   // mesh.position.x = -elapsedTime * 0.25
//   // mesh.position.y = elapsedTime * 0.25;

//   // mesh.position.x = 1+elapsedTime * 0.25
//   // mesh.position.y = elapsedTime * 0.25;

//   // mesh.position.x = 1 - elapsedTime * 0.25;
//   // mesh.position.y = elapsedTime * 0.25;

//   //* Sin Function
//   // mesh.position.x = Math.sin(elapsedTime);

//   //* Cos Function
//   // mesh.position.x = Math.cos(elapsedTime);

//   //* Circular Move
//   // mesh.position.x = Math.sin(elapsedTime);
//   // mesh.position.y = Math.cos(elapsedTime);

//   //* Tan Function
//   // mesh.position.x = Math.tan(elapsedTime);
//   // mesh.position.y = Math.tan(elapsedTime);
// })();

//^ V2
// console.log("window.devicePixelRatio:", window.devicePixelRatio);
const scene: THREE.Scene = new THREE.Scene();

// // Mesh One
// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// const purpleMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );
// purpleMesh.position.x = 1;

// // Mesh Two
// const geometry2: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
// const yellowMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry2,
//   material2
// );
// yellowMesh.position.x = -1;

// // Mesh Three
// const geometry3: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material3: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "green" });
// const greenMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry3,
//   material3
// );

// // Mesh Four
// const geometry4: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material4: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "white" });
// const whiteMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry4,
//   material4
// );
// whiteMesh.position.set(1, 1, 0);
// // whiteMesh.position.x=1;
// // whiteMesh.position.y=1;
// // whiteMesh.position.z=0;

// // Mesh Five
// const geometry5: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material5: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "pink" });
// const pinkMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry5,
//   material5
// );
// pinkMesh.position.set(-1, 1, 0);

// // Mesh Six
// const geometry6: THREE.BoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// const material6: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
// const blueMesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry6,
//   material6
// );
// blueMesh.position.y = 1;

// scene.add(purpleMesh, yellowMesh, greenMesh, whiteMesh, pinkMesh, blueMesh);

// //* LookAt
// yellowMesh.lookAt(whiteMesh.position);
// purpleMesh.lookAt(pinkMesh.position);
// pinkMesh.lookAt(greenMesh.position);

//* Mouse Listener
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event: MouseEvent): void => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = event.clientY / window.innerHeight - 0.5;
  // console.log("cursor.x, cursor.y:", cursor.x, cursor.y);
  // console.log("event?.layerX, event?.layerY:", event?.layerX, event?.layerY);
  // console.log("event.clientX, event.clientY:", event.clientX, event.clientY);
});

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// const camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000); //* OrthographicCamera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); //* PerspectiveCamera
camera.position.z = 2.5;
camera.position.x = 2;
camera.position.y = 2;

scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//* Clock Class
// const clock: THREE.Clock = new THREE.Clock();

//* OrbitControls
const controls: OrbitControls = new OrbitControls(camera, canvas as HTMLCanvasElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0; //* Default: 2.0
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

//* Animate
const animate = (): void => {
  controls.update(); // IMPORTANT: Update the controls in the animation loop

  // const elapsedTime: number = clock.getElapsedTime();
  // console.log("elapsedTime:", elapsedTime);

  // greenMesh.lookAt(new THREE.Vector3(cursor.x, -cursor.y, 1));
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();

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

const axesHelper: THREE.AxesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//^ ---
const geometry8: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry(); //* A low memory alternative
const verticesArray: Float32Array<ArrayBuffer> = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute: THREE.BufferAttribute = new THREE.BufferAttribute(verticesArray, 3); //* 3 numbers for a point
geometry8.setAttribute("position", positionAttribute);
// console.log("geometry8:", geometry8);

const material8: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const mesh8: THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.MeshBasicMaterial,
  THREE.Object3DEventMap
> = new THREE.Mesh(geometry8, material8);
scene.add(mesh8);

//* Texture loader
const loadingManager: THREE.LoadingManager = new THREE.LoadingManager();
loadingManager.onStart = (): void => {
  void console.log("Start");
};
loadingManager.onLoad = (): void => {
  void console.log("Loading . . .");
};
loadingManager.onProgress = (): void => {
  void console.log("Progress");
};
loadingManager.onError = (): void => {
  void console.log("Error !");
};

//* This can be any image (e.g., PNG, JPG/JPEG, GIF, DDS) or video (e.g., MP4, OGG/OGV) type supported by three.js.
// const textureLoader: THREE.TextureLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader.load("./src/texture/normal.jpg");
// const colorTexture: THREE.Texture = textureLoader.load("./src/texture/color.jpg");
// console.log("colorTexture:", colorTexture);

// const geometry9: THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1);
// const material9: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: colorTexture });
// const mesh9: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry9,
//   material9
// );
// scene.add(mesh9);

// const geometry10: THREE.SphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
// const material10: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: undefined, map: colorTexture });
// const sphere10: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry10,
//   material10
// );
// scene.add(sphere10);

//^ ---
//* Lights
const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight: THREE.PointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

//* TextureLoader
// const colorTexture: THREE.Texture = textureLoader.load("./src/texture/color.jpg");
// const matcapTexture: THREE.Texture = textureLoader.load("./src/texture/mat2.png");
// const bumpTexture: THREE.Texture = textureLoader.load("./src/texture/bump.jpg");
// const displacementTexture: THREE.Texture = textureLoader.load("./src/texture/displacementMap.jpg");

//* CubeTextureLoader
const cubeTextureLoader: THREE.CubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture: THREE.CubeTexture = cubeTextureLoader.load([
  "./src/texture/env/px.png",
  "./src/texture/env/nx.png",
  "./src/texture/env/py.png",
  "./src/texture/env/ny.png",
  "./src/texture/env/pz.png",
  "./src/texture/env/nz.png",
]);
scene.background = envTexture;

//* MeshBasicMaterial (simple shaded)
// const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1, 64, 64);
// // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: colorTexture, color: undefined });
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
// material.map = colorTexture;
// material.wireframe = true;
// material.color = new THREE.Color("skyblue");
// material.transparent = true;
// material.opacity = 0.6;
// material.side = THREE.DoubleSide; //* FrontSide, BackSide
// material.visible = true; //* false

//* MeshDepthMaterial (white is nearest, black is farthest. )
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshDepthMaterial = new THREE.MeshDepthMaterial();

//* MeshNormalMaterial (normal vector)
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial();

//* MeshMatcapMaterial (defined by a MatCap (or Lit Sphere) texture, which encodes the material color and shading)
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshMatcapMaterial = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

//* MeshLambertMaterial (a material for non-shiny surfaces, without specular highlights)
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial();

//* MeshPhongMaterial (the material uses a non-physically based Blinn-Phong model for calculating reflectance)
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial();
// material.shininess = 200;
// material.specular = new THREE.Color("green");

//* MeshToonMaterial (a material implementing toon shading)
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshToonMaterial = new THREE.MeshToonMaterial();

//* MeshStandardMaterial (a standard physically based material, using Metallic-Roughness workflow)
//* MeshPhysicalMaterial: an extension of the MeshStandardMaterial, providing more advanced physically-based rendering
// const geometry: THREE.TorusGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 32);
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
// material.metalness = 0.65;
// material.roughness = 0.5;

//* BumpTexture
// const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1);
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.bumpMap = bumpTexture;

//* DisplacementTexture
// const geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(1, 1, 12, 12);
// const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.displacementMap = displacementTexture;

//* CubeTexture Sphere
const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial();
material.metalness = 0.9;
material.roughness = 0.1;
material.envMap = envTexture;

const mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
scene.add(mesh);

//* GUI patterns
const gui: dat.GUI = new dat.GUI();

const materialColor = {
  color: 0xffffff,
};

// 1) Range
gui.add(mesh.position, "x").min(-3).max(3).step(0.1).name("X MeshOne");
// 2) Boolean
gui.add(material, "wireframe");
// 3) Color
gui.addColor(materialColor, "color").onChange((): void => {
  material.color.set(materialColor.color);
});
