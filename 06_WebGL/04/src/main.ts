import { mat4, vec3 } from "gl-matrix";

import "./style.scss";
import vertCode from "./vertex.glsl?raw";
import fragCode from "./fragment.glsl?raw";

//* GL-Matrix library examples
const v: vec3 = vec3.fromValues(1, 0, 0);
console.log({ v });

//* 1. Create an identity matrix
const matrix: mat4 = mat4.create();
// Apply transformations
mat4.translate(matrix, matrix, [1, 2, 3]); // Translate by (1, 2, 3)
mat4.rotate(matrix, matrix, Math.PI / 4, [0, 1, 0]); // Rotate 45° around the Y-axis
mat4.scale(matrix, matrix, [2, 2, 2]); // Scale by a factor of 2
console.log("Transformed Matrix:", matrix);

//* 2. Define camera parameters
const eye: vec3 = vec3.fromValues(0, 0, 5); // Camera position
const center: vec3 = vec3.fromValues(0, 0, 0); // Point to look at
const up: vec3 = vec3.fromValues(0, 1, 0); // Up direction
// Create a view matrix
const viewMatrix: mat4 = mat4.create();
mat4.lookAt(viewMatrix, eye, center, up);
console.log("View Matrix:", viewMatrix);

//* 3. Create two vectors
const v1: vec3 = vec3.fromValues(1, 2, 3);
const v2: vec3 = vec3.fromValues(4, 5, 6);
// Normalize v1
vec3.normalize(v1, v1);
console.log("Normalized Vector:", v1);
// Add v1 and v2
const result: vec3 = vec3.create();
vec3.add(result, v1, v2);
console.log("Vector Addition Result:", result);

//* 4. Create an identity model matrix
const modelMatrix: mat4 = mat4.create();
// Apply multiple transformations in sequence
mat4.translate(modelMatrix, modelMatrix, [0.5, -0.5, -2]); // Translate
mat4.rotateX(modelMatrix, modelMatrix, Math.PI / 6); // Rotate around X-axis
mat4.rotateY(modelMatrix, modelMatrix, Math.PI / 6); // Rotate around Y-axis
console.log("Model Matrix:", modelMatrix);

//* Main Task
(function main(): void {
  const canvas = document.querySelector("canvas#glcanvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;

  if (!gl) {
    alert("Unable to setup WebGL. Your browser or computer may not support it.");
    return;
  }

  //^ Events
  //* Mouse Detection
  let rotationSpeed: number = 1.0;

  canvas.addEventListener("mousemove", MouseMove, false);
  canvas.addEventListener("mousedown", MouseDown, false);
  canvas.addEventListener("wheel", MouseWheel, false);

  function MouseMove(event: MouseEvent): void {
    console.log(1, "event:", event);
    console.log("event.clientX, event.clientY:", event.clientX, event.clientY);
  }

  function MouseDown(event: MouseEvent): void {
    console.log(2, "event:", event);
    if (0 === event.button) {
      console.log("Left mouse button pressed");
    }
    if (1 === event.button) {
      console.log("Middle mouse button pressed");
    }
    if (2 === event.button) {
      console.log("Right mouse button pressed");
    }
  }

  function MouseWheel(event: WheelEvent): void {
    console.log(3, "event:", event);
    rotationSpeed += 0.001 * event.deltaY;
    console.log("rotationSpeed:", rotationSpeed);
  }

  //* Keyboard Events
  let translationX: number = 3.0;
  let translationY: number = 0.0;
  let translationZ: number = -10.0;

  const bodyElement = document.querySelector("body") as HTMLBodyElement;
  bodyElement.addEventListener("keydown", KeyDown, false);
  bodyElement.addEventListener("keyup", keyUp, false);

  function KeyDown(event: KeyboardEvent): void {
    console.log("event:", event);
    if ("ArrowUp" === event.key) {
      translationY += 0.1;
    } else if ("ArrowDown" === event.key) {
      translationY -= 0.1;
    } else if ("ArrowRight" === event.key) {
      translationX += 0.1;
    } else if ("ArrowLeft" === event.key) {
      translationX -= 0.1;
    } else if ("End" === event.key) {
      translationZ += 0.1;
    } else if ("Home" === event.key) {
      translationZ -= 0.1;
    }
  }

  function keyUp(event: KeyboardEvent): void {
    console.log("event:", event);
    console.log("translationX, translationY, translationZ:", translationX, translationY, translationZ);
  }
  //^ End of Events

  const vertices: Float32Array<ArrayBuffer> = new Float32Array([
    // X, Y, Z         U, V
    // Top
    -1.0, 1.0, -1.0, 0, 0, -1.0, 1.0, 1.0, 0, 1, 1.0, 1.0, 1.0, 1, 1, 1.0, 1.0, -1.0, 1, 0,
    // Left
    -1.0, 1.0, 1.0, 0, 0, -1.0, -1.0, 1.0, 1, 0, -1.0, -1.0, -1.0, 1, 1, -1.0, 1.0, -1.0, 0, 1,
    // Right
    1.0, 1.0, 1.0, 1, 1, 1.0, -1.0, 1.0, 0, 1, 1.0, -1.0, -1.0, 0, 0, 1.0, 1.0, -1.0, 1, 0,
    // Front
    1.0, 1.0, 1.0, 1, 1, 1.0, -1.0, 1.0, 1, 0, -1.0, -1.0, 1.0, 0, 0, -1.0, 1.0, 1.0, 0, 1,
    // Back
    1.0, 1.0, -1.0, 0, 0, 1.0, -1.0, -1.0, 0, 1, -1.0, -1.0, -1.0, 1, 1, -1.0, 1.0, -1.0, 1, 0,
    // Bottom
    -1.0, -1.0, -1.0, 1, 1, -1.0, -1.0, 1.0, 1, 0, 1.0, -1.0, 1.0, 0, 0, 1.0, -1.0, -1.0, 0, 1,
  ]);

  const colors: Float32Array<ArrayBuffer> = new Float32Array([
    5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
  ]);

  const indexes: Uint16Array<ArrayBuffer> = new Uint16Array([
    // Top
    0, 1, 2, 0, 2, 3,
    // Left
    5, 4, 6, 6, 4, 7,
    // Right
    8, 9, 10, 8, 10, 11,
    // Front
    13, 12, 14, 15, 14, 12,
    // Back
    16, 17, 18, 16, 18, 19,
    // Bottom
    21, 20, 22, 22, 20, 23,
  ]);

  const vertex_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const index_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

  const color_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  //* Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

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

  //* Associating attributes to vertex shader
  const Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix") as WebGLUniformLocation;
  const Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix") as WebGLUniformLocation;
  const Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix") as WebGLUniformLocation;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  const position: number = gl.getAttribLocation(shaderProgram, "position");

  gl.vertexAttribPointer(
    position, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    false,
    5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );

  //* Position Buffer Binding
  gl.enableVertexAttribArray(position);

  const texture: number = gl.getAttribLocation(shaderProgram, "textureCoord");
  gl.vertexAttribPointer(
    texture, // Attribute location
    2, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    false,
    5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(texture);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  var normalAttribLocation = gl.getAttribLocation(shaderProgram, "vertexNormal");
  gl.vertexAttribPointer(normalAttribLocation, 3, gl.FLOAT, true, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(normalAttribLocation);

  //* V2
  //* Load the image
  const image: HTMLImageElement = new Image();
  // WebGL1 has different requirements for power of 2 images vs. non power of 2 images so check if the image is a power of 2 in both dimensions.
  image.onload = (): void => {
    // Check if the image dimensions are power of 2
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Generate mipmaps for better scaling
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // Disable mipmaps and set filtering for non-power-of-2 textures
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
  };
  // console.log("image:", image);

  //* Start loading the image by setting its source
  // image.src = "./src/crate_0.png";
  image.src = "./src/crate.jpg";

  //* Helper function to check if a number is a power of 2
  function isPowerOf2(value: number): boolean {
    const valueToReturn = (value & (value - 1)) === 0;
    // console.log({ valueToReturn });
    return valueToReturn;
  }

  //* V1
  // const source = document.querySelector("img#CrateImage") as HTMLImageElement;
  // console.log("source:", source);

  //* Create texture
  const boxTexture: WebGLTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, boxTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source); //* V1
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); //* V2
  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  const color: number = gl.getAttribLocation(shaderProgram, "color");
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

  //* Color Buffer Binding
  gl.enableVertexAttribArray(color);
  gl.useProgram(shaderProgram);

  //* Ambient Light
  const ambientUniformLocation = gl.getUniformLocation(shaderProgram, "ambientLightIntensity") as WebGLUniformLocation;
  gl.uniform3f(ambientUniformLocation, 1.0, 0.1, 0.1);

  const sunlightDirectionUniformLocation = gl.getUniformLocation(shaderProgram, "sun.direction") as WebGLUniformLocation;
  const sunlightColorUniformLocation = gl.getUniformLocation(shaderProgram, "sun.color") as WebGLUniformLocation;
  gl.uniform3f(sunlightDirectionUniformLocation, -1.0, 0.0, 0.0);
  gl.uniform3f(sunlightColorUniformLocation, 1.0, 1.0, 1.0);

  //* MATRIX
  const get_projection = (angle: number, a: number, zMin: number, zMax: number): number[] => {
    const ang = Math.tan((angle * 0.5 * Math.PI) / 180);

    return [
      0.5 / ang,
      0,
      0,
      0,
      0,
      (0.5 * a) / ang,
      0,
      0,
      0,
      0,
      -(zMax + zMin) / (zMax - zMin),
      -1,
      0,
      0,
      (-2 * zMax * zMin) / (zMax - zMin),
      0,
    ];
  };

  const proj_matrix: number[] = get_projection(40, canvas.width / canvas.height, 1, 100);

  const mov_matrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const view_matrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  //* Translating z
  view_matrix[14] = view_matrix[14] - 6;

  //* Rotation
  const rotateX = (m: number[], angle: number): void => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const mv1 = m[1],
      mv5 = m[5],
      mv9 = m[9];

    m[1] = m[1] * c - m[2] * s;
    m[5] = m[5] * c - m[6] * s;
    m[9] = m[9] * c - m[10] * s;

    m[2] = m[2] * c + mv1 * s;
    m[6] = m[6] * c + mv5 * s;
    m[10] = m[10] * c + mv9 * s;
  };

  const rotateY = (m: number[], angle: number): void => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const mv0 = m[0],
      mv4 = m[4],
      mv8 = m[8];

    m[0] = c * m[0] + s * m[2];
    m[4] = c * m[4] + s * m[6];
    m[8] = c * m[8] + s * m[10];

    m[2] = c * m[2] - s * mv0;
    m[6] = c * m[6] - s * mv4;
    m[10] = c * m[10] - s * mv8;
  };

  const rotateZ = (m: number[], angle: number): void => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const mv0 = m[0],
      mv4 = m[4],
      mv8 = m[8];

    m[0] = c * m[0] - s * m[1];
    m[4] = c * m[4] - s * m[5];
    m[8] = c * m[8] - s * m[9];

    m[1] = c * m[1] + s * mv0;
    m[5] = c * m[5] + s * mv4;
    m[9] = c * m[9] + s * mv8;
  };

  let previous_time: number = 0;

  const animate = (time: number): void => {
    const dt: number = time - previous_time;
    rotateZ(mov_matrix, dt * 0.001 * rotationSpeed); // Time
    rotateY(mov_matrix, dt * 0.0004 * rotationSpeed);
    rotateX(mov_matrix, dt * 0.0006 * rotationSpeed);
    previous_time = time;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.activeTexture(gl.TEXTURE0);

    //* Translations
    // const tX = 3.0,
    //   tY = 0.0,
    //   tZ = -10.0;
    // const translation = gl.getUniformLocation(shaderProgram, "translation") as WebGLUniformLocation;
    // gl.uniform3f(translation, tX, tY, tZ);
    const translation = gl.getUniformLocation(shaderProgram, "translation") as WebGLUniformLocation;
    gl.uniform3f(translation, translationX, translationY, translationZ);

    //* Scaling
    const sX = 3.0,
      sY = 3.0,
      sZ = 3.0;
    const formMatrix = new Float32Array([
      sX,
      0.0,
      0.0,
      0.0,
      0.0,
      sY,
      0.0,
      0.0,
      0.0,
      0.0,
      sZ,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ]) as Float32Array<ArrayBuffer>;

    const scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix") as WebGLUniformLocation;
    gl.uniformMatrix4fv(scaleMatrix, false, formMatrix);

    //* Draw
    gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(animate);
  };

  animate(0);
})();
