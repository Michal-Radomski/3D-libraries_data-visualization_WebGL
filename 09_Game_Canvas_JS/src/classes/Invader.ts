import { Position } from "../Interfaces";
import { c } from "../main";
import invader from "../img/invader.png";
import { InvaderProjectile } from "./InvaderProjectile";

export class Invader {
  velocity: Position;
  image!: HTMLImageElement;
  width!: number;
  height!: number;
  position!: Position;
  constructor({ position }: { position: Position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image: HTMLImageElement = new Image();
    image.src = invader;
    image.onload = (): void => {
      const scale = 1;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  draw(): void {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    if (this.image) {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    } else {
      console.log("Invader image not loaded");
    }
  }
  update({ velocity }: { velocity: Position }): void {
    if (!this.image) return;

    if (this.image) {
      this.draw();
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(invaderProjectiles: InvaderProjectile[]): void {
    // audio.enemyShoot.play()
    invaderProjectiles.push(
      new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height,
        },
        velocity: {
          x: 0,
          y: 5,
        },
      })
    );
  }
}
