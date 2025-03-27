import { Invader } from "./classes/Invader";
import { Player } from "./classes/Player";
import { Projectile } from "./classes/Projectile";
import "./style.scss";

// const scoreEl = document.querySelector("#scoreEl") as HTMLSpanElement;
export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const c = canvas.getContext("2d") as CanvasRenderingContext2D;
// console.log("c:", c);

canvas.width = 1024;
canvas.height = 576;

interface Keys {
  [key: string]: { pressed: boolean };
}

const keys: Keys = {
  a: { pressed: false },
  d: { pressed: false },
  space: { pressed: false },
};

export const player: Player = new Player();
// console.log("player:", player);
// player.draw();

const projectiles: Projectile[] = [] as Projectile[];
const invader: Invader = new Invader({ position: { x: 100, y: 100 } });

(function animate(): void {
  requestAnimationFrame(animate);
  c.fillStyle = "#212529";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // player.draw();
  player.update();

  invader.update({ velocity: { x: 0, y: 0 } });

  projectiles.forEach((projectile: Projectile, index: number) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });

  //* Keys
  if (keys.a.pressed && player.position!.x >= 0) {
    player.velocity.x = -7;
    player.rotation = -0.15;
  } else if (keys.d.pressed && player.position!.x + player.width! <= canvas.width) {
    player.velocity.x = 7;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }
})();
// animate();

// window.addEventListener("keydown", (event: KeyboardEvent): void => {
//   console.log("event.key:", event.key);
// });

window.addEventListener("keydown", ({ key }: { key: string }): void => {
  // console.log("key:", key);
  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case " ":
      keys.space.pressed = true;
      projectiles.push(
        new Projectile({
          position: { x: player.position.x + player.width! / 2, y: player.position.y },
          velocity: { x: 0, y: -8 },
        })
      );
      // console.log("projectiles:", projectiles);
      break;
  }
});

window.addEventListener("keyup", ({ key }: { key: string }): void => {
  // console.log("key:", key);
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case " ":
      keys.space.pressed = false;
      break;
  }
});
