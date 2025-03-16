The main difference between vertex and fragment shaders lies in their roles within the graphics pipeline:

### Vertex Shader

- **Purpose**: A vertex shader is executed once per vertex of a 3D model. Its primary function is to transform the 3D
  coordinates of vertices into screen space, applying transformations such as rotations, translations, and projections.
- **Responsibilities**:
  - Transform vertex positions.
  - Pass data like texture coordinates, normals, and colors to the fragment shader.
  - Perform per-vertex calculations, such as lighting or deformation.
- **Input**: Typically receives vertex attributes like position, normal, and texture coordinates.
- **Output**: Outputs transformed vertex positions and any additional data needed by the fragment shader.

### Fragment Shader

- **Purpose**: A fragment shader is executed once per pixel (or fragment) of the final image. It determines the color of each
  pixel based on the interpolated data received from the vertex shader.
- **Responsibilities**:
  - Calculate the final color of each pixel.
  - Apply textures, lighting effects, and other visual effects.
  - Handle transparency and blending.
- **Input**: Receives interpolated data from the vertex shader, such as texture coordinates and colors.
- **Output**: Outputs the final color of each pixel.

### Key Differences

- **Execution Point**: Vertex shaders run before rasterization (the process of converting 3D models into pixels), while
  fragment shaders run after rasterization.
- **Data Processing**: Vertex shaders process vertex-level data, whereas fragment shaders process pixel-level data.
- **Calculation Scope**: Vertex shaders perform calculations per vertex, while fragment shaders perform calculations per
  pixel.

### Example Use Cases

- **Vertex Shader Example**: Use a vertex shader to animate a character's limbs by modifying vertex positions over time.
- **Fragment Shader Example**: Use a fragment shader to create a gradient effect across a polygon by interpolating colors
  between vertices.

### Interpolation

The outputs from the vertex shader are linearly interpolated to provide inputs to the fragment shader. This means that if you
specify different colors for each vertex of a triangle, the fragment shader will receive interpolated colors for each pixel
within the triangle, creating a smooth gradient effect[1][2].

Citations: [1] https://stackoverflow.com/questions/4421261/vertex-shader-vs-fragment-shader [2]
https://community.khronos.org/t/vertex-shader-vs-fragment-shader-computations/73728 [3]
https://discussions.unity.com/t/difference-between-surface-shaders-and-vertex-shaders/497504 [4]
https://www.reddit.com/r/gamedev/comments/pqxeni/is_there_a_specific_technical_limitation_on_why/ [5]
https://www.youtube.com/watch?v=C1ZUeHLb0YU [6]
https://community.khronos.org/t/difference-between-vertex-and-fragment-shader/67529 [7]
https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders

---

Answer from Perplexity:
https://www.perplexity.ai/search/what-does-two-lines-do-gl-clea-_iGLiyJNRTyECfxTFY8X4g?utm_source=copy_output
