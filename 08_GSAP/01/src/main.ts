import gsap from "gsap";
// console.log("gsap:", gsap);

import "./style.scss";

const img1 = document.querySelector(".img1") as HTMLImageElement;
// const h1 = document.querySelector("h1") as HTMLHeadElement;

//* Basics
// gsap.to(img1, { x: 100, y: 100, duration: 2, backgroundColor: "red", rotation: 45 });
// gsap.to(h1, { x: 100, y: 100, duration: 2, backgroundColor: "red", rotation: 45 });

// document.querySelector(".btn")?.addEventListener("click", () => {
//   gsap.from(img1, { y: -300, opacity: 0, duration: 2, autoAlpha: 0 }); //* No flash effect (visibility: hidden)!
// });

// document.querySelector(".btn")?.addEventListener("click", () => {
//   gsap.fromTo(img1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }); //* No flash effect (visibility: hidden)!
// });

// gsap.from(img1, {
//   // gsap.from("img", {
//   y: -300,
//   duration: 2,
//   autoAlpha: 0,
//   rotation: 90,
//   // ease: "power4.out",
//   ease: "back.out(3.9)",
//   paused: false,
//   delay: 0.5,
//   repeat: 1, //* 1 move + 1 repeating
//   yoyo: false,
//   // stagger: {
//   //   each: 0.5,
//   // },
//   stagger: (index) => {
//     console.log({ index });
//     return index;
//   },
// });

// gsap.to(".btn", {
//   duration: 0.5,
//   stagger: 0.2,
//   x: "random(-100,100)",
// });

// gsap.to(img1, {
//   keyframes: [
//     { duration: 0.3, x: 100 },
//     { duration: 0.3, y: 100 },
//     { duration: 0.3, x: 200 },
//     { duration: 0.3, y: 200 },
//   ],
// });

// gsap.to(img1, {
//   x: 100,
//   duration: 1,
//   repeat: 1,
//   onComplete: (): void => console.log("Complete"),
//   onStart: (): void => console.log("Start"),
//   onUpdate: (): void => console.log("Update"),
//   onRepeat: (): void => console.log("Repeat"),
// });

// gsap.registerEffect({
//   name: "imgAnimation",
//   effect: (targets: gsap.TweenTarget, config: { duration: number }): gsap.core.Tween => {
//     return gsap.to(targets, { duration: config.duration, y: 200, scale: 1.4, rotation: 350 });
//   },
//   defaults: { duration: 5 },
// });

// gsap.effects.imgAnimation(img1, { duration: 5 });
// gsap.effects.imgAnimation(".img2", { duration: 2.5 });

// gsap.set(img1, { opacity: 0.2 });

// const tween: gsap.core.Tween = gsap.to(img1, { y: 200, paused: true });

// tween.kill();
// tween.delay(1);
// tween.duration(5);

// setTimeout(() => {
//   tween.resume();
// }, 2000);

//* Timeline
const TL: gsap.core.Timeline = gsap.timeline();
// console.log("TL:", TL);

TL.from(img1, { autoAlpha: 0, duration: 1, y: -50 })
  .from(".img2", { autoAlpha: 0, duration: 1, y: -50 })
  .from(".img3", { autoAlpha: 0, duration: 1, y: -50 });
