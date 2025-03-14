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
import countries from "./data/countries.json";
// console.log("countries:", countries);

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

let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspectCanvas.width / aspectCanvas.height, 0.1, 1000);
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

//* V1: Singular box
// const createBox = ({
//   lat,
//   lng,
//   country,
//   population,
// }: {
//   lat: number;
//   lng: number;
//   country: string;
//   population: string;
// }): void => {
//   const box: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//     new THREE.BoxGeometry(0.2, 0.2, 0.8),
//     new THREE.MeshBasicMaterial({
//       color: "#3BF7FF",
//       opacity: 0.4,
//       transparent: true,
//     })
//   );

//   // 23.6345° N, 102.5528° W = mexico
//   const latitude: number = (lat / 180) * Math.PI;
//   const longitude: number = (lng / 180) * Math.PI;
//   const radius: number = 5;
//   // console.log({ latitude, longitude });

//   //* Spherical coordinate system: https://en.wikipedia.org/wiki/Spherical_coordinate_system
//   const x: number = radius * Math.cos(latitude) * Math.sin(longitude);
//   const y: number = radius * Math.sin(latitude);
//   const z: number = radius * Math.cos(latitude) * Math.cos(longitude);
//   // console.log({ x, y, z });

//   box.position.x = x;
//   box.position.y = y;
//   box.position.z = z;

//   box.lookAt(0, 0, 0);
//   box.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.4));

//   group.add(box);

//   // box.scale.z = 2;
//   gsap.to(box.scale, {
//     z: 1.4,
//     duration: 2,
//     yoyo: true,
//     repeat: -1, //* Infinitely
//     ease: "linear",
//     delay: Math.random(),
//   });

//   // @ts-ignore
//   box.country = country;
//   // @ts-ignore
//   box.population = population;
// };

// createBox({
//   lat: 23.6345,
//   lng: -102.5528,
//   country: "Mexico",
//   population: "127.6 million",
// });
// createBox({
//   lat: -14.235,
//   lng: -51.9253,
//   country: "Brazil",
//   population: "211 million",
// });
// createBox({
//   lat: 20.5937,
//   lng: 78.9629,
//   country: "India",
//   population: "1.366 billion",
// });
// createBox({
//   lat: 35.8617,
//   lng: 104.1954,
//   country: "China",
//   population: "1.398 billion",
// });
// createBox({
//   lat: 37.0902,
//   lng: -95.7129,
//   country: "USA",
//   population: "328.2 million",
// });

//* V2: All Countries
const createBoxes = (countries: Country[]): void => {
  // const num = 1e9; //* Equivalent to 1 * 10^9 -> scientific notation
  // console.log({ num }); //* Output: 1000000000

  countries.forEach((country: Country): void => {
    const scale: number = country.population / 1e9; //* Equivalent to 1 * 10^9 -> 1000000000
    const lat: number = country.latlng[0];
    const lng: number = country.latlng[1];
    const zScale: number = 0.8 * scale;

    const box: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
      new THREE.BoxGeometry(Math.max(0.1, 0.2 * scale), Math.max(0.1, 0.2 * scale), Math.max(zScale, 0.4 * Math.random())),
      new THREE.MeshBasicMaterial({
        color: "#3BF7FF",
        opacity: 0.4,
        transparent: true,
      })
    );

    const latitude: number = (lat / 180) * Math.PI;
    const longitude: number = (lng / 180) * Math.PI;
    const radius = 5;

    const x: number = radius * Math.cos(latitude) * Math.sin(longitude);
    const y: number = radius * Math.sin(latitude);
    const z: number = radius * Math.cos(latitude) * Math.cos(longitude);

    box.position.x = x;
    box.position.y = y;
    box.position.z = z;

    box.lookAt(0, 0, 0);
    box.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -zScale / 2));

    group.add(box);

    gsap.to(box.scale, {
      z: 1.4,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "linear",
      delay: Math.random(),
    });

    // @ts-ignore
    box.country = country.name;
    // @ts-ignore
    box.population = new Intl.NumberFormat("pl-PL").format(country.population);
  });
};

const mappedCountries: Country[] = countries?.map((elem): Country => {
  return {
    population: elem.population,
    latlng: elem.latlng as [number, number],
    name: elem.name,
  };
});

createBoxes(mappedCountries);

//* Mouse
const mouse = {
  x: undefined as number | undefined,
  y: undefined as number | undefined,
  down: false,
  xPrev: undefined as number | undefined,
  yPrev: undefined as number | undefined,
};

//* Raycaster
const raycaster: THREE.Raycaster = new THREE.Raycaster();
// console.log("raycaster:", raycaster);
const popUpEl = document.querySelector("#popUpEl") as HTMLDivElement;
const populationEl = document.querySelector("#populationEl") as HTMLSpanElement;
const populationValueEl = document.querySelector("#populationValueEl") as HTMLParagraphElement;

//^ Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  //* Renderer
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  // sphere.rotation.y += 0.001;
  group.rotation.y += 0.001;

  // if (mouse?.x || mouse?.y) {
  //   gsap.to(group.rotation, {
  //     x: (-mouse.y! as number) * 0.5,
  //     y: (mouse.x! as number) * 0.3,
  //     duration: 2,
  //   });
  // }

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse as unknown as THREE.Vector2, camera);

  // Calculate objects intersecting the picking ray
  const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] = raycaster.intersectObjects(
    group.children.filter((mesh: THREE.Object3D<THREE.Object3DEventMap>) => {
      // @ts-ignore
      return mesh.geometry.type === "BoxGeometry";
    })
  );
  // if (intersects?.length) {
  //   console.log("intersects:", intersects);
  // }

  group.children.forEach((mesh: THREE.Object3D<THREE.Object3DEventMap>) => {
    // @ts-ignore
    mesh.material.opacity = 0.4;
  });

  gsap.set(popUpEl, {
    display: "none",
  });

  for (let i = 0; i < intersects.length; i++) {
    const box = intersects[i].object;
    // @ts-ignore
    box.material.opacity = 1;
    gsap.set(popUpEl, {
      display: "block",
    });
    // @ts-ignore
    populationEl.innerHTML = box.country;
    // @ts-ignore
    populationValueEl.innerHTML = box.population;
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

  camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
  camera.position.z = 15;
});

//^ Other EventListeners
canvasContainer.addEventListener("mousedown", (event: MouseEvent): void => {
  const { clientX, clientY }: { clientX: number; clientY: number } = event;
  mouse.down = true;
  mouse.xPrev = clientX;
  mouse.yPrev = clientY;
});

addEventListener("mousemove", (event: MouseEvent): void => {
  if (innerWidth >= 1280) {
    mouse.x = ((event.clientX - innerWidth / 2) / (innerWidth / 2)) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  } else {
    const offset: number = canvasContainer.getBoundingClientRect().top;
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -((event.clientY - offset) / innerHeight) * 2 + 1;
    console.log("mouse.y:", mouse.y);
  }

  gsap.set(popUpEl, {
    x: event.clientX,
    y: event.clientY,
  });

  if (mouse.down) {
    event.preventDefault();
    console.log("Turn the earth");
    const deltaX: number = event?.clientX - mouse?.xPrev!;
    const deltaY: number = event?.clientY - mouse?.yPrev!;
    // console.log({ deltaX, deltaY });

    group.rotation.x += deltaY * 0.005;
    group.rotation.y += deltaX * 0.005;
    console.log("group.rotation:", group.rotation);

    gsap.to(group.rotation, {
      y: group.rotation.y,
      x: group.rotation.x,
      duration: 2,
    });
    mouse.xPrev = event.clientX;
    mouse.yPrev = event.clientY;
  }
  // console.log(1, "mouse:", mouse);
});

addEventListener("mouseup", (_event): void => {
  mouse.down = false;
});

addEventListener(
  "touchmove",
  (event: TouchEvent): void => {
    // @ts-ignore
    event.clientX = event.touches[0].clientX;
    // @ts-ignore
    event.clientY = event.touches[0].clientY;

    const doesIntersect = raycaster.intersectObject(sphere);
    console.log("doesIntersect:", doesIntersect);
    if (doesIntersect.length > 0) mouse.down = true;

    if (mouse.down) {
      const offset: number = canvasContainer.getBoundingClientRect().top;
      // @ts-ignore
      mouse.x = (event.clientX / innerWidth) * 2 - 1;
      // @ts-ignore
      mouse.y = -((event.clientY - offset) / innerHeight) * 2 + 1;
      console.log(mouse.y);

      gsap.set(popUpEl, {
        // @ts-ignore
        x: event.clientX,
        // @ts-ignore
        y: event.clientY,
      });

      event.preventDefault();
      // console.log('turn the earth')
      // @ts-ignore
      const deltaX = event.clientX - mouse.xPrev!;
      // @ts-ignore
      const deltaY = event.clientY - mouse.yPrev!;

      group.rotation.x += deltaY * 0.005;
      group.rotation.y += deltaX * 0.005;

      gsap.to(group.rotation, {
        y: group.rotation.y,
        x: group.rotation.x,
        duration: 2,
      });
      // @ts-ignore
      mouse.xPrev = event.clientX;
      // @ts-ignore
      mouse.yPrev = event.clientY;
    }
    // console.log(2, "mouse:", mouse);
  },
  { passive: false }
);

addEventListener("touchend", (_event): void => {
  mouse.down = false;
});
