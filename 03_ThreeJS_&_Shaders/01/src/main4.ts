import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

import "./style.scss";

// Scene
const scene: THREE.Scene = new THREE.Scene();

//* Resizing
window.addEventListener("resize", (): void => {
  // New size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // New AspectRatio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  // New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//* Meshes
//* 1-Mesh
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
const mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry,
  material
);
mesh.position.x = 1;
scene.add(mesh);

//* 2-Mesh
const geometry2: THREE.BoxGeometry = new THREE.BoxGeometry();
const material2: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
const mesh2: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap> = new THREE.Mesh(
  geometry2,
  material2
);
mesh2.position.x = -1;
scene.add(mesh2);

//* Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

//* Renderer
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//* Raycaster (sth like hover)
const raycaster: THREE.Raycaster = new THREE.Raycaster();
const pointer: THREE.Vector2 = new THREE.Vector2();
const meshes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>[] = [mesh, mesh2];
// console.log("raycaster, pointer:", raycaster, pointer);

const oneIntersectMesh:
  | THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
  | { object: { scale: gsap.TweenTarget } }[] = [];

window.addEventListener("mousemove", (event: MouseEvent): void => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //* Casting Ray
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(meshes);

  for (let i = 0; i < intersects.length; i++) {
    // @ts-ignore
    intersects[i].object.material.color.set(0xff0000);
  }

  if (intersects.length > 0) {
    if (oneIntersectMesh.length < 1) {
      oneIntersectMesh.push(intersects[0]);
    }
    // @ts-ignore
    oneIntersectMesh[0].object.material.color.set("red");
    gsap.to(oneIntersectMesh[0].object.scale, {
      duration: 0.5,
      x: 1.25,
      y: 1.25,
      z: 1.25,
    });

    console.log("oneIntersectMesh:", oneIntersectMesh);
  } else if (oneIntersectMesh[0] !== undefined) {
    //intersects.length === 0
    // @ts-ignore
    oneIntersectMesh[0].object.material.color.set("white");
    gsap.to(oneIntersectMesh[0].object.scale, {
      duration: 0.5,
      x: 1,
      y: 1,
      z: 1,
    });
    oneIntersectMesh.shift();
  }
  console.log("intersects:", intersects);
});

//* OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//* Animate
(function animate(): void {
  orbitControls.update(); // IMPORTANT: Update the controls in the animation loop

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
})();
