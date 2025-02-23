import planck from "planck";

import "./style.scss";

// Create the world
const world: planck.World = planck.World({
  gravity: planck.Vec2(0, -10), // Gravity pointing downwards
});

// Create ground body
const ground: planck.Body = world.createBody();
ground.createFixture(planck.Box(10, 0.5), { density: 0 });

// Create a dynamic body (box)
const box: planck.Body = world.createBody({
  type: "dynamic",
  position: planck.Vec2(0, 5), // Start above the ground
});
box.createFixture(planck.Box(0.5, 0.5), { density: 1.0, friction: 0.5 });

// Set up the canvas for rendering
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation loop
(function animate(): void {
  world.step(1 / 60); // Step the physics world

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = "green";
  ctx.fillRect(-canvas.width / 2 + 10, canvas.height / 2 - 50, canvas.width - 20, 100);

  // Draw box
  const position = box.getPosition();
  const angle = box.getAngle();

  ctx.save();
  ctx.translate(position.x * 30 + canvas.width / 2, -position.y * 30 + canvas.height / 2); // Scale and center
  ctx.rotate(angle);
  ctx.fillStyle = "red";
  ctx.fillRect(-15, -15, 30, 30); // Draw box centered at (0,0)
  ctx.restore();

  requestAnimationFrame(animate);
})();
