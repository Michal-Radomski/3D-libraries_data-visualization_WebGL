import React from "react";
import * as THREE from "three";

const Example: React.FC = () => {
  const width: number = window.innerWidth,
    height: number = window.innerHeight;

  React.useEffect(() => {
    //* Init
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    const scene: THREE.Scene = new THREE.Scene();

    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial();

    const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
      geometry,
      material
    );

    scene.add(mesh);

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //* Animation
    function animate(time: number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  }, [height, width]);

  return <React.Fragment>{null}</React.Fragment>;
};

export default Example;
