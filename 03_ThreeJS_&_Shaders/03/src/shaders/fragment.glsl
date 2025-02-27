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
