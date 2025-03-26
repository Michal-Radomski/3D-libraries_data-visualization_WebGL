import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// console.log("gsap:", gsap);
// console.log("ScrollTrigger:", ScrollTrigger);

import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector("div.block.b2 h2") as HTMLHeadElement;
// console.log("header:", header);

gsap.from(header, {
  duration: 1,
  autoAlpha: 0,
  y: 100,
  scale: 0.5,
  scrollTrigger: {
    trigger: header,
    markers: true,
    // Trigger Scroller
    // start: "top bottom-=200",
    start: "top 50%",
    end: "bottom+=10% top",
    // scrub: true,
    scrub: 1,
  },
});

ScrollTrigger.create({
  trigger: ".b2",
  pin: true,
  markers: true,
  end: "bottom 50%",
});
