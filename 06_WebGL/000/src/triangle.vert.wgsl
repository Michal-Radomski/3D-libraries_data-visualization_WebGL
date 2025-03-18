//* This struct represents the input data for each vertex. It contains a single field `position` of type `vec4`, which is a 4-dimensional vector 
//* using 32-bit floating-point numbers. The `@location(0)` attribute specifies that this 
//* field is bound to the first attribute slot in the vertex buffer.
struct VertexInput {
  @location(0) position: vec4<f32>
};

//* This struct defines the output of the vertex shader. It includes two fields:
//* - `position`: This is marked with `@builtin(position)` to indicate that it represents the final clip position of the vertex 
//* in the graphics pipeline. It is also a `vec4`.
//* - `color`: This is another `vec4` field, marked with `@location(0)`, which means it will be passed to the fragment shader as the first output attribute.
struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>
};

//* The `vs_main` function is marked with `@vertex` to indicate that it is the entry point for the vertex shader.
//* It takes an input of type `VertexInput` and returns an output of type `VertexOutput`.
//* - It creates a variable `output` of type `VertexOutput`.
//* - It sets the `position` field of `output` to the `position` from the input vertex.
//* - It sets the `color` field of `output` to a constant red color (`vec4f(1.0, 0.0, 0.0, 1.0)`).
//* - Finally, it returns the `output`.
@vertex
fn vs_main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = input.position;
  output.color = vec4f(1.0, 0.0, 0.0, 1.0); // Red color
  return output;
}
