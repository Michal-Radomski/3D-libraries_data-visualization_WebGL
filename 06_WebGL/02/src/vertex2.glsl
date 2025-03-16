attribute vec3 position; // Vertex position attribute
uniform mat4 Pmatrix;    // Projection matrix
uniform mat4 Vmatrix;    // View matrix
uniform mat4 Mmatrix;    // Model matrix
attribute vec3 color;     // Vertex color attribute
varying vec3 vColor;     // Varying variable for color

void main() {
    gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.0); // Corrected order
    vColor = color;
}
