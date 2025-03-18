// precision mediump float;
precision highp float;
attribute vec3 position;
uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;
attribute vec2 textureCoord;
varying vec2 vTextureCoord;
uniform vec3 translation;

void main() {
  vTextureCoord = textureCoord;
  gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position + translation, 1.0);
}
