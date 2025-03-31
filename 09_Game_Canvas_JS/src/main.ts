import "./style.scss";
import { Grid } from "./classes/Grid";
import { Invader } from "./classes/Invader";
import { InvaderProjectile } from "./classes/InvaderProjectile";
import { Player } from "./classes/Player";
import { Projectile } from "./classes/Projectile";
import { createParticles, createScoreLabel, randomBetween, rectangularCollision } from "./utils";
import { Particle } from "./classes/Particle";
import { Bomb } from "./classes/Bomb";
import { PowerUp } from "./classes/PowerUp";

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

let spawnBuffer: number = 500;
const fps: number = 60;
const fpsInterval: number = 1000 / fps;
const msPrev: number = window.performance.now();
console.log({ fpsInterval, msPrev });

export const player: Player = new Player();
// console.log("player:", player);
// player.draw();

const projectiles: Projectile[] = [];
// const invader: Invader = new Invader({ position: { x: 100, y: 100 } });
// const grids: Grid[] = [new Grid()];
const grids: Grid[] = [];
const invaderProjectiles: InvaderProjectile[] = [];
export const particles = [] as Particle[];
// const bombs = [
//   new Bomb({
//     position: { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
//     velocity: { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 },
//   }),
//   new Bomb({
//     position: { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
//     velocity: { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 },
//   }),
// ] as Bomb[];
const bombs = [] as Bomb[];
const powerUps = [] as PowerUp[];

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

const endGame = (): void => {
  // console.log("You Lose!");
  // audio.gameOver.play();

  //* Makes player disappear
  setTimeout(() => {
    player.opacity = 0;
    game.over = true;
  }, 0);

  //* Stops game altogether
  setTimeout(() => {
    game.active = false;
    // (document.querySelector("#restartScreen") as HTMLDivElement).style.display = "flex";
    // (document.querySelector("#finalScore") as HTMLHeadingElement).innerText = String(score);
  }, 2000);

  createParticles({
    object: player,
    fades: true,
    color: "whitesmoke",
  });
};

(function animate(): void {
  if (!game.active) return;

  requestAnimationFrame(animate);
  c.fillStyle = "#212529";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // player.draw();
  player.update();

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp: PowerUp = powerUps[i];

    if (powerUp.position.x - powerUp.radius >= canvas.width) {
      powerUps.splice(i, 1);
    } else powerUp.update();
  }

  //* Spawn PowerUps
  if (frames % 500 === 0) {
    powerUps.push(
      new PowerUp({
        position: {
          x: 0,
          y: Math.random() * 300 + 15,
        },
        velocity: {
          x: 5,
          y: 0,
        },
      })
    );
  }

  //* Spawn bombs
  if (frames % 200 === 0 && bombs.length < 3) {
    bombs.push(
      new Bomb({
        position: {
          x: randomBetween(Bomb.radius, canvas.width - Bomb.radius),
          y: randomBetween(Bomb.radius, canvas.height - Bomb.radius),
        },
        velocity: {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
        },
      })
    );
  }

  for (let i = bombs.length - 1; i >= 0; i--) {
    const bomb: Bomb = bombs[i];
    // console.log("bomb:", bomb);

    if (bomb.opacity <= 0) {
      bombs.splice(i, 1);
    } else bomb.update();
  }

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
    if (rectangularCollision({ rectangle1: invaderProjectile, rectangle2: player })) {
      invaderProjectiles.splice(index, 1);
      endGame();
    }
  });

  //* Projectiles hits enemy
  // projectiles.forEach((projectile: Projectile, index: number) => {
  //   if (projectile.position.y + projectile.radius <= 0) {
  //     setTimeout(() => {
  //       projectiles.splice(index, 1);
  //     }, 0);
  //   } else {
  //     projectile.update();
  //   }
  // });
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile: Projectile = projectiles[i];

    for (let j = bombs.length - 1; j >= 0; j--) {
      const bomb: Bomb = bombs[j];

      //* If projectile touches bomb, remove projectile
      if (
        Math.hypot(projectile.position.x - bomb.position.x, projectile.position.y - bomb.position.y) <
          projectile.radius + Bomb.radius &&
        !bomb.active
      ) {
        projectiles.splice(i, 1);
        bomb.explode();
      }
    }

    if (projectile.position.y + projectile.radius <= 0) {
      projectiles.splice(i, 1);
    } else {
      projectile.update();
    }

    for (let j = powerUps.length - 1; j >= 0; j--) {
      const powerUp: PowerUp = powerUps[j];

      //* If projectile touches bomb, remove projectile
      if (
        Math.hypot(projectile.position.x - powerUp.position.x, projectile.position.y - powerUp.position.y) <
        projectile.radius + powerUp.radius
      ) {
        projectiles.splice(i, 1);
        powerUps.splice(j, 1);
        player.powerUp = "MachineGun";
        console.log("PowerUp started");
        // audio.bonus.play();

        setTimeout(() => {
          player.powerUp = null;
          console.log("PowerUp ended");
        }, 5000);
      }
    }

    if (projectile.position.y + projectile.radius <= 0) {
      projectiles.splice(i, 1);
    } else {
      projectile.update();
    }
  }

  grids.forEach((grid: Grid, gridIndex: number) => {
    grid.update();

    //* Spawn projectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
    }

    for (let index = grid.invaders.length - 1; index >= 0; index--) {
      const invader: Invader = grid.invaders[index];
      // if (!invader.position) console.log("invader.position:", invader.position);
      invader.update({ velocity: grid.velocity });

      for (let j = bombs.length - 1; j >= 0; j--) {
        const bomb: Bomb = bombs[j];
        const invaderRadius: number = 15;

        //* If bomb touches invader, remove invader
        if (
          Math.hypot(invader?.position?.x - bomb?.position?.x, invader?.position?.y - bomb.position.y) <
            invaderRadius + Bomb.radius &&
          bomb.active
        ) {
          score += 50;
          scoreEl.innerHTML = String(score);

          grid.invaders.splice(index, 1);
          createScoreLabel({
            object: invader,
            score: 50,
          });

          createParticles({
            object: invader,
            fades: true,
          });
        }
      }

      //* Projectiles hit enemy
      projectiles.forEach((projectile: Projectile, jIndex: number) => {
        if (
          projectile?.position?.y - projectile?.radius <= invader?.position?.y + invader?.height &&
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

      //* Remove player if invaders touch it
      if (rectangularCollision({ rectangle1: invader, rectangle2: player }) && !game.over) {
        endGame();
      }
    }
  }); //* End looping over grid.invaders

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
    spawnBuffer = spawnBuffer < 0 ? 100 : spawnBuffer;
    grids.push(new Grid());
    randomInterval = Math.floor(Math.random() * 500 + spawnBuffer);
    frames = 0;
    spawnBuffer -= 100;
  }

  if (keys.space.pressed && player.powerUp === "MachineGun" && frames % 2 === 0 && !game.over) {
    projectiles.push(
      new Projectile({
        position: { x: player?.position?.x + player?.width! / 2, y: player?.position?.y },
        velocity: { x: 0, y: -10 },
        color: "orange",
      })
    );
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

      if (player.powerUp === "MachineGun") return;

      // audio.shoot.play()

      projectiles.push(
        new Projectile({
          position: { x: player.position.x + player.width! / 2, y: player.position.y },
          velocity: { x: 0, y: -10 },
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
