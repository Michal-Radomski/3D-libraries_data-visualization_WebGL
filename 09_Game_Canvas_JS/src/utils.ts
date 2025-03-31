import gsap from "gsap";

import { Invader } from "./classes/Invader";
import { Particle } from "./classes/Particle";
import { Player } from "./classes/Player";
import { Rectangle } from "./Interfaces";
import { particles } from "./main";

export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const createScoreLabel = ({ object, score = 100 }: { object: Invader; score?: number }): void => {
  const scoreLabel: HTMLLabelElement = document.createElement("label");
  scoreLabel.innerText = String(score);
  scoreLabel.style.position = "absolute";
  scoreLabel.style.color = "white";
  scoreLabel.style.top = object.position.y + "px";
  scoreLabel.style.left = object.position.x + "px";
  scoreLabel.style.userSelect = "none";
  (document.querySelector("#parentDiv") as HTMLDivElement).appendChild(scoreLabel);

  gsap.to(scoreLabel, {
    opacity: 0,
    y: -30,
    duration: 0.75,
    onComplete: (): void => {
      (document.querySelector("#parentDiv") as HTMLDivElement).removeChild(scoreLabel);
    },
  });
};

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
  fades: boolean;
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
