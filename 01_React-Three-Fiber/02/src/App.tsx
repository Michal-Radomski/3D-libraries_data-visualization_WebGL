//* V5
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Stats, Environment, Center } from "@react-three/drei";

import "./App.scss";
import Button from "./Button";

const vec: Vector3 = new Vector3();
// console.log("vec:", vec);

function Rig(): null {
  return useFrame(({ camera, pointer }) => {
    vec.set(pointer.x * 2, pointer.y * 2, camera.position.z);
    camera.position.lerp(vec, 0.025);
    camera.lookAt(0, 0, 0);
  });
}

const App = (): React.JSX.Element => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Environment preset="forest" background={true} />
      <Center>
        {[...Array(5).keys()].map((x: number) =>
          [...Array(3).keys()].map((y: number) => <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />)
        )}
      </Center>
      <Rig />
      <Stats />
    </Canvas>
  );
};

export default App;

// //* V4
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

// import { Shoe } from "./Shoe";
// import "./App.scss";

// const App = (): React.JSX.Element => {
//   return (
//     <React.Fragment>
//       <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
//         <Environment preset="forest" />
//         <Shoe />
//         <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
//         <OrbitControls autoRotate />
//       </Canvas>
//     </React.Fragment>
//   );
// };

// export default App;

// //* V3
// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { Stats, OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
// import { useControls } from "leva";
// import { Group, Object3D, Object3DEventMap } from "three";

// import "./App.scss";
// import Models from "./models.json";

// // interface ModelI {
// //   title: string;
// //   url: string;
// // }

// // const Models: ModelI[] = [
// //   { title: "Hammer", url: "/models/hammer.glb" },
// //   { title: "Drill", url: "/models/drill.glb" },
// //   { title: "Tape Measure", url: "/models/tapeMeasure.glb" },
// // ];

// interface Cache {
//   [key: string]: React.JSX.Element;
// }

// function Model({ url }: { url: string }): React.JSX.Element {
//   //* It defaults to CDN loaded draco binaries (https://www.gstatic.com/draco/v1/decoders/) which are only loaded for compressed models.
//   const { scene }: { scene: Group<Object3DEventMap> } = useGLTF(url);
//   // console.log("scene:", scene);

//   const [cache, setCache] = React.useState<Cache>({} as Cache);
//   // console.log("cache:", cache);

//   if (!cache[url]) {
//     const annotations = [] as React.JSX.Element[];

//     scene.traverse((obj: Object3D<Object3DEventMap>): void => {
//       if (obj.userData.prop) {
//         // console.log("obj.userData.prop", obj.userData.prop);
//         annotations.push(
//           <Html
//             key={obj.uuid}
//             position={[obj.position.x, obj.position.y, obj.position.z]}
//             distanceFactor={0.25}
//             occlude={false}
//             transform={false}
//           >
//             <div className="annotation">{obj.userData.prop}</div>
//           </Html>
//         );
//       }
//     });
//     // console.log("annotations:", annotations);

//     console.log("Caching JSX for url " + url);
//     setCache({
//       ...cache,
//       [url]: <primitive object={scene}>{annotations}</primitive>,
//     });
//   }
//   return cache[url];
// }

// const App = (): React.JSX.Element => {
//   // const { title }: { title: string } = useControls({
//   //   title: {
//   //     options: Models.map(({ title }: { title: string }) => title),
//   //   },
//   // });

//   const { model }: { model: string } = useControls({
//     model: {
//       value: "hammer",
//       options: Object.keys(Models),
//     },
//   });

//   return (
//     <React.Fragment>
//       {/* <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
//         <Environment files="/img/workshop_1k.hdr" background={true} />
//         <group>
//           <Model url={Models[Models.findIndex((model: ModelI) => model.title === title)].url} />
//         </group>
//         <OrbitControls autoRotate={true} />
//         <Stats />
//       </Canvas>
//       <span id="info">The {title} is selected.</span> */}
//       <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
//         <Environment files="/img/workshop_1k.hdr" background />
//         <group>
//           <Model url={Models[model as keyof typeof Models]} />
//         </group>
//         <OrbitControls autoRotate />
//         <Stats />
//       </Canvas>
//       <span id="info">The {model.replace(/([A-Z])/g, " $1").toLowerCase()} is selected.</span>
//     </React.Fragment>
//   );
// };

// export default App;

//* V2
// import React from "react";
// import { Stats, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { Leva, useControls } from "leva";
// import { Group, Object3DEventMap } from "three";

// import "./App.scss";

// const Model = (): React.JSX.Element => {
//   const { scene }: { scene: Group<Object3DEventMap> } = useLoader(GLTFLoader, "/scene.glb");
//   // console.log("scene:", scene);

//   const { x, y, z, visible, color, metalness, roughness, clearcoat, clearcoatRoughness, transmission, ior, thickness } =
//     useControls("Suzanne", {
//       x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
//       y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
//       z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
//       visible: true,
//       color: { value: "#ffbc85" },
//       metalness: { value: 0, min: 0, max: 1.0, step: 0.01 },
//       roughness: { value: 0, min: 0, max: 1.0, step: 0.01 },
//       clearcoat: { value: 1, min: 0, max: 1.0, step: 0.01 },
//       clearcoatRoughness: { value: 0, min: 0, max: 1.0, step: 0.01 },
//       transmission: { value: 1.0, min: 0, max: 1.0, step: 0.01 },
//       ior: { value: 1.74, min: 1, max: 5, step: 0.01 },
//       thickness: { value: 3.12, min: 0, max: 5, step: 0.01 },
//     });

//   return (
//     <primitive
//       object={scene}
//       children-0-rotation={[x, y, z]}
//       children-0-visible={visible}
//       children-0-material-color={color}
//       children-0-material-metalness={metalness}
//       children-0-material-roughness={roughness}
//       children-0-material-clearcoat={clearcoat}
//       children-0-material-clearcoatRoughness={clearcoatRoughness}
//       children-0-material-transmission={transmission}
//       children-0-material-ior={ior}
//       children-0-material-thickness={thickness}
//     />
//   );
// };

// const Env = (): React.JSX.Element => {
//   const { height, radius, scale } = useControls("Ground", {
//     height: { value: 10, min: 0, max: 100, step: 1 },
//     radius: { value: 115, min: 0, max: 1000, step: 1 },
//     scale: { value: 100, min: 0, max: 1000, step: 1 },
//   });
//   return (
//     <Environment
//       preset="sunset"
//       background
//       ground={{
//         height: height,
//         radius: radius,
//         scale: scale,
//       }}
//     />
//   );
// };

// const App = (): React.JSX.Element => {
//   return (
//     <React.Fragment>
//       <Canvas camera={{ position: [-8, 5, 8] }}>
//         <Env />
//         <Model />
//         <ContactShadows scale={150} position={[0.33, -0.33, 0.33]} opacity={1.5} />
//         <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
//         <Stats />
//       </Canvas>
//       <Leva collapsed={true} />
//     </React.Fragment>
//   );
// };

// export default App;

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
