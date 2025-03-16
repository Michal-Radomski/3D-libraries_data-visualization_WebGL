import "./style.scss";
import vertCode from "./vertex2.glsl";
import fragCode from "./fragment2.glsl?raw";

(function main(): void {
  const canvas = document.querySelector("canvas#glcanvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;

  if (!gl) {
    alert("Unable to setup WebGL. Your browser or computer may not support it.");
    return;
  }

  const vertices: Float32Array<ArrayBuffer> = new Float32Array([
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1,
    -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1,
    1, 1, -1,
  ]);

  const colors: Float32Array<ArrayBuffer> = new Float32Array([
    5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
  ]);

  const indexes: Uint16Array<ArrayBuffer> = new Uint16Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20,
    22, 23,
  ]);

  const vertex_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const color_buffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  //* Create an empty buffer object to store Index buffer
  const index_buffer: WebGLBuffer = gl.createBuffer();

  //* Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

  //* Pass the vertex data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

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
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

  //* Position Buffer Binding
  gl.enableVertexAttribArray(position);

  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  const color: number = gl.getAttribLocation(shaderProgram, "color");
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

  //* Color Buffer Binding
  gl.enableVertexAttribArray(color);
  gl.useProgram(shaderProgram);

  //* MATRIX
  const get_projection = (angle: number, a: number, zMin: number, zMax: number): number[] => {
    const ang: number = Math.tan((angle * 0.5 * Math.PI) / 180);

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

  const animate = function (time: number): void {
    const dt: number = time - previous_time;
    rotateZ(mov_matrix, dt * 0.001); //time
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
    gl.drawElements(gl.TRIANGLES, indexes.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(animate);
  };

  animate(0);
})();
