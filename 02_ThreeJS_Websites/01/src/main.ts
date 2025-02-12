//* V1 imports
// import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
// import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
// console.log("gsap:", gsap);

//* V2 imports
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";

import "./style.scss";

const raycaster: THREE.Raycaster = new THREE.Raycaster();
// console.log("raycaster:", raycaster);
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
// console.log({ innerWidth, innerHeight });
// console.log({ outerHeight, outerWidth });
// console.log("scene, camera, renderer:", scene, camera, renderer);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
// console.log({ devicePixelRatio });
document.body.appendChild(renderer.domElement as HTMLCanvasElement);

//* -------------
// const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(10, 10, 10);
// console.log("boxGeometry:", boxGeometry);
// // const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
// //   color: 0xff0000,
// //   opacity: 0.5,
// //   transparent: true,
// //   side: THREE.DoubleSide,
// // });
// const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
//   color: 0xff0000,
//   opacity: 0.5,
//   transparent: true,
//   side: THREE.DoubleSide,
// });
// console.log("material:", material);
// // const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
// //   boxGeometry,
// //   material
// // );
// const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   boxGeometry,
//   material
// );
// console.log("mesh:", mesh);
// scene.add(mesh);

// function animationTest(): void {
//   requestAnimationFrame(animationTest);
//   renderer.render(scene, camera);
//   mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.01;
//   mesh.rotation.z += 0.01;
//   // console.log("mesh.rotation:", mesh.rotation);
// }
// animationTest();
//* -------------

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, -1, 1);
scene.add(light);

const backLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);
// console.log("light, backLight:", light, backLight);

new OrbitControls(camera, renderer.domElement as HTMLCanvasElement);
camera.position.z = 50;

const gui: dat.GUI = new dat.GUI();
// console.log("gui:", gui);

const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 50,
    heightSegments: 50,
  },
};
// console.log("world:", world);

gui.add(world.plane, "width", 1, 500).onChange(generatePlane);
gui.add(world.plane, "height", 1, 500).onChange(generatePlane);
gui.add(world.plane, "widthSegments", 1, 100).onChange(generatePlane);
gui.add(world.plane, "heightSegments", 1, 100).onChange(generatePlane);

function generatePlane(): void {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );

  // Vertices position randomization
  const { array }: { array: THREE.TypedArray } = planeMesh.geometry.attributes.position; //* Float32Array
  // console.log("array:", array);

  const randomValues = [] as number[];
  for (let i = 0; i < array.length; i++) {
    if (i % 3 === 0) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];

      array[i] = x + (Math.random() - 0.5) * 3;
      array[i + 1] = y + (Math.random() - 0.5) * 3;
      array[i + 2] = z + (Math.random() - 0.5) * 3;
    }
    randomValues.push(Math.random() * Math.PI * 2);
    // console.log("randomValues:", randomValues);
  }

  // @ts-ignore
  planeMesh.geometry.attributes.position.randomValues = randomValues;
  // @ts-ignore
  planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
  // console.log("planeMesh.geometry.attributes.position:", planeMesh.geometry.attributes.position);

  const colors = [] as number[];
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    // Todo: refactor
    colors.push(0, 0.19, 0.4);
  }
  // console.log("colors:", colors);

  planeMesh.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));
}

const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
);

const planeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: true,
  vertexColors: true,
});

const planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  planeGeometry,
  planeMaterial
);

scene.add(planeMesh);
generatePlane();

const starGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
const starMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [] as number[];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

console.log("starVertices:", starVertices);
console.log("starGeometry:", starGeometry);
console.log("starMaterial:", starMaterial);

const stars: THREE.Points<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.PointsMaterial,
  THREE.Object3DEventMap
> = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const mouse = {
  x: undefined as number | undefined,
  y: undefined as number | undefined,
} as THREE.Vector2;

let frame = 0;
function animate(): void {
  // console.log("frame:", frame);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse as THREE.Vector2, camera);
  frame += 0.01;

  // @ts-ignore
  const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    // X
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01;

    // Y
    array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.001;
  }

  planeMesh.geometry.attributes.position.needsUpdate = true;

  const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] = raycaster.intersectObject(planeMesh);
  // console.log("intersects:", intersects);

  if (intersects.length > 0) {
    // @ts-ignore
    const { color } = intersects[0].object.geometry.attributes;

    // Vertice 1
    color.setX(intersects[0].face?.a, 0.1);
    color.setY(intersects[0].face?.a, 0.5);
    color.setZ(intersects[0].face?.a, 1);

    // Vertice 2
    color.setX(intersects[0].face?.b, 0.1);
    color.setY(intersects[0].face?.b, 0.5);
    color.setZ(intersects[0].face?.b, 1);

    // Vertice 3
    color.setX(intersects[0].face?.c, 0.1);
    color.setY(intersects[0].face?.c, 0.5);
    color.setZ(intersects[0].face?.c, 1);
    // console.log("color:", color);

    // @ts-ignore
    intersects[0].object.geometry.attributes.color.needsUpdate = true;

    // Todo: refactor
    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4,
    };

    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1,
    };

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1,
      onUpdate: () => {
        // vertice 1
        color.setX(intersects[0].face?.a, hoverColor.r);
        color.setY(intersects[0].face?.a, hoverColor.g);
        color.setZ(intersects[0].face?.a, hoverColor.b);

        // vertice 2
        color.setX(intersects[0].face?.b, hoverColor.r);
        color.setY(intersects[0].face?.b, hoverColor.g);
        color.setZ(intersects[0].face?.b, hoverColor.b);

        // vertice 3
        color.setX(intersects[0].face?.c, hoverColor.r);
        color.setY(intersects[0].face?.c, hoverColor.g);
        color.setZ(intersects[0].face?.c, hoverColor.b);
        color.needsUpdate = true;
      },
    });
  }

  stars.rotation.x += 0.0005;
}
animate();

addEventListener("mousemove", (event: MouseEvent) => {
  //* Center of the screen
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});

gsap.to("#MR", {
  opacity: 1,
  duration: 1.5,
  y: 0,
  ease: "expo",
});

gsap.to("#oneWithAn", {
  opacity: 1,
  duration: 1.5,
  delay: 0.3,
  y: 0,
  ease: "expo",
});

gsap.to("#viewWorkBtn", {
  opacity: 1,
  duration: 1.5,
  delay: 0.6,
  y: 0,
  ease: "expo",
});

(document.querySelector("#viewWorkBtn") as HTMLButtonElement).addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  gsap.to("#container", {
    opacity: 0,
  });

  gsap.to(camera.position, {
    z: 25,
    ease: "power3.inOut",
    duration: 2,
  });
  gsap.to(camera.rotation, {
    x: 1.57,
    ease: "power3.inOut",
    duration: 2,
  });

  gsap.to(camera.position, {
    y: 1000,
    ease: "power3.in",
    duration: 1,
    delay: 2,
    onComplete: () => {
      window.location = "https://michal-radomski.github.io" as string & Location;
    },
  });
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
});
