# What is difference between @react-spring/web, @react-spring/three and react-spring

**Overview of React Spring Packages**

React Spring is a powerful library for animating React components across different platforms. It provides several packages
tailored for specific use cases:

## **@react-spring/web**

- **Purpose**: This package is designed for animating web components, including HTML and SVG elements.
- **Features**: It allows you to animate CSS properties, strings, numbers, and CSS variables. It's ideal for creating
  interactive and data-driven UI components on the web.
- **Usage**: Import `useSpring` and `animated` components from `@react-spring/web` to animate web elements.

Example:

```javascript
import { useSpring, animated } from "@react-spring/web";

function MyComponent() {
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: 1 },
  });

  return <animated.div style={{ x }} />;
}
```

## **@react-spring/three**

- **Purpose**: This package is specifically designed for animating Three.js objects within React applications.
- **Features**: It integrates seamlessly with `react-three/fiber`, allowing you to animate 3D models and scenes.
- **Usage**: Import `useSpring` and `a` components from `@react-spring/three` to animate Three.js objects.

Example:

```javascript
import { Canvas } from "react-three-fiber";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

function Box() {
  const { spring } = useSpring({
    spring: 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const scale = spring.to([0, 1], [1, 5]);
  const rotation = spring.to([0, 1], [0, Math.PI]);

  return (
    <Canvas>
      <a.mesh rotation-y={rotation} scale-x={scale} scale-z={scale}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" />
      </a.mesh>
    </Canvas>
  );
}
```

## **react-spring**

- **Purpose**: This is the main package that re-exports components from other platform-specific packages like
  `@react-spring/web`, `@react-spring/three`, etc.
- **Features**: It provides a unified interface for animating components across different platforms.
- **Usage**: You can import components directly from `react-spring`, but using platform-specific packages is recommended for
  better control and optimization.

In summary:

- **@react-spring/web** is for web components.
- **@react-spring/three** is for Three.js objects.
- **react-spring** is a wrapper package that includes all platform-specific modules.

Using the specific packages (`@react-spring/web`, `@react-spring/three`) is generally preferred over the general
`react-spring` package for better performance and to avoid unnecessary dependencies.

<div style="text-align: center">⁂</div>

[^1]: https://www.react-spring.dev/docs/getting-started
[^2]: https://github.com/pmndrs/react-spring/issues/1586
[^3]: https://aleclarson.github.io/react-spring/v9/
[^4]: https://stackoverflow.com/questions/69828845/react-spring-only-works-with-canvas-in-react-three-fiber
[^5]: https://www.react-spring.dev
[^6]: https://github.com/pmndrs/react-spring/discussions/1625
[^7]: https://www.react-spring.dev/docs/components/use-spring
[^8]: https://gracious-keller-98ef35.netlify.app/docs/recipes/animating-with-react-spring/
