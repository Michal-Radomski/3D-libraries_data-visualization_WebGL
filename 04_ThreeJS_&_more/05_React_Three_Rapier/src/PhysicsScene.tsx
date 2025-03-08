import React from "react";

import { CustomElem } from "./Interfaces";
import { Physics, RigidBody } from "@react-three/rapier";

//* https://pmndrs.github.io/react-three-rapier

const PhysicsScene = (): CustomElem => {
  return (
    <React.Fragment>
      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody>
          <mesh castShadow={true} position={[0, 1.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="#CC3941" />
          </mesh>
          {/* <mesh castShadow={true} position={[0, 1.5, 0]} scale={[0.25, 3, 1]} position-z={-2}>
            <boxGeometry />
            <meshStandardMaterial color="#CC3941" />
          </mesh> */}
        </RigidBody>

        <RigidBody>
          <mesh castShadow={true} position={[0, 1.5, 0]} scale={[0.25, 3, 1]} position-z={-2}>
            <boxGeometry />
            <meshStandardMaterial color="#CC3941" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow={true}>
            <boxGeometry args={[8, 8, 0.35]} />
            <meshStandardMaterial color="#C7CAC7" />
          </mesh>
        </RigidBody>
      </Physics>
    </React.Fragment>
  );
};

export default PhysicsScene;
