import "./style.scss";

(function main(): void {
  const canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;

  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  console.log("gl:", gl);

  if (!gl) {
    console.log("WebGL failed to initialize");
    return;
  }

  // Define vertex shader source
  const vertexShaderSource: string = `
attribute vec2 position;
void main(void) {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  // Define fragment shader source
  const fragmentShaderSource: string = `
void main(void) {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
}
`;

  // Create and compile vertex shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
  if (!vertexShader) {
    console.error("Failed to create vertex shader");
    return;
  }
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  // Check for vertex shader compilation errors
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Error compiling vertex shader:", gl.getShaderInfoLog(vertexShader));
    gl.deleteShader(vertexShader);
    return;
  }

  // Create and compile fragment shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
  if (!fragmentShader) {
    console.error("Failed to create fragment shader");
    return;
  }
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Check for fragment shader compilation errors
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Error compiling fragment shader:", gl.getShaderInfoLog(fragmentShader));
    gl.deleteShader(fragmentShader);
    return;
  }

  // Create and link program
  const program: WebGLProgram = gl.createProgram();
  if (!program) {
    console.error("Failed to create program");
    return;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Check for program linking errors
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error linking program:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  // Use the program
  gl.useProgram(program);

  // Set up vertex data
  const vertices: Float32Array<ArrayBuffer> = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

  const vertexBuffer: WebGLBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error("Failed to create vertex buffer");
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Specify the vertex attribute
  const positionLocation: number = gl.getAttribLocation(program, "position");
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);

  // Clear the canvas and draw
  gl.clearColor(0.9, 0.5, 0.3, 0.7);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
})();

console.log("typeof WebGLRenderingContext:", typeof WebGLRenderingContext);
console.log('typeof WebGLRenderingContext === "undefined":', typeof WebGLRenderingContext === "undefined");
