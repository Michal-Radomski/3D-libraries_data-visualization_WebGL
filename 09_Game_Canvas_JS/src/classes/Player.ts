import { c, canvas, player } from "../main";
import spaceship from "../img/spaceship.png";
import { Position } from "../Interfaces";
import { Particle } from "./Particle";
// console.log("spaceship:", spaceship);

export class Player {
  velocity: Position;
  rotation: number;
  opacity: number;
  image: HTMLImageElement | undefined;
  width: number | undefined;
  height: number | undefined;
  position!: Position;
  particles: Particle[];
  frames: number;
  constructor() {
    // this.position = { x: 200, y: 200 };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
    this.opacity = 1;

    const image: HTMLImageElement = new Image();
    image.src = spaceship;

    image.onload = (): void => {
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };
    };

    this.particles = [];
    this.frames = 0;
  }

  draw(): void {
    // c.fillStyle = "red";
    // c.fillRect(this.position?.x as number, this.position?.y as number, this.width as number, this.height as number);
    c.save();
    c.globalAlpha = this.opacity;
    c.translate(player.position?.x + (player.width as number) / 2, player.position?.y + (player.height as number) / 2);
    c.rotate(this.rotation);

    c.translate(-player.position?.x - (player.width as number) / 2, -player.position?.y - (player.height as number) / 2);

    if (this.image) {
      c.drawImage(this.image!, this.position!.x, this.position!.y, this.width as number, this.height as number);
    } else {
      console.log("Spaceship image not loaded");
    }
    c.restore();
  }

  update(): void {
    if (!this.image) return;

    this.draw();
    this.position!.x += this.velocity.x;

    if (this.opacity !== 1) return;

    this.frames++;
  }
}
