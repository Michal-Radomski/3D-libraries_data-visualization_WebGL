import React from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap, MeshBasicMaterial } from "three";

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
