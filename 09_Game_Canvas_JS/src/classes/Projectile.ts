import { Position } from "../Interfaces";
import { c } from "../main";

export class Projectile {
  position: Position;
  velocity: Position;
  radius: number;
  color: string;
  constructor({ position, velocity, color = "red" }: { position: Position; velocity: Position; color?: string }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = 4;
    this.color = color;
  }

  draw(): void {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(): void {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
