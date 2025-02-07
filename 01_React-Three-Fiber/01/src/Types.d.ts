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

interface PropsForMesh {
  position: [number, number, number];
  name?: string;
  wireframe: boolean;
}
