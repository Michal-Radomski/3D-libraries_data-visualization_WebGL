#version 100

attribute vec2 points;

void main(void) {
    gl_Position = vec4(points, 0.0, 1.0);
}
