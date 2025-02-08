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
        camera={{ position: [-1, 4, 2.5] }}
        // frameloop="demand"
      >
        {/* <directionalLight position={[1, 1, 1]} /> */}
        <Lights />

        {/* <Example /> */}

        {/* <Box position={[-0.75, 0, 0]} name="A" wireframe={false} />
        <Box position={[0.75, 0, 0]} name="B" wireframe={true} /> */}

        {/* <TorusComponent /> */}

        <Polyhedron
          name="meshBasicMaterial"
          position={[-0.75, -0.75, 0]}
          polyhedron={polyhedron}
          rotation={[pA.x, pA.y, pA.z]}
          visible={pA.visible}
          color={pA.color}
          material={new THREE.MeshBasicMaterial()}
        />
        <Polyhedron
          name="meshNormalMaterial"
          position={[0.75, -0.75, 0]}
          polyhedron={polyhedron}
          rotation={[pB.x, pB.y, pB.z]}
          visible={pB.visible}
          color={pB.color}
          material={new THREE.MeshNormalMaterial()}
        />
        <Polyhedron
          position={[-0.75, 0.75, 0]}
          polyhedron={polyhedron}
          name="meshPhongMaterial"
          material={new THREE.MeshPhongMaterial()}
        />
        <Polyhedron
          position={[0.75, 0.75, 0]}
          polyhedron={polyhedron}
          name="meshStandardMaterial"
          material={new THREE.MeshStandardMaterial()}
        />

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

function Lights(): React.JSX.Element {
  const ambientRef = React.useRef<THREE.AmbientLight>(null);
  const directionalRef = React.useRef<THREE.DirectionalLight>(null);
  const pointRef = React.useRef<THREE.PointLight>(null);
  const spotRef = React.useRef<THREE.SpotLight>(null);

  useControls("Ambient Light", {
    visible: {
      value: false,
      onChange: (v) => {
        ambientRef.current!.visible = v;
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        ambientRef.current!.color = new THREE.Color(v);
      },
    },
  });

  useControls("Directional Light", {
    visible: {
      value: true,
      onChange: (v) => {
        directionalRef.current!.visible = v;
      },
    },
    // position: {
    //   x: 1,
    //   y: 1,
    //   z: 1,
    //   onChange: (v) => {
    //     directionalRef.current!.position.copy(v)
    //   },
    // },
    position: [1, 1, 1],
    color: {
      value: "white",
      onChange: (v) => {
        directionalRef.current!.color = new THREE.Color(v);
      },
    },
  });

  useControls("Point Light", {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current!.visible = v;
      },
    },
    // position: {
    //   x: 2,
    //   y: 0,
    //   z: 0,
    //   onChange: (v) => {
    //     pointRef.current!.position.copy(v)
    //   },
    // },
    position: [2, 0, 0],
    color: {
      value: "white",
      onChange: (v) => {
        pointRef.current!.color = new THREE.Color(v);
      },
    },
  });

  useControls("Spot Light", {
    visible: {
      value: false,
      onChange: (v) => {
        spotRef.current!.visible = v;
      },
    },
    // position: {
    //   x: 3,
    //   y: 2.5,
    //   z: 1,
    //   onChange: (v) => {
    //     spotRef.current!.position.copy(v)
    //   },
    // },
    position: [3, 2.5, 1],
    color: {
      value: "white",
      onChange: (v) => {
        spotRef.current!.color = new THREE.Color(v);
      },
    },
  });

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  );
}
