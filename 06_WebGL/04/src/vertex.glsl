// precision mediump float;
precision highp float;
attribute vec3 position;
uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;
attribute vec2 textureCoord;
varying vec2 vTextureCoord;
uniform vec3 translation;
uniform mat4 scaleMatrix;

attribute vec3 color;
varying vec3 vColor;

void main() {
  vTextureCoord = textureCoord;
  // gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position + translation, 1.0);
  // gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position + translation, 1.0) * scaleMatrix;
  gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.0) * scaleMatrix + vec4(vec3(translation.x, translation.y, 0.0), -translation.z);
  vColor = color;
}
