import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Stats, StatsGl } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

import "./App.scss";
// import Box from "./Box";
import Polyhedron from "./Polyhedron";
import { PolyhedronArr } from "./Types";
// import TorusComponent from "./TorusComponent";
// import Example from "./Example";

const App = (): React.JSX.Element => {
  // const color = useControls({
  //   value: "green",
  // });

  const options = React.useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: "orange" },
    };
  }, []);

  const pA = useControls("Polyhedron A", options);
  const pB = useControls("Polyhedron B", options);

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

        {/* <TorusComponent /> */}

        <Polyhedron
          position={[-0.75, -0.75, 0]}
          polyhedron={polyhedron}
          rotation={[pA.x, pA.y, pA.z]}
          visible={pA.visible}
          color={pA.color}
        />
        <Polyhedron
          position={[0.75, -0.75, 0]}
          polyhedron={polyhedron}
          rotation={[pB.x, pB.y, pB.z]}
          visible={pB.visible}
          color={pB.color}
        />
        <Polyhedron position={[-0.75, 0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, 0.75, 0]} polyhedron={polyhedron} />

        <Stats />
        <StatsGl />
        <Perf position="top-right" />
        <OrbitControls
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          enableDamping={false}
        />
        {/* <PointerLockControls /> */}
        <axesHelper args={[2]} />
        <gridHelper rotation-x={Math.PI / 4} />
        {/* <gridHelper args={[20, 20, 0xff0000, "teal"]} /> */}

        {/* <color attach="background" args={[color.value]} /> */}
      </Canvas>
    </React.Fragment>
  );
};

export default App;
