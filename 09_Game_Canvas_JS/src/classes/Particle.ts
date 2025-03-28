import { Position } from "../Interfaces";
import { c } from "../main";

export class Particle {
  radius: number;
  color: string;
  opacity: number;
  fades: number;
  position: Position;
  velocity: Position;
  constructor({
    position,
    velocity,
    radius,
    color,
    fades,
  }: {
    position: Position;
    velocity: Position;
    radius: number;
    color: string;
    fades: number;
  }) {
    this.position = position;
    this.velocity = velocity;

    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }

  draw(): void {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update(): void {
    this.draw();
    this.position.x += this.velocity.x as number;
    this.position.y += this.velocity.y as number;

    if (this.fades) {
      this.opacity -= 0.01;
    }
  }
}
