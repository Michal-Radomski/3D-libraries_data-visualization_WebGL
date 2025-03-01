import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader, MeshSurfaceSampler, OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

import "./style.scss";
//* Shaders
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";

// Elements
const buttons: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName("a");
// console.log("buttons:", buttons);

// GLTFLoader
const gltfLoader: GLTFLoader = new GLTFLoader();
// DRACOLoader
const dracoLoader: DRACOLoader = new DRACOLoader();
dracoLoader.setDecoderConfig({ type: "js" });
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
gltfLoader.setDRACOLoader(dracoLoader);

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(30, aspect.width / aspect.height, 0.01, 100);
camera.position.z = 10;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(aspect.width, aspect.height);
renderer.setClearColor("#27282c", 1.0);

const firstModelColor1 = "red";
const firstModelColor2 = "yellow";
const secondModelColor1 = "blue";
const secondModelColor2 = "white";
const modelArray = [] as THREE.Group<THREE.Object3DEventMap>[];

// Todo: refactor
//* Loading Models
// Model One
gltfLoader.load("./src/models/1.glb", (glb: GLTF): void => {
  // Increasing the number of vertices
  // @ts-ignore
  const samplerMesh: MeshSurfaceSampler = new MeshSurfaceSampler(glb.scene.children[0]).build();
  const particlesNumber = 25000;
  const particlesGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
  const particlesArray: Float32Array<ArrayBuffer> = new Float32Array(particlesNumber * 3);
  for (let i = 0; i < particlesNumber; i++) {
    const particlePosition: THREE.Vector3 = new THREE.Vector3();
    samplerMesh.sample(particlePosition);
    particlesArray.set([particlePosition.x, particlePosition.y, particlePosition.z], i * 3);
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlesArray, 3));

  // Changing model into particles
  glb.scene.children[0] = new THREE.Points(
    particlesGeometry,
    new THREE.RawShaderMaterial({
      vertexShader: vShader as string,
      fragmentShader: fShader as string,
      uniforms: {
        u_color_1: { value: new THREE.Color(`${firstModelColor1}`) },
        u_color_2: { value: new THREE.Color(`${firstModelColor2}`) },
        u_scale: { value: 0 },
      },
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
  );

  glb.scene.children[0].scale.set(0.7, 0.7, 0.7);
  glb.scene.children[0].position.x = 0.5;
  glb.scene.children[0].rotation.y = Math.PI * 0.5;
  modelArray[0] = glb.scene;
});

// Model Two
gltfLoader.load("./src/models/2.glb", (glb: GLTF): void => {
  // Increasing the number of vertices
  // @ts-ignore
  const samplerMesh: MeshSurfaceSampler = new MeshSurfaceSampler(glb.scene.children[0]).build();
  const particlesNumber = 25000;
  const particlesGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = new THREE.BufferGeometry();
  const particlesArray: Float32Array<ArrayBuffer> = new Float32Array(particlesNumber * 3);
  for (let i = 0; i < particlesNumber; i++) {
    const particlePosition: THREE.Vector3 = new THREE.Vector3();
    // console.log("particlePosition:", particlePosition);
    samplerMesh.sample(particlePosition);
    particlesArray.set([particlePosition.x, particlePosition.y, particlePosition.z], i * 3);
  }
  // console.log("particlesArray:", particlesArray);
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlesArray, 3));

  // Changing model into particles
  glb.scene.children[0] = new THREE.Points(
    particlesGeometry,
    new THREE.RawShaderMaterial({
      vertexShader: vShader,
      fragmentShader: fShader,
      uniforms: {
        u_color_1: { value: new THREE.Color(`${secondModelColor1}`) },
        u_color_2: { value: new THREE.Color(`${secondModelColor2}`) },
        u_scale: { value: 0 },
      },
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
  );

  glb.scene.children[0].scale.set(0.3, 0.3, 0.3);
  glb.scene.children[0].rotation.x = -Math.PI * 0.5;
  glb.scene.children[0].position.y = -0.2;
  glb.scene.children[0].rotation.z = -Math.PI * 0.5;
  modelArray[1] = glb.scene;
});

//* Buttons listener
// First button
buttons[0].addEventListener("click", (): void => {
  // @ts-ignore
  gsap.to(modelArray[0].children[0].material.uniforms.u_scale, {
    value: 1,
    duration: 1,
  });
  // @ts-ignore
  gsap.to(modelArray[1].children[0].material.uniforms.u_scale, {
    value: 0,
    duration: 1,
    onComplete: (): void => {
      scene.remove(modelArray[1]);
    },
  });
  scene.add(modelArray[0]);
});

// Second button
buttons[1].addEventListener("click", (): void => {
  // @ts-ignore
  gsap.to(modelArray[1].children[0].material.uniforms.u_scale, {
    value: 1,
    duration: 1,
  });
  // @ts-ignore
  gsap.to(modelArray[0].children[0].material.uniforms.u_scale, {
    value: 0,
    duration: 1,
    onComplete: (): void => {
      scene.remove(modelArray[0]);
    },
  });
  scene.add(modelArray[1]);
});

//* OrbitControls
const orbitControls: OrbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enableZoom = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  //* Renderer
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
