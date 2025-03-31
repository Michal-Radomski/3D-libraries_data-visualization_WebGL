import { Howl, Howler } from "howler";

Howler.volume(0.5);
// console.log("Howl, Holer:", Howl, Howler);

export const audio = {
  backgroundMusic: new Howl({
    src: "./audio/backgroundMusic.wav",
    loop: true,
    html5: true,
  }),
  bomb: new Howl({
    src: "./audio/bomb.mp3",
    html5: true,
  }),
  bonus: new Howl({
    src: "./audio/bonus.mp3",
    html5: true,
    volume: 0.8,
  }),
  enemyShoot: new Howl({
    src: "./audio/enemyShoot.wav",
    html5: true,
  }),
  explode: new Howl({
    src: "./audio/explode.wav",
    html5: true,
  }),
  gameOver: new Howl({
    src: "./audio/gameOver.mp3",
    html5: true,
  }),
  select: new Howl({
    src: "./audio/select.mp3",
    html5: true,
  }),
  shoot: new Howl({
    src: "./audio/shoot.wav",
    html5: true,
  }),
  start: new Howl({
    src: "./audio/start.mp3",
    html5: true,
  }),
} as { [key: string]: Howl };
