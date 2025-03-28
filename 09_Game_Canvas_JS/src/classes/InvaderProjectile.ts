import { Position } from "../Interfaces";
import { c } from "../main";

export class InvaderProjectile {
  position: Position;
  velocity: Position;
  width: number;
  height: number;
  constructor({ position, velocity }: { position: Position; velocity: Position }) {
    this.position = position;
    this.velocity = velocity;

    this.width = 3;
    this.height = 10;
  }

  draw(): void {
    c.fillStyle = "whitesmoke";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(): void {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
