//* V3
import React from "react";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";

import { CustomElem } from "./Interfaces";

const PhysicsScene = (): CustomElem => {
  const cubeRef = React.useRef<RapierRigidBody>(null);
  const secondCubeRef = React.useRef<RapierRigidBody>(null);

  const cubeClickHandler = (): void => {
    cubeRef.current!.applyImpulse({ x: 1, y: 0, z: 0 }, true);
  };

  const secondCubeClickHandler = (): void => {
    secondCubeRef.current!.applyImpulse({ x: 8, y: 0, z: 0 }, true);
    // secondCubeRef.current!.applyTorqueImpulse({ x: 8, y: 0, z: 0 }, true);
  };

  return (
    <React.Fragment>
      <Physics>
        <RigidBody
          ref={cubeRef}
          onCollisionEnter={() => console.log("Collision Enter")}
          onCollisionExit={() => console.log("Collision Exit")}
          onSleep={() => console.log("sleeping")}
          onWake={() => console.log("wake")}
          gravityScale={1}
          restitution={0}
          friction={0}
        >
          <mesh castShadow={true} position={[1.5, 2.5, 0]} onClick={cubeClickHandler}>
            <boxGeometry />
            <meshStandardMaterial color="#CC3941" />
          </mesh>
        </RigidBody>

        <RigidBody ref={secondCubeRef}>
          <mesh castShadow={true} position={[-1.5, 2.5, 0]} onClick={secondCubeClickHandler}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" restitution={1} friction={0}>
          <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow>
            <boxGeometry args={[15, 15, 0.35]} />
            <meshStandardMaterial color="#C7CAC7" />
          </mesh>
        </RigidBody>
      </Physics>
    </React.Fragment>
  );
};

export default PhysicsScene;

//* V2
// import React from "react";
// import { Physics, RigidBody, CuboidCollider, CapsuleCollider } from "@react-three/rapier";

// import { CustomElem } from "./Interfaces";

// // https://pmndrs.github.io/react-three-rapier
// // https://rapier.rs/docs/user_guides/javascript/colliders

// const PhysicsScene = (): CustomElem => {
//   return (
//     <React.Fragment>
//       <Physics gravity={[0, -9.81, 0]} debug={true}>
//         <RigidBody colliders={false} position={[1.5, 1.5, 0]}>
//           <CuboidCollider args={[0.5, 0.5, 0.5]} />
//           {/* <CuboidCollider args={[0.25, 0.25, 0.25]} position={[-2, -1, -2.5]} /> */}
//           <mesh castShadow={true}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh>
//         </RigidBody>

//         <RigidBody colliders="trimesh">
//           <mesh position={[-1.5, 1.5, 0]}>
//             <torusKnotGeometry args={[0.5, 0.15, 100, 100]} />
//             <meshStandardMaterial color="orange" />
//           </mesh>
//         </RigidBody>

//         <RigidBody colliders={false} position={[0, 1.5, -1.5]}>
//           <CapsuleCollider args={[0.375, 0.6]} />
//           <mesh>
//             <sphereGeometry args={[0.75, 64, 64]} />
//             <meshStandardMaterial color="#23B278" />
//           </mesh>
//         </RigidBody>

//         <RigidBody type="fixed">
//           <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow>
//             <boxGeometry args={[8, 8, 0.35]} />
//             <meshStandardMaterial color="#C7CAC7" />
//           </mesh>
//         </RigidBody>
//       </Physics>
//     </React.Fragment>
//   );
// };

// export default PhysicsScene;

//* V1
// import React from "react";

// import { CustomElem } from "./Interfaces";
// import { Physics, RigidBody } from "@react-three/rapier";

// //* https://pmndrs.github.io/react-three-rapier

// const PhysicsScene = (): CustomElem => {
//   return (
//     <React.Fragment>
//       <Physics gravity={[0, -9.81, 0]}>
//         <RigidBody>
//           <mesh castShadow={true} position={[0, 1.5, 0]}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh>
//           {/* <mesh castShadow={true} position={[0, 1.5, 0]} scale={[0.25, 3, 1]} position-z={-2}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh> */}
//         </RigidBody>

//         <RigidBody>
//           <mesh castShadow={true} position={[0, 1.5, 0]} scale={[0.25, 3, 1]} position-z={-2}>
//             <boxGeometry />
//             <meshStandardMaterial color="#CC3941" />
//           </mesh>
//         </RigidBody>

//         <RigidBody type="fixed">
//           <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow={true}>
//             <boxGeometry args={[8, 8, 0.35]} />
//             <meshStandardMaterial color="#C7CAC7" />
//           </mesh>
//         </RigidBody>
//       </Physics>
//     </React.Fragment>
//   );
// };

// export default PhysicsScene;
