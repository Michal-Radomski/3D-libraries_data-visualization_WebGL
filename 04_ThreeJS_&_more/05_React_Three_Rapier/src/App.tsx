import React from "react";
import { Canvas } from "@react-three/fiber";

import "./App.scss";
import Scene from "./Scene";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Canvas
        gl={{
          antialias: true, //* default: true
          alpha: true, //* default: true
        }}
        shadows={true}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 7, 20],
        }}
      >
        <Scene />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
