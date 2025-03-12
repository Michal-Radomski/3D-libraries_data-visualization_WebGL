import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

import "./style.scss";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

//* HTML
const canvasContainer = document.querySelector("#canvasContainer") as HTMLDivElement;
// console.log("canvasContainer:", canvasContainer);

//* Scene
const scene: THREE.Scene = new THREE.Scene();

//* AxesHelper
const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

//* Camera
const aspectCanvas = {
  // width: window.innerWidth,
  // height: window.innerHeight,
  width: canvasContainer.offsetWidth,
  height: canvasContainer.offsetHeight,
};

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspectCanvas.width / aspectCanvas.height, 0.1, 1000);
camera.position.z = 15;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(aspectCanvas.width, aspectCanvas.height);
renderer.setPixelRatio(window.devicePixelRatio);
// console.log("window.devicePixelRatio:", window.devicePixelRatio);
renderer.render(scene, camera);

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);

//^ Create a sphere
const sphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  // new THREE.MeshBasicMaterial({ color: undefined, map: new THREE.TextureLoader().load("./img/globe.jpeg") })
  new THREE.ShaderMaterial({
    vertexShader: vertexShader as string,
    fragmentShader: fragmentShader as string,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("./img/globe.jpeg"),
      },
    },
  })
);
// console.log("sphere:", sphere);
// scene.add(sphere); //* added in group!

//* Create atmosphere
const atmosphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader as string,
    fragmentShader: atmosphereFragmentShader as string,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);
atmosphere.scale.set(1.075, 1.075, 1.075);
// console.log("atmosphere:", atmosphere);
scene.add(atmosphere);

const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();
group.add(sphere);
scene.add(group);

//* Stars
const starGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
const starMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [] as number[];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 3000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

const stars: THREE.Points<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.PointsMaterial,
  THREE.Object3DEventMap
> = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//* Mouse
const mouse = {
  x: undefined as number | undefined,
  y: undefined as number | undefined,
  down: false,
  xPrev: undefined as number | undefined,
  yPrev: undefined as number | undefined,
};

//^ Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  //* Renderer
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  sphere.rotation.y += 0.002;

  if (mouse.x) {
    gsap.to(group.rotation, {
      x: (-mouse.y! as number) * 0.5,
      y: mouse.x * 0.3,
      duration: 2,
    });
  }
})();

//* Resizing
window.addEventListener("resize", (): void => {
  // New size
  aspectCanvas.width = canvasContainer.offsetWidth;
  aspectCanvas.height = canvasContainer.offsetHeight;

  // New AspectRatio
  camera.aspect = aspectCanvas.width / aspectCanvas.height;
  camera.updateProjectionMatrix();

  // New RendererSize
  renderer.setSize(aspectCanvas.width, aspectCanvas.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//^ Other EventListeners
addEventListener("mousemove", (event: MouseEvent): void => {
  mouse.x = ((event.clientX - innerWidth / 2) / (innerWidth / 2)) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});
