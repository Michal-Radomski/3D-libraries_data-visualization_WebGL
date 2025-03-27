import { Player } from "./classes/Player";
import "./style.scss";

// const scoreEl = document.querySelector("#scoreEl") as HTMLSpanElement;
export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const c = canvas.getContext("2d") as CanvasRenderingContext2D;
// console.log("c:", c);

canvas.width = 1024;
canvas.height = 576;

const player = new Player();
// console.log("player:", player);
player.draw();

function animate(): void {
  requestAnimationFrame(animate);
  c.fillStyle = "#212529";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
}
animate();
