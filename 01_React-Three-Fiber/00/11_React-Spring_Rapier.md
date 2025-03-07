**React Spring** and **React Three Rapier** are two distinct libraries used in different contexts within React applications,
particularly when working with Three.js. Here's a comparison of their purposes and functionalities:

## React Spring

- **Purpose**: React Spring is a library that helps create smooth, interruptible animations in React applications. It is
  particularly useful when working with React Three Fiber to create realistic motion designs in 3D scenes.
- **Functionality**: It provides a way to animate values over time, ensuring that animations are physically correct and can
  be seamlessly updated without interruption. This is crucial for creating immersive experiences in interactive 3D
  environments.
- **Use Cases**: Commonly used for animations, motion design, and creating interactive experiences in React applications,
  especially with Three.js.

## React Three Rapier

- **Purpose**: React Three Rapier is a wrapper library around the Rapier physics engine, designed to integrate physics into
  React Three Fiber applications. It allows developers to easily add physics simulations to their 3D scenes.
- **Functionality**: It provides a simple API for creating rigid bodies, colliders, and joints, making it easy to simulate
  realistic physics interactions in 3D environments. Rapier is known for its high performance and determinism.
- **Use Cases**: Primarily used for adding physics simulations to 3D scenes in React applications, such as creating realistic
  collisions, movements, and interactions between objects.

### Key Differences

| Feature               | React Spring                      | React Three Rapier                          |
| --------------------- | --------------------------------- | ------------------------------------------- |
| **Primary Use**       | Animations and Motion Design      | Physics Simulations                         |
| **Integration**       | Works well with React Three Fiber | Specifically designed for React Three Fiber |
| **Performance Focus** | Smooth Animations                 | High-Performance Physics                    |
| **Determinism**       | Not deterministic                 | Deterministic physics engine                |

In summary, while both libraries enhance the capabilities of React Three Fiber, React Spring focuses on animations and motion
design, whereas React Three Rapier is dedicated to physics simulations.

Citations: [1] https://www.reddit.com/r/threejs/comments/13e4puv/why_reactthreerapier_does_not_use_worker_like/ [2]
https://github.com/pmndrs/react-three-rapier [3] https://r3f.docs.pmnd.rs/getting-started/introduction [4]
https://www.react-spring.dev/docs/guides/react-three-fiber [5]
https://stackoverflow.com/questions/tagged/react-three-rapier?tab=Newest [6]
https://github.com/pmndrs/react-three-rapier/discussions/305 [7]
https://discourse.threejs.org/t/how-to-grab-or-drag-objects-with-react-three-rapier/59534 [8]
https://www.youtube.com/watch?v=P-8SKqcIrOo
