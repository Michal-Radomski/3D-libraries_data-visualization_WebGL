import gsap from "gsap";
// console.log("gsap:", gsap);

import "./style.scss";

const img1 = document.querySelector(".img1") as HTMLImageElement;
const h1 = document.querySelector("h1") as HTMLHeadElement;

// gsap.to(img1, { x: 100, y: 100, duration: 2, backgroundColor: "red", rotation: 45 });
gsap.to(h1, { x: 100, y: 100, duration: 2, backgroundColor: "red", rotation: 45 });

// document.querySelector(".btn")?.addEventListener("click", () => {
//   gsap.from(img1, { y: -300, opacity: 0, duration: 2, autoAlpha: 0 }); //* No flash effect (visibility: hidden)!
// });

// document.querySelector(".btn")?.addEventListener("click", () => {
//   gsap.fromTo(img1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }); //* No flash effect (visibility: hidden)!
// });

gsap.from(img1, {
  y: -300,
  duration: 2,
  autoAlpha: 0,
  rotation: 90,
  // ease: "power4.out",
  ease: "back.out(3.9)",
});
