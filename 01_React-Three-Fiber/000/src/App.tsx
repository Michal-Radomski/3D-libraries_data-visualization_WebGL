import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import "./App.scss";

const App = (): React.JSX.Element => {
  //* Example 1
  const appRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // GSAP animation to rotate the div
    gsap.to(appRef.current, { rotate: 360, duration: 5 });
  }, []);

  //* Example 2
  const container = React.useRef<HTMLDivElement>(null);

  const tl = React.useRef<gsap.core.Timeline>(null);
  // console.log("tl:", tl);

  const toggleTimeline = (): void => {
    tl.current?.reversed(!tl.current?.reversed());
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".box") as HTMLDivElement[];
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, "<")
        .to(boxes[2], { y: -166 })
        .reverse();
    },
    { scope: container }
  );

  return (
    <React.Fragment>
      <div
        ref={appRef}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Hello World
      </div>

      <br />

      <main>
        <section className="boxes-container" ref={container}>
          <h2>Use the button to toggle a Timeline</h2>
          <div>
            <button onClick={toggleTimeline}>Toggle Timeline</button>
          </div>
          <div className="box gradient-blue">Box 1</div>
          <div className="box gradient-blue">Box 2</div>
          <div className="box gradient-blue">Box 3</div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default App;
