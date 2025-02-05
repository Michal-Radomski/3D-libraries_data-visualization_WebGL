Here's an example of how to implement a GSAP animation in a React application using TypeScript. This example will create a
simple animation that rotates a "Hello World" div when the component mounts.

### Step-by-Step Implementation

1. **Install GSAP**: First, ensure you have GSAP installed in your React project. You can do this by running:

   ```bash
   npm install gsap
   ```

2. **Create the Component**: Below is the code for a simple React component that uses GSAP to animate a div.

```typescript
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation to rotate the div
    gsap.to(appRef.current, { rotate: 360, duration: 5 });
  }, []);

  return (
    <div
      ref={appRef}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "lightblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Hello World
    </div>
  );
};

export default App;
```

### Explanation of the Code

- **Imports**: The `gsap` library is imported along with `useEffect` and `useRef` from React.
- **useRef Hook**: A reference (`appRef`) is created to target the div element for animation.
- **useEffect Hook**: This hook runs after the component mounts. Inside it, we call `gsap.to()` to animate the rotation of
  the referenced div.
- **Animation Properties**:
  - `rotate`: Specifies the rotation angle (360 degrees).
  - `duration`: Defines how long the animation lasts (5 seconds).
- **Styling**: The div is styled inline for visibility and centered text.

### Running the Example

When you run this component in your React application, you should see the "Hello World" text rotate smoothly in a light blue
box over five seconds.

This example illustrates how to integrate GSAP animations into a React component using TypeScript effectively. For more
complex animations or interactions, you can expand upon this basic structure by utilizing GSAP's extensive features and
capabilities.

Citations: [1] https://dev.to/franklin030601/animations-with-gsap-react-1nok [2] https://www.npmjs.com/package/react-gsap [3]
https://bitworking.github.io/react-gsap/ [4] https://gsap.com/resources/react-basics/ [5]
https://www.youtube.com/watch?v=l0aI8Ecumy8 [6] https://gsap.com/resources/React/ [7]
https://gsap.com/community/forums/topic/35062-best-practices-with-gsap-in-react-typescript-app-in-a-hook/ [8]
https://dev.to/topboyasante/introduction-to-web-animations-with-gsap-645
