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
        camera={{
          fov: 75,
          near: 0.1,
          far: 100,
          position: [2, 2, 5],
        }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />

        <Scene />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
