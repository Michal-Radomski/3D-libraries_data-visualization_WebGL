import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";
import Work from "./pages/Work";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
