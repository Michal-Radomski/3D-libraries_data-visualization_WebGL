import { Position } from "../Interfaces";
import { c } from "../main";

export class PowerUp {
  position: Position;
  velocity: Position;
  radius: number;
  constructor({ position, velocity }: { position: Position; velocity: Position }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw(): void {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }

  update(): void {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
