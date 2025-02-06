import React from "react";
import { motion } from "framer-motion";

const DivComp = (): React.JSX.Element => <div>DivComp</div>;

//* License: MIT
const FramerMotionComponent = (): React.JSX.Element => {
  const animate = { x: [50, 150, 50], opacity: 1, scale: 1 };
  const transition = {
    duration: 5,
    delay: 0.3,
    ease: [0.5, 0.71, 1, 1.5],
  };
  const initial = { opacity: 0, scale: 0.5 };
  const whileHover = { scale: 1.2 };

  return (
    <React.Fragment>
      FramerMotionComponent
      <motion.h1 animate={animate} transition={transition} initial={initial} whileHover={whileHover}>
        Animation made easy with Framer Motion
      </motion.h1>
      <motion.div animate={animate} transition={transition} initial={initial} whileHover={whileHover}>
        <DivComp />
      </motion.div>
    </React.Fragment>
  );
};

export default FramerMotionComponent;
