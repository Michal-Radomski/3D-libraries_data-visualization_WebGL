// precision mediump float;
precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D sampler;

void main() {
  gl_FragColor = texture2D(sampler, vTextureCoord);
}
