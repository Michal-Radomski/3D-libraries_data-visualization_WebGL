//* V2
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";

const Scene = (): React.JSX.Element => {
  const { position, color, wireframe, scale } = useControls("cube", {
    position: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      min: -10,
      max: 10,
      step: 0.01,
    },
    color: "#ffffff",
    wireframe: false,
    click: button((): void => {
      console.log("Clicked");
    }),
    scale: { options: [1, 2, 3] },
  });
  console.log("scale:", scale);

  const sphereTweak = useControls("sphere", {
    xRotation: 0,
  });
  console.log("sphereTweak:", sphereTweak);

  return (
    <React.Fragment>
      <OrbitControls />

      <ambientLight />
      <directionalLight position={[0, 2, 4]} />

      <mesh position={[position.x, position.y, position.z]} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color={color} wireframe={wireframe} />
      </mesh>
    </React.Fragment>
  );
};

export default Scene;

//* V1
// import React from "react";
// import {
//   useFrame,
//   // extend, //* V1
//   useThree,
//   RootState,
//   useLoader,
// } from "@react-three/fiber";
// import * as THREE from "three";
// // import { OrbitControls } from "three/examples/jsm/Addons.js"; //* V1
// // extend({ OrbitControls: OrbitControls }); //* V1
// import { OrbitControls } from "@react-three/drei"; //* V2

// import Custom from "./Custom";
// import Particles from "./Particles";
// import Model from "./Model";
// import { Bike } from "./Bike";

// const Scene = (): React.JSX.Element => {
//   const texture: THREE.Texture = useLoader(THREE.TextureLoader, "./img/1.png");
//   // console.log("texture:", texture);

//   const cubeRef =
//     React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>>(
//       null
//     );

//   const planeRef =
//     React.useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>>(
//       null
//     );

//   const { gl, camera } = useThree();
//   console.log("gl:", gl);
//   console.log("camera:", camera);
//   // camera.position.x = 5;

//   //* Equivalent of animate function
//   useFrame((state: RootState, delta: number): void => {
//     cubeRef.current!.rotation.y += delta;
//     planeRef.current!.rotation.y += delta;
//     state.camera.position.x = Math.sin(state.clock.elapsedTime);
//     // console.log("state.clock.elapsedTime:", state.clock.elapsedTime);
//   });

//   return (
//     <React.Fragment>
//       {/* //* V1 */}
//       {/* <orbitControls args={[camera, gl.domElement]} /> */}
//       {/* //* V2 */}
//       <OrbitControls />

//       <Custom />
//       <Particles />

//       <axesHelper args={[3]} />
//       <gridHelper args={[20, 20, 0xff0000, "cyan"]} />

//       <group>
//         <mesh ref={planeRef} position-x={-2}>
//           <planeGeometry args={[4, 4]} />
//           <meshBasicMaterial color="orange" side={THREE.DoubleSide} wireframe={false} map={texture} />
//         </mesh>

//         <mesh ref={cubeRef} position={[2, 0, 0]} scale={[1, 1, 1]}>
//           <boxGeometry args={[2, 2, 2, 2, 2, 2]} />
//           <meshBasicMaterial color="#7A00CA" wireframe={true} />
//         </mesh>
//       </group>

//       <React.Suspense
//         fallback={
//           <mesh scale-y={2}>
//             <boxGeometry />
//             <meshBasicMaterial wireframe={true} />
//           </mesh>
//         }
//       >
//         <Model />
//         <Bike scale={0.85} position={[-0.5, 0.75, 0]} />
//       </React.Suspense>
//     </React.Fragment>
//   );
// };

// export default Scene;
