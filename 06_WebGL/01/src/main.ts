import "./style.scss";

(function main(): void {
  const canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;

  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  console.log("gl:", gl);

  if (!gl) {
    console.log("WebGL failed to initialize");
    return;
  }

  gl.clearColor(0.5, 0.5, 0.5, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
})();

console.log("typeof WebGLRenderingContext:", typeof WebGLRenderingContext);
console.log('typeof WebGLRenderingContext === "undefined":', typeof WebGLRenderingContext === "undefined");
