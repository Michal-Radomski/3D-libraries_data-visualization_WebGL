import gsap from "gsap";
// console.log("gsap:", gsap);

import "./style.scss";

const img1 = document.querySelector(".img1") as HTMLImageElement;
const h1 = document.querySelector("h1") as HTMLHeadElement;

gsap.to(img1, { x: 100, y: 100, duration: 2, backgroundColor: "red", rotation: 45 });
gsap.to(h1, { x: 100, y: 100, duration: 2, backgroundColor: "red", rotation: 45 });
