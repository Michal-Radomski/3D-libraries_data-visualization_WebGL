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

  const vertices = [
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
  ];

  const indexes = [
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
  ];

  const vertex_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const index_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);

  //* Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  const vertCode = [
    "precision mediump float;",
    "attribute vec3 position;",
    "uniform mat4 Pmatrix;",
    "uniform mat4 Vmatrix;",
    "uniform mat4 Mmatrix;",
    "attribute vec2 textureCoord;",
    "varying vec2 vTextureCoord;",
    "uniform vec3 translation;",
    "void main()",
    "{",
    "vTextureCoord = textureCoord;",
    "gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position + translation, 1.0);",
    "}",
  ].join("\n");

  const vertShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;

  gl.shaderSource(vertShader, vertCode);

  gl.compileShader(vertShader);

  const fragCode = [
    "precision mediump float;",
    "varying vec2 vTextureCoord;",
    "uniform sampler2D sampler;",
    "void main()",
    "{",
    "gl_FragColor = texture2D(sampler, vTextureCoord);",
    "}",
  ].join("\n");

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

  const source = document.querySelector("img#CrateImage") as HTMLImageElement;
  // console.log("source:", source);

  //* Create texture
  const boxTexture: WebGLTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, boxTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.bindTexture(gl.TEXTURE_2D, null);

  gl.useProgram(shaderProgram);

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
    rotateZ(mov_matrix, dt * 0.001); // Time
    rotateY(mov_matrix, dt * 0.0004);
    rotateX(mov_matrix, dt * 0.0006);
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

    const tX = 2.0,
      tY = 0.0,
      tZ = -10.0;
    const translation = gl.getUniformLocation(shaderProgram, "translation");
    gl.uniform3f(translation, tX, tY, tZ);

    gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(animate);
  };

  animate(0);
})();
