import { Invader } from "./classes/Invader";
import { Particle } from "./classes/Particle";
import { Player } from "./classes/Player";
import { Rectangle } from "./Interfaces";
import { particles } from "./main";

export const rectangularCollision = ({
  rectangle1,
  rectangle2,
}: {
  rectangle1: Rectangle;
  rectangle2: Rectangle;
}): boolean => {
  return (
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width
  );
};

export const createParticles = ({
  object,
  fades,
  color = "#BAA0DE",
}: {
  object: Invader | Player;
  fades: number;
  color?: string;
}): void => {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        // color: "darkorange",
        color: color || "#BAA0DE",
        fades: fades,
      })
    );
  }
};
