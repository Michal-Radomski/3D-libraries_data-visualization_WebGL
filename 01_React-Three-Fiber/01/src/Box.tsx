import React from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap, MeshBasicMaterial } from "three";
import { RootState, useFrame } from "@react-three/fiber";

interface Props {
  position: [number, number, number];
  name?: string;
  wireframe: boolean;
}

const Box: React.FC<Props> = (props: Props): React.JSX.Element => {
  // console.log("props:", props);

  const meshRef = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const materialRef = React.useRef<MeshBasicMaterial>(null);

  React.useEffect(() => {
    if (meshRef?.current && materialRef?.current) {
      // console.log("meshRef:", meshRef);
      console.log("materialRef:", materialRef);
    }
  }, []);

  // The useFrame hook is invoked continually, and on desktop, will try to maintain a rate of 60 frames per second.
  useFrame((_state: RootState, delta: number) => {
    // console.log("_state", _state);
    // console.log("delta:", delta);
    meshRef.current!.rotation.x += 1 * delta;
    meshRef.current!.rotation.y += 0.5 * delta;
  });

  return (
    <React.Fragment>
      <mesh {...props} ref={meshRef}>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe={props.wireframe} ref={materialRef} />
      </mesh>
    </React.Fragment>
  );
};

export default Box;
