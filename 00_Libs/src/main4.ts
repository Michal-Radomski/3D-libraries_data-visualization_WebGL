//* V2
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

// Side-effects only imports allowing the standard material to be used as default.
import "@babylonjs/core/Materials/standardMaterial";
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/groundBuilder";

import "./style.scss";

const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const engine: Engine = new Engine(canvas);
const scene: Scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
const camera: FreeCamera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
const light: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
const sphere: Mesh = Mesh.CreateSphere("sphere1", 16, 2, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 2;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
Mesh.CreateGround("ground1", 6, 6, 2, scene);

engine.runRenderLoop((): void => {
  scene.render();
});

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
