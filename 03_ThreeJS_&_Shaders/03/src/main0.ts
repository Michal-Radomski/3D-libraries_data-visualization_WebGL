// Get the canvas element
const canvas = document.querySelector("canvas.draw") as HTMLCanvasElement;
const gl = canvas.getContext("webgl") as WebGLRenderingContext;

// Define the shaders
const vertexShaderSource: string = /*glsl*/ `
    #version 100
    attribute vec2 points;
    void main(void) {
        gl_Position = vec4(points, 0.0, 1.0);
    }
`;

const fragmentShaderSource: string = /*glsl*/ `
    #version 100
    void main(void) {
        gl_FragColor = vec4(0.18, 0.54, 0.34, 1.0);
    }
`;

// Create and compile shaders
function createShader(type: number, source: string): WebGLShader {
  const shader = gl.createShader(type) as WebGLShader;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const vertexShader: WebGLShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader: WebGLShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

// Create a program and attach shaders
const program: WebGLProgram = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Use the program
gl.useProgram(program);

// Example vertex data
const vertices: Float32Array<ArrayBuffer> = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

// Create a buffer and draw
const buffer: WebGLBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const positionLocation: number = gl.getAttribLocation(program, "points");
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

gl.drawArrays(gl.TRIANGLES, 0, 3);
