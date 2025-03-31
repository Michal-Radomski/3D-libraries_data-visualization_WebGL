import { Position } from "../Interfaces";
import { c, canvas } from "../main";

export class Bomb {
  static radius = 30;
  position: Position;
  velocity: Position;
  color: string;
  opacity: number;
  active: boolean;
  constructor({ position, velocity }: { position: Position; velocity: Position }) {
    this.position = position;
    this.velocity = velocity;
    Bomb.radius = 0;
    this.color = "red";
    this.opacity = 1;
    this.active = false;

    gsap.to(this, {
      radius: 30,
    });
  }

  draw(): void {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.position.x, this.position.y, Bomb.radius, 0, Math.PI * 2);
    c.closePath();
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update(): void {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.x + Bomb.radius + this.velocity.x >= canvas.width ||
      this.position.x - Bomb.radius + this.velocity.x <= 0
    ) {
      this.velocity.x = -this.velocity.x;
    } else if (
      this.position.y + Bomb.radius + this.velocity.y >= canvas.height ||
      this.position.y - Bomb.radius + this.velocity.y <= 0
    )
      this.velocity.y = -this.velocity.y;
  }

  explode(): void {
    // audio.bomb.play();
    this.active = true;
    this.velocity.x = 0;
    this.velocity.y = 0;
    gsap.to(this, {
      radius: 200,
      color: "white",
    });

    gsap.to(this, {
      delay: 0.1,
      opacity: 0,
      duration: 0.15,
    });
  }
}

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
