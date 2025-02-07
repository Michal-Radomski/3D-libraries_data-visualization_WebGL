import React from "react";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";

interface Props {
  position: [number, number, number];
  name?: string;
  wireframe: boolean;
}

const Box: React.FC<Props> = (props: Props): React.JSX.Element => {
  // console.log("props:", props);

  const ref = React.useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);

  React.useEffect(() => {
    if (ref?.current) {
      console.log("ref:", ref);
    }
  }, []);

  return (
    <React.Fragment>
      <mesh {...props} ref={ref}>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe={props.wireframe} />
      </mesh>
    </React.Fragment>
  );
};

export default Box;
