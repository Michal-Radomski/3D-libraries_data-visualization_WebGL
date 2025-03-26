import { c, canvas } from "../main";

export class Player {
  velocity: { x: number; y: number };
  rotation: number;
  opacity: number;
  image: HTMLImageElement | undefined;
  width: number | undefined;
  height: number | undefined;
  position: { x: number; y: number } | undefined;
  particles: never[];
  frames: number;
  constructor() {
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.rotation = 0;
    this.opacity = 1;

    const image: HTMLImageElement = new Image();
    image.src = "./img/spaceship.png";
    image.onload = () => {
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

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position?.x as number, this.position?.y as number, this.width as number, this.height as number);
  }

  update() {}
}
