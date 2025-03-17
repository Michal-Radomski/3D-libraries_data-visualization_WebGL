import "./style.scss";
import vertCode from "./vertex.glsl?raw"; //* V2
import fragCode from "./fragment.glsl?raw"; //* V2

(function main(): void {
  const canvas = document.querySelector("canvas#glcanvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;

  if (!gl) {
    alert("Unable to setup WebGL. Your browser or computer may not support it.");
    return;
  }

  const vertices: Float32Array<ArrayBuffer> = new Float32Array([0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]);
  // const colors: Float32Array<ArrayBuffer> = new Float32Array([0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4]);
  const colors: Float32Array<ArrayBuffer> = new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
  const indexes: Uint16Array<ArrayBuffer> = new Uint16Array([0, 1, 2]);

  // const vertices: Float32Array<ArrayBuffer> = new Float32Array([
  //   0.5,
  //   0.5,
  //   0.0, // 4th - 3 - green
  //   -0.5,
  //   -0.5,
  //   0.0, // 2nd - 1 - green
  //   -0.5,
  //   0.5,
  //   0.0, // 1st - 0 - green
  //   0.5,
  //   0.5,
  //   0.0, // 4th - 3 - blue
  //   0.5,
  //   -0.5,
  //   0.0, // 3rd - 2 - blue
  //   -0.5,
  //   -0.5,
  //   0.0, // 2nd - 1 - blue
  // ]);

  // const colors: Float32Array<ArrayBuffer> = new Float32Array([
  //   0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
  // ]);

  const vertex_buffer: WebGLBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // //* Create an empty buffer object to store Index buffer
  const index_Buffer: WebGLBuffer = gl.createBuffer();

  // //* Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_Buffer);

  // //* Pass the vertex data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

  //* Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  //* Create an empty buffer object and store color data
  const color_buffer: WebGLBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;

  gl.shaderSource(vertShader, vertCode);

  gl.compileShader(vertShader);

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

  gl.shaderSource(fragShader, fragCode);

  gl.compileShader(fragShader);

  const shaderProgram: WebGLProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertShader);

  gl.attachShader(shaderProgram, fragShader);

  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  //* Bind index buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_Buffer);

  const coord: number = gl.getAttribLocation(shaderProgram, "coordinates");

  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(coord);

  //* Bind the color buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

  //* Get the attribute location
  const color: number = gl.getAttribLocation(shaderProgram, "color");

  //* Point attribute to the color buffer object
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

  //* Enable the color attribute
  gl.enableVertexAttribArray(color);

  gl.clearColor(0.5, 0.0, 0.0, 0.4);

  gl.enable(gl.DEPTH_TEST);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);
  // gl.drawArrays(gl.TRIANGLES, 0, 6);
})();
