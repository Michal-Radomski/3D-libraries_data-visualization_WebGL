import * as BABYLON from "babylonjs";

import "./style.scss";

//* V3
// Get the canvas DOM element
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
// Load the 3D engine
const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
// CreateScene function that creates and return the scene
const createScene = function (): BABYLON.Scene {
  // Create a basic BJS Scene object
  const scene: BABYLON.Scene = new BABYLON.Scene(engine);
  // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
  const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  // Target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // Attach the camera to the canvas
  camera.attachControl(canvas, false);

  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  const light: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
  const sphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
  // Move the sphere upward 1/2 of its height
  sphere.position.y = 1;
  // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
  const ground: BABYLON.Mesh = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene, false);

  console.log("light, ground:", light, ground);

  // Return the created scene
  return scene;
};
// call the createScene function
const scene: BABYLON.Scene = createScene();
// run the render loop
engine.runRenderLoop(function (): void {
  scene.render();
});
// the canvas/window resize event handler
window.addEventListener("resize", function (): void {
  engine.resize();
});

//* V2
// import { Engine } from "@babylonjs/core/Engines/engine";
// import { Scene } from "@babylonjs/core/scene";
// import { Vector3 } from "@babylonjs/core/Maths/math";
// import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
// import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
// import { Mesh } from "@babylonjs/core/Meshes/mesh";

// // Side-effects only imports allowing the standard material to be used as default.
// import "@babylonjs/core/Materials/standardMaterial";
// // Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
// import "@babylonjs/core/Meshes/Builders/sphereBuilder";
// import "@babylonjs/core/Meshes/Builders/boxBuilder";
// import "@babylonjs/core/Meshes/Builders/groundBuilder";

// import "./style.scss";

// const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
// const engine: Engine = new Engine(canvas);
// const scene: Scene = new Scene(engine);

// // This creates and positions a free camera (non-mesh)
// const camera: FreeCamera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// // This targets the camera to scene origin
// camera.setTarget(Vector3.Zero());

// // This attaches the camera to the canvas
// camera.attachControl(canvas, true);

// // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
// const light: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// // Default intensity is 1. Let's dim the light a small amount
// light.intensity = 0.7;

// // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
// const sphere: Mesh = Mesh.CreateSphere("sphere1", 16, 2, scene);

// // Move the sphere upward 1/2 its height
// sphere.position.y = 2;

// // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
// Mesh.CreateGround("ground1", 6, 6, 2, scene);

// engine.runRenderLoop((): void => {
//   scene.render();
// });

//* V1
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
// import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Mesh } from "@babylonjs/core";

// import "./style.scss";

// // Create the canvas HTML element and attach it to the webpage
// const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
// canvas.style.width = "100%";
// canvas.style.height = "100%";
// canvas.id = "gameCanvas";
// document.body.appendChild(canvas);

// // Initialize Babylon.js engine and scene
// const engine: Engine = new Engine(canvas, true);
// const scene: Scene = new Scene(engine);

// // Create a camera
// const camera: ArcRotateCamera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, Vector3.Zero(), scene);
// camera.attachControl(canvas, true);

// // Create a light
// const light: HemisphericLight = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
// light.intensity = 0.7;

// // Create a sphere
// const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
// console.log("sphere:", sphere);

// // Render loop
// engine.runRenderLoop((): void => {
//   scene.render();
// });

// // Resize the engine on window resize
// window.addEventListener("resize", (): void => {
//   engine.resize();
// });
