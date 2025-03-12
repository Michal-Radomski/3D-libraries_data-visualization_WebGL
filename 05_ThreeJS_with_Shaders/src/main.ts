import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
// import "tailwindcss/tailwind.css";

import "./style.scss";
import "./tailwind.css";
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

  //* https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
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
sphere.rotation.y = -Math.PI / 2;
// console.log("sphere:", sphere);
// scene.add(sphere); //* added in group!

//* Create atmosphere
const atmosphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  new THREE.SphereGeometry(1, 50, 50),
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

//* Singular box
const createBox = ({
  lat,
  lng,
  country,
  population,
}: {
  lat: number;
  lng: number;
  country: string;
  population: string;
}): void => {
  const box: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.8),
    new THREE.MeshBasicMaterial({
      color: "#3BF7FF",
      opacity: 0.4,
      transparent: true,
    })
  );

  // 23.6345° N, 102.5528° W = mexico
  const latitude: number = (lat / 180) * Math.PI;
  const longitude: number = (lng / 180) * Math.PI;
  const radius: number = 5;
  // console.log({ latitude, longitude });

  //* Spherical coordinate system: https://en.wikipedia.org/wiki/Spherical_coordinate_system
  const x: number = radius * Math.cos(latitude) * Math.sin(longitude);
  const y: number = radius * Math.sin(latitude);
  const z: number = radius * Math.cos(latitude) * Math.cos(longitude);
  // console.log({ x, y, z });

  box.position.x = x;
  box.position.y = y;
  box.position.z = z;

  box.lookAt(0, 0, 0);
  box.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.4));

  group.add(box);

  gsap.to(box.scale, {
    z: 1.4,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "linear",
    delay: Math.random(),
  });
  // box.scale.z =

  // @ts-ignore
  box.country = country;
  // @ts-ignore
  box.population = population;
};

createBox({
  lat: 23.6345,
  lng: -102.5528,
  country: "Mexico",
  population: "127.6 million",
});
createBox({
  lat: -14.235,
  lng: -51.9253,
  country: "Brazil",
  population: "211 million",
});
createBox({
  lat: 20.5937,
  lng: 78.9629,
  country: "India",
  population: "1.366 billion",
});
createBox({
  lat: 35.8617,
  lng: 104.1954,
  country: "China",
  population: "1.398 billion",
});
createBox({
  lat: 37.0902,
  lng: -95.7129,
  country: "USA",
  population: "328.2 million",
});

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
  // sphere.rotation.y += 0.001;
  group.rotation.y += 0.001;

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
