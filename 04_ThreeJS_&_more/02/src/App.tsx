import React from "react";
import { Canvas, RootState } from "@react-three/fiber";
// import * as THREE from "three";

// import Exercises from "./Exercises";
import "./App.scss";
import Scene from "./Scene";

// //^ Traditional Code with Three.js - NOT in react!
// //* Scene
// const scene: THREE.Scene = new THREE.Scene();
// const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// //* Group
// const group: THREE.Group<THREE.Object3DEventMap> = new THREE.Group();

// //* Mesh
// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry,
//   material
// );

// const geometry2: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// const mesh2: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
//   geometry2,
//   material2
// );
// group.add(mesh, mesh2);
// scene.add(group);
// // group.position.x = 1;
// console.log("group:", group);

// // Renderer
// const canvas = document.querySelector("canvas#canvas") as HTMLCanvasElement;
// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight); //Renderer size
// renderer.render(scene, camera); //display what the camera in the scene captured

// (function animate(): void {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// })();

const App = (): React.JSX.Element => {
  const creatingCanvasHandler = (state: RootState): void => {
    state.gl.setClearColor("cyan", 0.5);
  };

  return (
    <React.Fragment>
      {/* <Exercises /> */}

      <Canvas
        gl={{
          antialias: true,
          alpha: true,
        }}
        // orthographic={true}
        camera={{
          fov: 75,
          near: 0.1,
          far: 100,
          position: [2, 2, 5],
          // zoom: 120,
        }}
        onCreated={creatingCanvasHandler}
      >
        <Scene />

        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
    </React.Fragment>
  );
};

export default App;
