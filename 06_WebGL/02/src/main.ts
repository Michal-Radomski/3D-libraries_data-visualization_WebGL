import "./style.scss";
import vertCode from "./vertex.glsl?raw"; //* V2
import fragCode from "./fragment.glsl?raw"; //* V2

// const NormalizedToDevice = (coord: number, axisSize: number): number => {
//   const halfAxisSize: number = axisSize / 2;
//   const deviceCoord: number = (coord + 1) * halfAxisSize;
//   // console.log({ deviceCoord });
//   return deviceCoord;
// };

// const DeviceToNormalized = (coord: number, axisSize: number): number => {
//   const halfAxisSize: number = axisSize / 2;
//   const normalizedCoord: number = coord / halfAxisSize - 1;
//   // console.log({ normalizedCoord });
//   return normalizedCoord;
// };

(function main(): void {
  const canvas = document.querySelector("canvas#glcanvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;

  if (!gl) {
    alert("Unable to setup WebGL. Your browser or computer may not support it.");
    return;
  }

  // const vertices: number[] = [0.0, 0.0, 0.0, 0.5, -0.5, 0.0, 1.0, 1.0, 0.0];
  // const vertices: Float32Array<ArrayBuffer> = new Float32Array([
  //   // 0.0, 0.0, 0.0,
  //   NormalizedToDevice(DeviceToNormalized(0, canvas.width), canvas.width),
  //   NormalizedToDevice(DeviceToNormalized(0, canvas.height), canvas.height),
  //   0.0,
  //   0.5,
  //   -0.5,
  //   0.0,
  //   // 1.0, 1.0, 0.0,
  //   NormalizedToDevice(DeviceToNormalized(1, canvas.width), canvas.width),
  //   NormalizedToDevice(DeviceToNormalized(1, canvas.height), canvas.height),
  //   0.0,
  // ]); //* xyz
  // console.log("vertices:", vertices);

  // const vertices: Float32Array<ArrayBuffer> = new Float32Array([0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]);
  // const indexes: Uint16Array<ArrayBuffer> = new Uint16Array([0, 1, 2]);

  const vertices: Float32Array<ArrayBuffer> = new Float32Array([
    -0.5, -0.2, 0.0, -0.1, 0.7, 0.0, -0.3, -0.3, 0.0, 0.2, 0.6, 0.0, 0.7, -0.9, 0.0, 0.7, 0.9, 0.0,
  ]); // 6 points

  //* Create an empty buffer object to store the vertex buffer
  const vertex_buffer: WebGLBuffer = gl.createBuffer();

  //* Bind appropriate array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  //* Pass the vertex data to the buffer
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  //* Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Create an empty buffer object to store Index buffer
  const Index_Buffer = gl.createBuffer();

  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

  // Pass the vertex data to the buffer
  // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

  //* Create a vertex shader object
  const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;

  //* Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode);

  //* Compile the vertex shader
  gl.compileShader(vertShader);

  //* Create fragment shader object
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

  //* Attach fragment shader source code
  gl.shaderSource(fragShader, fragCode);

  //* Compile the fragment shader
  gl.compileShader(fragShader);

  //* Create a shader program object to store the combined shader program
  const shaderProgram: WebGLProgram = gl.createProgram();
  // console.log("shaderProgram:", shaderProgram);

  //* Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader);

  //* Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader);

  //* Link both programs
  gl.linkProgram(shaderProgram);

  //* Use the combined shader program object
  gl.useProgram(shaderProgram);

  //* Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  //* Bind index buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

  //* Get the attribute location
  const coord: number = gl.getAttribLocation(shaderProgram, "coordinates");
  // console.log({ coord });

  //* Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  //* Enable the attribute
  gl.enableVertexAttribArray(coord);

  gl.clearColor(1.0, 0.0, 0.0, 1.0); // red

  //* Enable the depth test
  gl.enable(gl.DEPTH_TEST);
  // console.log("gl.DEPTH_TEST:", gl.DEPTH_TEST);

  gl.clear(gl.COLOR_BUFFER_BIT);

  //* Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  //* Draw the triangle
  gl.drawArrays(gl.POINTS, 0, 3);
  // gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);

  // gl.drawArrays(gl.LINES, 0, 6); //* 2 points per line, 3 lines
  // gl.drawArrays(gl.LINE_STRIP, 0, 6); //* 5 lines
  gl.drawArrays(gl.LINE_LOOP, 0, 6); //* 5 lines + close line
})();

//* V1
// const vertCode0: string = /* glsl */ `
//   #version 100
//   attribute vec3 coordinates;
//   void main(void) {
//     gl_Position = vec4(coordinates, 1.0);
//     gl_PointSize = 10.0;
//   }`;

//* V1
// // Fragment shader source code
// const fragCode0: string = /* glsl */ `
// #version 100
// void main(void)  {
//      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
//     }`;
// console.log("vertCode0, fragCode0:", vertCode0, fragCode0);
