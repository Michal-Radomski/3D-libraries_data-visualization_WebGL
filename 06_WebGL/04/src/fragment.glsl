// precision lowp float;
// precision mediump float;
precision highp float;
varying vec3 vColor;

void main(void) {
    gl_FragColor = vec4(vColor, 0.3);
    // gl_FragColor = vec4(0.28, 0.31, 0.75, 0.42);
}
