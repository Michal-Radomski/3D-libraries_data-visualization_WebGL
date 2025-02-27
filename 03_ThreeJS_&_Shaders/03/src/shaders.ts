//* Define the shaders
export const vertexShaderSource: string = /*glsl*/ `
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float u_amplitude;
uniform float u_time;

attribute vec3 position;
attribute vec2 uv;
attribute float a_modulus;

varying vec3 v_position;
varying vec2 v_uv;
varying float v_a_modulus;

void main() {
   // vec4 modelPosition = modelMatrix * vec4(position * 2.0,1.0);
   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   // modelPosition.x += a_modulus;
   // modelPosition.y += a_modulus;
   // modelPosition.z += a_modulus;
   // modelPosition.z += a_modulus *0.1;
   // modelPosition.z += sin(modelPosition.x * 12.0) *0.15;
   modelPosition.z += sin(modelPosition.x *u_amplitude+u_time) *0.15;

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
uniform vec3 u_color;
uniform float u_timecolor;
uniform vec2 u_cursorcolor;

varying vec3 v_position;
varying vec2 v_uv;

varying float v_a_modulus;

void main() {
    // gl_FragColor = vec4(1.0, 1.0, 1.0,1.0);
    // gl_FragColor = vec4(v_position,1.0);
    // gl_FragColor = vec4(v_uv, 1.0,1.0);
    // gl_FragColor = vec4(1.0,v_uv.x, 1.0,1.0);

    // gl_FragColor = vec4(v_a_modulus, 1.0, 1.0,1.0); //Testing v_a_modulus attribute
    // gl_FragColor = vec4(u_color,0.4);
    // gl_FragColor = vec4(u_timecolor,u_timecolor,u_timecolor,1.0);

    //* Changing gl_FragColor depending on the elapsedTime
    // gl_FragColor.r = 1.0+sin(u_timecolor);
    // gl_FragColor.g = cos(u_timecolor);
    // gl_FragColor.b = -sin(u_timecolor);
    // gl_FragColor.w = 0.75;

    //* Changing gl_FragColor depending on the mouse move
    gl_FragColor = vec4(u_cursorcolor.x,u_cursorcolor.y,1.0,1.0);
}
`;
