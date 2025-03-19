// precision mediump float;
precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D sampler;
varying vec3 vColor;

void main() {
  // gl_FragColor = texture2D(sampler, vTextureCoord);
  // gl_FragColor = vec4( vColor, 1.0 );
  gl_FragColor = vec4( vColor, 1.0 ) + texture2D(sampler, vTextureCoord);
}
