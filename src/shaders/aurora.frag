uniform float time;
uniform float auroraSpeed;
uniform float auroraIntensity;
uniform vec3 sunDirection;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vec3 normal = normalize(vNormal);
  float latitude = abs(asin(clamp(normal.y, -1.0, 1.0)) * 57.2958);
  float inPolarBand = smoothstep(58.0, 60.0, latitude) * (1.0 - smoothstep(75.0, 77.0, latitude));

  float nightSide = 1.0 - max(dot(normal, normalize(sunDirection)), 0.0);

  float waveA = sin(vUv.x * 22.0 + time * auroraSpeed) * 0.5 + 0.5;
  float waveB = sin(vUv.y * 16.0 - time * auroraSpeed * 0.7 + vUv.x * 5.0) * 0.5 + 0.5;
  float waveC = sin((vUv.x + vUv.y) * 14.0 + time * auroraSpeed * 0.45) * 0.5 + 0.5;
  float band = pow(waveA * waveB * waveC, 1.35);

  vec3 green = vec3(0.0, 1.0, 0.533);
  vec3 violet = vec3(0.533, 0.2, 1.0);
  vec3 auroraColor = mix(green, violet, waveB);

  float alpha = inPolarBand * nightSide * band * auroraIntensity;
  alpha = smoothstep(0.02, 0.4, alpha) * alpha;

  gl_FragColor = vec4(auroraColor * alpha, alpha * 0.9);
}
