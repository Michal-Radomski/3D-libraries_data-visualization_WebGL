import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

// import Exercises from "./Exercises";
import "./App.scss";
import Scene from "./Scene";

// Scene
const scene: THREE.Scene = new THREE.Scene();

// Group
const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();

// Mesh
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);

const geometry2: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh2: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry2,
  material2
);
group.add(mesh, mesh2);
scene.add(group);
group.position.x = 1;
console.log("group:", group);

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      {/* <Exercises /> */}

      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 100,
          // position: [2, 2, 5],
        }}
      >
        <Scene />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
