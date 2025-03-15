import "./style.scss";
import triangleVertWGSL from "./triangle.vert.wgsl?raw";
import triangleFragWGSL from "./triangle.frag.wgsl?raw";

(async function main(): Promise<void> {
  // Check if WebGPU is supported
  if (!navigator.gpu) {
    console.error("WebGPU is not supported");
    return;
  }

  // Create a canvas and get its context
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  // console.log("canvas:", canvas);
  const context = canvas.getContext("webgpu") as GPUCanvasContext;

  const observer: ResizeObserver = new ResizeObserver(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Note: You might want to add logic to resize your render target textures here.
  });
  observer.observe(canvas);

  // Request a GPU adapter
  const adapter = (await navigator.gpu.requestAdapter()) as GPUAdapter;
  // console.log("adapter:", adapter);

  if (!adapter) {
    console.error("No GPU adapter found");
    return;
  }

  const device: GPUDevice = await adapter.requestDevice({});
  // console.log("device:", device);

  // Compile shaders
  const vertexShader: GPUShaderModule = device.createShaderModule({
    code: triangleVertWGSL as string,
  });

  const fragmentShader: GPUShaderModule = device.createShaderModule({
    code: triangleFragWGSL as string,
  });
  // console.log("vertexShader:", vertexShader, "fragmentShader:", fragmentShader);

  // Create a pipeline
  const pipeline: GPURenderPipeline = device.createRenderPipeline({
    vertex: {
      module: vertexShader,
      entryPoint: "vs_main",
      buffers: [
        {
          arrayStride: 16,
          stepMode: "vertex",
          attributes: [
            {
              shaderLocation: 0,
              offset: 0,
              format: "float32x4",
            },
          ],
        },
      ],
    },
    fragment: {
      module: fragmentShader,
      entryPoint: "fs_main",
      targets: [
        {
          format: navigator.gpu.getPreferredCanvasFormat(),
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
    },
    layout: "auto",
  });
  // console.log("pipeline:", pipeline);

  // Set up vertex data
  const vertices: Float32Array<ArrayBuffer> = new Float32Array([
    -0.5, -0.5, 0.0, 1.0, 0.5, -0.5, 0.0, 1.0, 0.0, 0.5, 0.0, 1.0,
  ]);

  // Create a buffer for the vertex data
  const vertexBuffer: GPUBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(vertexBuffer.getMappedRange()).set(vertices);
  vertexBuffer.unmap();

  //* Draw
  function draw(): void {
    const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();

    // Create a swap chain
    const swapChainFormat: GPUTextureFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device: device,
      format: swapChainFormat,
      alphaMode: "opaque",
    });
    const textureView: GPUTextureView = context.getCurrentTexture().createView();
    const renderPass: GPURenderPassEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.9, g: 0.5, b: 0.3, a: 0.7 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(3);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(draw);
  }
  draw();
})();
