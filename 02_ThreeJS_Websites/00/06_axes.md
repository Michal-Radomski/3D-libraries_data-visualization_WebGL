In three.js, the **X**, **Y**, and **Z** axes are fundamental components of the 3D coordinate system used for positioning and
rotating objects within a scene. Understanding these axes is crucial for effective manipulation of 3D models and camera
movements.

## Axes Overview

- **X Axis**:

  - Represented by the color **red**.
  - Extends horizontally from left to right.
  - Positive values move to the right, while negative values move to the left.

- **Y Axis**:

  - Represented by the color **green**.
  - Extends vertically from bottom to top.
  - Positive values move upwards, while negative values move downwards.

- **Z Axis**:
  - Represented by the color **blue**.
  - Extends perpendicularly to both the X and Y axes, coming out of (or going into) the screen.
  - Positive values move towards the viewer, while negative values move away from the viewer.

## Coordinate System

In three.js, the coordinate system follows a **right-handed system** with the **Y axis pointing up**. This means that when
you look at the scene from a standard perspective, moving along the positive Y direction will take you upwards, contrary to
some other 3D software like Blender or Maya where the Z axis is typically considered as "up"[3][5].

## Practical Usage

When manipulating objects or cameras in three.js:

- Rotations are applied based on these axes. For instance, using `object.rotation.x`, `object.rotation.y`, and
  `object.rotation.z` applies rotations around their respective axes. However, due to gimbal lock issues with Euler angles,
  using **quaternions** is often recommended for complex rotations[2].

- The order of rotations can significantly affect the result. You can set this order using `object.rotation.order`, which
  allows you to specify how rotations are applied (e.g., 'YXZ', 'ZXY')[2][5].

- To visualize these axes in your scene, you can use `THREE.AxesHelper` which provides a simple way to see how your objects
  are oriented relative to these axes[4].

## Conclusion

Understanding how X, Y, and Z axes function in three.js is essential for effectively working with 3D graphics. Proper
manipulation of these axes allows for precise control over object placement and camera movements within a scene.

Citations: [1] https://www.reddit.com/r/threejs/comments/veujn6/rotating_around_z_axis_by_rotating_x_y_together/ [2]
https://stackoverflow.com/questions/66443222/threejs-rotation-by-x-and-z-axes-doing-the-same-rotation-but-in-different-direct
[3] https://discourse.threejs.org/t/axes-differences-between-all-other-3d-design-tools-and-threejs/58052 [4]
https://threejs.org/docs/api/en/helpers/AxesHelper.html [5]
https://discourse.threejs.org/t/how-to-change-the-default-coordinate-axes-to-z-up/33692 [6]
https://discourse.threejs.org/t/how-to-realign-x-y-and-z-axis-after-rotating/39127 [7]
https://discourse.threejs.org/t/question-about-z-axis/22474 [8]
https://discourse.threejs.org/t/creating-three-plane-geometry-perpendicular-to-x-y-and-z-axis/41520
