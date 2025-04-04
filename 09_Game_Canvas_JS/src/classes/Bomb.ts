import gsap from "gsap";

import { Position } from "../Interfaces";
import { c, canvas } from "../main";

export class Bomb {
  static radius: number = 30;
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

    gsap.to(Bomb, {
      radius: 30,
      duration: 1.5,
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
    // console.log("Explode!!!");
    // audio.bomb.play();
    this.active = true;
    this.velocity.x = 0;
    this.velocity.y = 0;

    gsap.to(Bomb, {
      radius: 80, // Todo: fix this!
      // color: "white",
    });

    gsap.to(this, {
      delay: 0.1,
      opacity: 0,
      color: "white",
      duration: 0.15,
    });
  }
}
