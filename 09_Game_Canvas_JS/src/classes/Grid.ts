import { Position } from "../Interfaces";
import { canvas } from "../main";
import { Invader } from "./Invader";

export class Grid {
  position: Position;
  velocity: Position;
  invaders: Invader[];
  width: number;
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.velocity = {
      x: 3,
      y: 0,
    };

    // this.invaders = [new Invader({ position: { x: 100, y: 100 } })];
    this.invaders = [] as Invader[];

    const columns: number = Math.floor(Math.random() * 10 + 5);
    const rows: number = Math.floor(Math.random() * 5 + 2);

    this.width = columns * 30;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 30,
              y: y * 30,
            },
          })
        );
      }
    }
  }

  update(): void {
    // console.log("this.invaders:", this.invaders);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y = 0;

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x * 1.15;
      this.velocity.y = 30;
    }
  }
}
