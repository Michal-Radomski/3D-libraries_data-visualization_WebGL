import "./style.scss";
import { Grid } from "./classes/Grid";
import { Invader } from "./classes/Invader";
import { InvaderProjectile } from "./classes/InvaderProjectile";
import { Player } from "./classes/Player";
import { Projectile } from "./classes/Projectile";
import { createParticles, createScoreLabel, rectangularCollision } from "./utils";
import { Particle } from "./classes/Particle";

const scoreEl = document.querySelector("#scoreEl") as HTMLSpanElement;
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

let frames: number = 0;
let randomInterval: number = Math.floor(Math.random() * 500 + 500);
// console.log("randomInterval:", randomInterval);
const game = {
  over: false,
  active: true,
};
let score: number = 0;

export const player: Player = new Player();
// console.log("player:", player);
// player.draw();

const projectiles: Projectile[] = [];
// const invader: Invader = new Invader({ position: { x: 100, y: 100 } });
// const grids: Grid[] = [new Grid()];
const grids: Grid[] = [];
const invaderProjectiles: InvaderProjectile[] = [];
export const particles = [] as Particle[];
// const bombs = [];
// const powerUps = [];

for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      velocity: {
        x: 0,
        y: 0.3,
      },
      radius: Math.random() * 2,
      color: "white",
      fades: false,
    })
  );
}

(function animate(): void {
  if (!game.active) return;

  requestAnimationFrame(animate);
  c.fillStyle = "#212529";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // player.draw();
  player.update();

  particles.forEach((particle: Particle, index: number) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.y = -particle.radius;
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(index, 1);
      }, 0);
    } else {
      particle.update();
    }
  });
  // console.log("particles:", particles);

  invaderProjectiles.forEach((invaderProjectile: InvaderProjectile, index: number) => {
    if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else invaderProjectile.update();

    //* Projectile hits player
    if (
      rectangularCollision({
        rectangle1: invaderProjectile,
        rectangle2: player,
      })
    ) {
      // console.log("You Lose!");
      setTimeout(() => {
        invaderProjectiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);

      setTimeout(() => {
        game.active = false;
      }, 2000);

      createParticles({ object: player, fades: true, color: "whitesmoke" });
      // endGame()
    }
  });

  //* Projectiles his enemy
  projectiles.forEach((projectile: Projectile, index: number) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });

  // invader.update({ velocity: { x: 0, y: 0 } });
  grids.forEach((grid: Grid, gridIndex: number) => {
    grid.update();

    //* Spawn projectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
    }

    grid.invaders.forEach((invader: Invader, index: number) => {
      invader.update({ velocity: grid.velocity });

      projectiles.forEach((projectile: Projectile, jIndex: number) => {
        if (
          projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFound = grid.invaders.find((invader2: Invader) => invader2 === invader) as Invader;
            const projectileFound = projectiles.find((projectile2: Projectile) => projectile2 === projectile) as Projectile;

            //* Remove invader and projectile
            if (invaderFound && projectileFound) {
              score += 100;
              // console.log("score:", score);
              scoreEl.innerText = String(score);

              //* Dynamic score labels
              createScoreLabel({ object: invader });
              createParticles({ object: invader, fades: true });

              grid.invaders.splice(index, 1);
              projectiles.splice(jIndex, 1);

              if (grid.invaders.length > 0) {
                const firstInvader: Invader = grid.invaders[0];
                const lastInvader: Invader = grid.invaders[grid.invaders.length - 1];

                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grids.splice(gridIndex, 1);
              }
            }
          }, 0);
        }
      });
    });
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

  //* Spawning enemies
  if (frames % randomInterval === 0) {
    grids.push(new Grid());
    randomInterval = Math.floor(Math.random() * 500 + 500);
    frames = 0;
  }

  frames++;
  // console.log("frames:", frames);
})();
// animate();

// window.addEventListener("keydown", (event: KeyboardEvent): void => {
//   console.log("event.key:", event.key);
// });

window.addEventListener("keydown", ({ key }: { key: string }): void => {
  // console.log("key:", key);
  if (game.over) return;

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
          velocity: { x: 0, y: -15 },
          color: "orangered",
        })
      );
      // console.log("projectiles:", projectiles);
      break;
  }
});

window.addEventListener("keyup", ({ key }: { key: string }): void => {
  // console.log("key:", key);

  if (game.over) return;

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
