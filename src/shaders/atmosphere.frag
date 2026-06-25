uniform vec3 glowColor;
uniform float glowIntensity;
uniform float rimPower;
uniform float time;

varying vec3 vNormal;
varying vec3 vViewDirection;

void main() {
  float fresnel = 1.0 - max(dot(normalize(vViewDirection), normalize(vNormal)), 0.0);
  float rim = pow(fresnel, rimPower);
  rim = smoothstep(0.6, 1.0, rim);
  vec3 color = glowColor * rim * glowIntensity;
  gl_FragColor = vec4(color, rim * 0.4);
}
