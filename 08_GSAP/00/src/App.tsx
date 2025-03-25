import gsap from "gsap";
import React from "react";

const App = (): React.JSX.Element => {
  const leftAnimationRef = React.useRef<HTMLHeadingElement>(null);
  const rightAnimationRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    // Animate elements using GSAP
    gsap.fromTo(
      leftAnimationRef.current,
      { x: -100 }, // Start position
      { x: 0, duration: 3 } // End position and animation duration
    );

    gsap.fromTo(
      rightAnimationRef.current,
      { x: 100 }, // Start position
      { x: 0, duration: 3 } // End position and animation duration
    );
  }, []);

  return (
    <div>
      <h1 ref={leftAnimationRef}>Left Animation</h1>
      <h1 ref={rightAnimationRef}>Right Animation</h1>
    </div>
  );
};

export default App;
