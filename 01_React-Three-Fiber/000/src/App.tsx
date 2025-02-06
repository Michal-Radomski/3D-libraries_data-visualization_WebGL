import React from "react";

import "./App.scss";
import SpringComponent from "./SpringComponent";
import GsapComponent from "./GsapComponent";
import CesiumComponent from "./CesiumComponent";
import FramerMotionComponent from "./FramerMotionComponent";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <SpringComponent />
      <br />
      <GsapComponent />
      <br />
      <FramerMotionComponent />
      <br />
      <CesiumComponent />
    </React.Fragment>
  );
};

export default App;
