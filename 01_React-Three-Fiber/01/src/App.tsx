import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import "./App.scss";
// import Box from "./Box";
import Polyhedron from "./Polyhedron";
import { PolyhedronArr } from "./Types";
// import Example from "./Example";

const App = (): React.JSX.Element => {
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398),
  ] as PolyhedronArr;

  return (
    <React.Fragment>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        // frameloop="demand"
      >
        {/* <Example /> */}

        {/* <Box position={[-0.75, 0, 0]} name="A" wireframe={false} />
        <Box position={[0.75, 0, 0]} name="B" wireframe={true} /> */}

        <Polyhedron position={[-0.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[-0.75, 0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, 0.75, 0]} polyhedron={polyhedron} />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
