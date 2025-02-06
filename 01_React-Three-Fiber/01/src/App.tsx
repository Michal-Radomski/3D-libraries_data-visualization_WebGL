import React from "react";

import "./App.scss";
// import Example from "./Example";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      {/* <Example /> */}
      <mesh>
        <boxGeometry />
        <meshBasicMaterial
          // color={"#00ff00"}
          color={0x00ff00}
          wireframe={true}
        />
      </mesh>
    </React.Fragment>
  );
};

export default App;
