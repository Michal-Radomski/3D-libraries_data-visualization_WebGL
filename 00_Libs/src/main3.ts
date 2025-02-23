import { Engine, World, Bodies, Runner } from "matter-js";

import "./style.scss";

// Create the Matter.js engine
const engine: Engine = Engine.create();
const world: World = engine.world;

// Create a renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create ground and box bodies
const ground: Matter.Body = Bodies.rectangle(canvas.width / 2, canvas.height - 10, canvas.width, 20, { isStatic: true });
const box: Matter.Body = Bodies.rectangle(canvas.width / 2, 100, 40, 40);

// Add bodies to the world
World.add(world, [ground, box]);

// Create a runner to update the engine
const runner: Runner = Runner.create();
Runner.run(runner, engine);

// Render function to draw the scene
(function render(): void {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw ground
  context.fillStyle = "green";
  context.fillRect(
    ground.position.x - ground.bounds.max.x / 2,
    ground.position.y - ground.bounds.max.y / 2,
    ground.bounds.max.x,
    ground.bounds.max.y
  );

  // Draw box
  context.fillStyle = "red";
  context.fillRect(
    box.position.x - box.bounds.max.x / 2,
    box.position.y - box.bounds.max.y / 2,
    box.bounds.max.x,
    box.bounds.max.y
  );

  requestAnimationFrame(render); // Request next frame
})();
