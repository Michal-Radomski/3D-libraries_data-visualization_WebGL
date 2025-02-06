import React from "react";

import "./App.scss";
import Example from "./Example";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Example />
      {/* <mesh>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh> */}
    </React.Fragment>
  );
};

export default App;
