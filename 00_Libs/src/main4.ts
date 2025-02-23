import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Mesh } from "@babylonjs/core";

// Create the canvas HTML element and attach it to the webpage
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.id = "gameCanvas";
document.body.appendChild(canvas);

// Initialize Babylon.js engine and scene
const engine: Engine = new Engine(canvas, true);
const scene: Scene = new Scene(engine);

// Create a camera
const camera: ArcRotateCamera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Create a light
const light: HemisphericLight = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
light.intensity = 0.7;

// Create a sphere
const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
console.log("sphere:", sphere);

// Render loop
engine.runRenderLoop((): void => {
  scene.render();
});

// Resize the engine on window resize
window.addEventListener("resize", (): void => {
  engine.resize();
});
