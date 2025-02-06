import React from "react";

import "./App.scss";
import SpringComponent from "./SpringComponent";
import GsapComponent from "./GsapComponent";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <SpringComponent />
      <GsapComponent />
    </React.Fragment>
  );
};

export default App;
