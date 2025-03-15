struct VertexInput {
  @location(0) position: vec4<f32>
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>
};

@vertex
fn vs_main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = input.position;
  output.color = vec4f(1.0, 0.0, 0.0, 1.0); // Red color
  return output;
}
