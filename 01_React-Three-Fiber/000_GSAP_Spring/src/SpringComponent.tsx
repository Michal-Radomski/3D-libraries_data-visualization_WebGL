import React from "react";
import { useSpring, animated } from "@react-spring/web";

const SpringComponent = (): React.JSX.Element => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = (): void => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    });
  };

  return (
    <React.Fragment>
      <animated.div
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          background: "#ff6d6d",
          borderRadius: 8,
          ...springs,
        }}
      />
    </React.Fragment>
  );
};

export default SpringComponent;
