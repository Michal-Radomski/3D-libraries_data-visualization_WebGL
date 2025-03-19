//* V1
// // precision mediump float;
// precision highp float;
// varying vec2 vTextureCoord;
// uniform sampler2D sampler;
// varying vec3 vColor;

// varying vec3 fragNormal;
// uniform vec3 ambientLightIntensity;

// void main() {
//   gl_FragColor = texture2D(sampler, vTextureCoord);
//   gl_FragColor = vec4( vColor, 1.0 );
//   // gl_FragColor = vec4( vColor, 1.0 ) + texture2D(sampler, vTextureCoord);

//   vec3 surfaceNormal = normalize(fragNormal); //* ?
// 	vec4 texel = texture2D(sampler, vTextureCoord);
//   gl_FragColor = vec4( vColor, 1.0 ) + texture2D(sampler, vTextureCoord) + vec4(texel.rgb * ambientLightIntensity, texel.a);
// }

//* V2
// precision mediump float;
precision highp float;

struct DirectionalLight
{
	vec3 direction;
  vec3 color;
};

varying vec2 vTextureCoord;
uniform sampler2D sampler;
varying vec3 vColor;
varying vec3 fragNormal;
uniform vec3 ambientLightIntensity;

uniform DirectionalLight sun;

void main() {
  gl_FragColor = texture2D(sampler, vTextureCoord);
  gl_FragColor = vec4( vColor, 1.0 );
  vec3 surfaceNormal = normalize(fragNormal); //* ?
  vec3 normalSunDirection = normalize(sun.direction);
  vec4 texel = texture2D(sampler, vTextureCoord);
  vec3 lightIntensity = ambientLightIntensity + sun.color * max(dot(fragNormal, normalSunDirection), 0.0);
  gl_FragColor = vec4(texel.rgb * lightIntensity, texel.a);
}
