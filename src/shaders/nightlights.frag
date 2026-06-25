uniform sampler2D nightMap;
uniform vec3 sunDirection;
uniform float cityGlow;

varying vec2 vUv;
varying vec3 vWorldNormal;

void main() {
  vec3 nightColor = texture2D(nightMap, vUv).rgb;
  float sunFacing = dot(normalize(vWorldNormal), normalize(sunDirection));
  float nightBlend = 1.0 - smoothstep(-0.06, 0.14, sunFacing);
  vec3 finalColor = nightColor * cityGlow * nightBlend;
  float nightLuma = max(max(nightColor.r, nightColor.g), nightColor.b);
  gl_FragColor = vec4(finalColor, nightBlend * nightLuma);
}
