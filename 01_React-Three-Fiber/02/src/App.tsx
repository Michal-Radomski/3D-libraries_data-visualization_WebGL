//* V2
import React from "react";
import { Stats, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Leva, useControls } from "leva";
import { Group, Object3DEventMap } from "three";

import "./App.scss";

const Model = (): React.JSX.Element => {
  const { scene }: { scene: Group<Object3DEventMap> } = useLoader(GLTFLoader, "/scene.glb");

  const { x, y, z, visible, color, metalness, roughness, clearcoat, clearcoatRoughness, transmission, ior, thickness } =
    useControls("Suzanne", {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: "#ffbc85" },
      metalness: { value: 0, min: 0, max: 1.0, step: 0.01 },
      roughness: { value: 0, min: 0, max: 1.0, step: 0.01 },
      clearcoat: { value: 1, min: 0, max: 1.0, step: 0.01 },
      clearcoatRoughness: { value: 0, min: 0, max: 1.0, step: 0.01 },
      transmission: { value: 1.0, min: 0, max: 1.0, step: 0.01 },
      ior: { value: 1.74, min: 1, max: 5, step: 0.01 },
      thickness: { value: 3.12, min: 0, max: 5, step: 0.01 },
    });

  return (
    <primitive
      object={scene}
      children-0-rotation={[x, y, z]}
      children-0-visible={visible}
      children-0-material-color={color}
      children-0-material-metalness={metalness}
      children-0-material-roughness={roughness}
      children-0-material-clearcoat={clearcoat}
      children-0-material-clearcoatRoughness={clearcoatRoughness}
      children-0-material-transmission={transmission}
      children-0-material-ior={ior}
      children-0-material-thickness={thickness}
    />
  );
};

const Env = (): React.JSX.Element => {
  const { height, radius, scale } = useControls("Ground", {
    height: { value: 10, min: 0, max: 100, step: 1 },
    radius: { value: 115, min: 0, max: 1000, step: 1 },
    scale: { value: 100, min: 0, max: 1000, step: 1 },
  });
  return (
    <Environment
      preset="sunset"
      background
      ground={{
        height: height,
        radius: radius,
        scale: scale,
      }}
    />
  );
};

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Canvas camera={{ position: [-8, 5, 8] }}>
        <Env />
        <Model />
        <ContactShadows scale={150} position={[0.33, -0.33, 0.33]} opacity={1.5} />
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
        <Stats />
      </Canvas>
      <Leva collapsed={true} />
    </React.Fragment>
  );
};

export default App;

//* V1
// import React from "react";
// import { Canvas, ObjectMap, useLoader } from "@react-three/fiber";
// import { Environment, OrbitControls, Sphere, Stats } from "@react-three/drei";
// // import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";

// import "./App.scss";

// const App = (): React.JSX.Element => {
//   const gltf: GLTF & ObjectMap = useLoader(GLTFLoader, "./monkey.glb");
//   // console.log("gltf:", gltf);

//   return (
//     <React.Fragment>
//       <Canvas camera={{ position: [-0.5, 1, 2] }} shadows={true}>
//         <Environment
//           files="/forest_slope_1k.hdr"
//           // preset="forest"
//           background={true}
//           backgroundBlurriness={0.0}
//         />
//         <Sphere args={[0.25]} />
//         <directionalLight position={[3.3, 1.0, 4.4]} castShadow={true} intensity={Math.PI * 2} />
//         <primitive object={gltf.scene} position={[0, 1, 0]} children-0-castShadow={true} />
//         {/* <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow={true}>
//           <meshStandardMaterial />
//         </Circle> */}
//         <OrbitControls target={[0, 1, 0]} autoRotate={true} />
//         <axesHelper args={[5]} />
//         <Stats />
//       </Canvas>
//     </React.Fragment>
//   );
// };

// export default App;
