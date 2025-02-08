import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Stats, StatsGl } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

import "./App.scss";
// import Box from "./Box";
import Polyhedron from "./Polyhedron";
import { PolyhedronArr } from "./Types";
import Floor from "./Floor";
// import TorusComponent from "./TorusComponent";
// import Example from "./Example";

const App = (): React.JSX.Element => {
  const texture: THREE.Texture = useLoader(THREE.TextureLoader, "./grid.png");

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
        camera={{ position: [4, 4, 1.5] }}
        shadows={true}
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
          material={new THREE.MeshBasicMaterial({ map: texture })}
        />
        <Polyhedron
          name="meshNormalMaterial"
          position={[0.75, -0.75, 0]}
          polyhedron={polyhedron}
          rotation={[pB.x, pB.y, pB.z]}
          visible={pB.visible}
          color={pB.color}
          material={
            new THREE.MeshNormalMaterial({
              flatShading: true,
            })
          }
        />
        <Polyhedron
          position={[-0.75, 0.75, 0]}
          polyhedron={polyhedron}
          name="meshPhongMaterial"
          material={
            new THREE.MeshPhongMaterial({
              flatShading: true,
              map: texture,
            })
          }
        />
        <Polyhedron
          position={[0.75, 0.75, 0]}
          polyhedron={polyhedron}
          name="meshStandardMaterial"
          material={
            new THREE.MeshStandardMaterial({
              flatShading: true,
              map: texture,
            })
          }
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
        {/* <gridHelper rotation-x={Math.PI / 4} /> */}
        {/* <gridHelper args={[20, 20, 0xff0000, "teal"]} /> */}

        {/* <color attach="background" args={[color.value]} /> */}
        <Floor />
      </Canvas>
    </React.Fragment>
  );
};

export default App;

// function Lights(): React.JSX.Element {
//   const ambientRef = React.useRef<THREE.AmbientLight>(null);
//   const directionalRef = React.useRef<THREE.DirectionalLight>(null);
//   const pointRef = React.useRef<THREE.PointLight>(null);
//   const spotRef = React.useRef<THREE.SpotLight>(null);

//   useControls("Ambient Light", {
//     visible: {
//       value: false,
//       onChange: (v) => {
//         ambientRef.current!.visible = v;
//       },
//     },
//     color: {
//       value: "white",
//       onChange: (v) => {
//         ambientRef.current!.color = new THREE.Color(v);
//       },
//     },
//   });

//   useControls("Directional Light", {
//     visible: {
//       value: true,
//       onChange: (v) => {
//         directionalRef.current!.visible = v;
//       },
//     },
//     // position: {
//     //   x: 1,
//     //   y: 1,
//     //   z: 1,
//     //   onChange: (v) => {
//     //     directionalRef.current!.position.copy(v)
//     //   },
//     // },
//     position: [1, 1, 1],
//     color: {
//       value: "white",
//       onChange: (v) => {
//         directionalRef.current!.color = new THREE.Color(v);
//       },
//     },
//   });

//   useControls("Point Light", {
//     visible: {
//       value: false,
//       onChange: (v) => {
//         pointRef.current!.visible = v;
//       },
//     },
//     // position: {
//     //   x: 2,
//     //   y: 0,
//     //   z: 0,
//     //   onChange: (v) => {
//     //     pointRef.current!.position.copy(v)
//     //   },
//     // },
//     position: [2, 0, 0],
//     color: {
//       value: "white",
//       onChange: (v) => {
//         pointRef.current!.color = new THREE.Color(v);
//       },
//     },
//   });

//   useControls("Spot Light", {
//     visible: {
//       value: false,
//       onChange: (v) => {
//         spotRef.current!.visible = v;
//       },
//     },
//     // position: {
//     //   x: 3,
//     //   y: 2.5,
//     //   z: 1,
//     //   onChange: (v) => {
//     //     spotRef.current!.position.copy(v)
//     //   },
//     // },
//     position: [3, 2.5, 1],
//     color: {
//       value: "white",
//       onChange: (v) => {
//         spotRef.current!.color = new THREE.Color(v);
//       },
//     },
//   });

//   return (
//     <>
//       <ambientLight ref={ambientRef} />
//       <directionalLight ref={directionalRef} />
//       <pointLight ref={pointRef} />
//       <spotLight ref={spotRef} />
//     </>
//   );
// }

// function Lights(): React.JSX.Element {
//   const ambientCtl = useControls("Ambient Light", {
//     visible: false,
//     intensity: {
//       value: 1.0,
//       min: 0,
//       max: 1.0,
//       step: 0.1,
//     },
//   });

//   const directionalCtl = useControls("Directional Light", {
//     visible: true,
//     position: {
//       x: 3.3,
//       y: 1.0,
//       z: 4.4,
//     },
//     castShadow: true,
//   });

//   const pointCtl = useControls("Point Light", {
//     visible: false,
//     position: {
//       x: 2,
//       y: 0,
//       z: 0,
//     },
//     castShadow: true,
//   });

//   const spotCtl = useControls("Spot Light", {
//     visible: false,
//     position: {
//       x: 3,
//       y: 2.5,
//       z: 1,
//     },
//     castShadow: true,
//   });

//   return (
//     <React.Fragment>
//       <ambientLight visible={ambientCtl.visible} intensity={ambientCtl.intensity} />
//       <directionalLight
//         visible={directionalCtl.visible}
//         position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
//         castShadow={directionalCtl.castShadow}
//       />
//       <pointLight
//         visible={pointCtl.visible}
//         position={[pointCtl.position.x, pointCtl.position.y, pointCtl.position.z]}
//         castShadow={pointCtl.castShadow}
//       />
//       <spotLight
//         visible={spotCtl.visible}
//         position={[spotCtl.position.x, spotCtl.position.y, spotCtl.position.z]}
//         castShadow={spotCtl.castShadow}
//       />
//     </React.Fragment>
//   );
// }

function Lights(): React.JSX.Element {
  const directionalRef = React.useRef<THREE.DirectionalLight>(null);

  useControls("Directional Light", {
    intensity: {
      value: 1,
      min: 0,
      max: 5,
      step: 0.1,
      onChange: (v) => {
        directionalRef.current!.intensity = v;
      },
    },
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
      // onChange: (v) => {
      //   directionalRef.current!.position.copy(v);
      // },
    },
  });

  return <directionalLight ref={directionalRef} castShadow />;
}
