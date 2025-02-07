import { MeshProps } from "@react-three/fiber";
import { ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        mesh: MeshProps;
      }
    }
  }
}

type Position = [number, number, number];

interface PropsForMesh {
  position: Position;
  name?: string;
  wireframe: boolean;
}

type PolyhedronArr = [THREE.BoxGeometry, THREE.SphereGeometry, THREE.DodecahedronGeometry];
