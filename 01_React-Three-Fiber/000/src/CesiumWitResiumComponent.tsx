import React from "react";
import { Viewer, Entity } from "resium";
import { Cartesian3, Color } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

//* Cesium License: Apache License 2.0
//* Resium License: MIT
const CesiumWithResiumComponent = (): React.JSX.Element => {
  return (
    <React.Fragment>
      CesiumComponent
      <Viewer full={false}>
        <Entity
          name="Tokyo"
          position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
          point={{ pixelSize: 10, color: Color.WHITE }}
        />
      </Viewer>
    </React.Fragment>
  );
};

export default CesiumWithResiumComponent;
