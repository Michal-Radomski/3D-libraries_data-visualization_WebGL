//* Define the shaders
export const vertexShaderSource: string = /*glsl*/ `
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute float a_modulus;

varying vec3 v_position;
varying vec2 v_uv;
varying float v_a_modulus;

void main() {
   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   // modelPosition.x += a_modulus;
   // modelPosition.y += a_modulus;
   // modelPosition.z += a_modulus;
   modelPosition.z += a_modulus *0.1;
   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix * viewPosition;

   gl_Position = projectionPosition;

   v_position = position;
   v_uv = uv;
   v_a_modulus = a_modulus;
}
`;

export const fragmentShaderSource: string = /*glsl*/ `
precision mediump float;

varying vec3 v_position;
varying vec2 v_uv;

varying float v_a_modulus;

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0,1.0);
    // gl_FragColor = vec4(v_position,1.0);
    // gl_FragColor = vec4(v_uv, 1.0,1.0);
    // gl_FragColor = vec4(1.0,v_uv.x, 1.0,1.0);

    gl_FragColor = vec4(v_a_modulus, 1.0, 1.0,1.0); //Testing v_a_modulus attribute
}
`;
