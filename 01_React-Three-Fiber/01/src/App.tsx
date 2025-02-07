import React from "react";
import { Canvas } from "@react-three/fiber";

import "./App.scss";
import Box from "./Box";
// import Example from "./Example";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Canvas camera={{ position: [0, 0, 2] }}>
        {/* <Example /> */}
        <Box position={[-0.75, 0, 0]} name="A" wireframe={false} />
        <Box position={[0.75, 0, 0]} name="B" wireframe={true} />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
