import React from "react";

import "./App.scss";
import SpringComponent from "./SpringComponent";
import GSAPComponent from "./GSAPComponent";
import CesiumWitResiumComponent from "./CesiumWitResiumComponent";
import FramerMotionComponent from "./FramerMotionComponent";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      {/* <SpringComponent />
      <br />
      <FramerMotionComponent />
      <br />

      <GSAPComponent />
      <br /> */}

      <CesiumWitResiumComponent />
    </React.Fragment>
  );
};

export default App;
