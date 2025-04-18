uniform vec2 winResolution;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 cutPlaneNormal;

varying vec3 worldNormal;
varying vec3 eyeVector;

varying vec4 worldPos;

const int ITER = 16;
float uIorR = 1.01;
float uIorY = 1.16;
float uIorG = 1.015;
float uIorC = 1.22;
float uIorB = 1.02;
float uIorV = 1.22;

const float uRefractPower = 0.5;
const float uChromaticAberration = 0.4;

const vec3 uLight = vec3(10.0, -10.0, 5.0);
const float uShininess = 2.0;
const float uDiffuseness = 0.1;

const float uFresnelPower = 1.0;

float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
  float fresnelFactor = abs(dot(eyeVector, worldNormal));
  float inversefresnelFactor = 1.0 - fresnelFactor;

  return pow(inversefresnelFactor, power);
}

float specular(vec3 light, float shininess, float diffuseness) {
  vec3 normal = worldNormal;
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeVector + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH =  dot(normal, halfVector);
  float NdotH2 = NdotH * NdotH;

  float kDiffuse = max(0.0, NdotL);
  float kSpecular = pow(NdotH2, shininess);

  return  kSpecular + kDiffuse * diffuseness;
}

vec3 sat(vec3 rgb, float intensity) {
  vec3 L = vec3(0.2125, 0.7154, 0.0721);
  vec3 grayscale = vec3(dot(rgb, L));
  return mix(grayscale, rgb, intensity);
}

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

void animate() {
  uIorR = noise(uTime*0.1 + 000.0) * 0.16 + 1.0;
  uIorY = noise(uTime*0.1 + 110.0) * 0.22 + 1.0;
  uIorG = noise(uTime*0.1 + 220.0) * 0.01 + 1.0;
  uIorC = noise(uTime*0.1 + 330.0) * 0.22 + 1.0;
  uIorB = noise(uTime*0.1 + 440.0) * 0.22 + 1.0;
  uIorV = noise(uTime*0.1 + 550.0) * 0.01 + 1.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec3 normal = worldNormal;

  animate();

  vec3 color = vec3(0.0);
  for(int i = 0; i < ITER; i++) {
    float slide = float(i) / float(ITER) * 0.1;

    vec3 refractVecR = refract(eyeVector, normal, 1.0/uIorR);
    vec3 refractVecY = refract(eyeVector, normal, 1.0/uIorY);
    vec3 refractVecG = refract(eyeVector, normal, 1.0/uIorG);
    vec3 refractVecC = refract(eyeVector, normal, 1.0/uIorC);
    vec3 refractVecB = refract(eyeVector, normal, 1.0/uIorB);
    vec3 refractVecV = refract(eyeVector, normal, 1.0/uIorV);

    float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;

    float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
               texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
               texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;

    float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;

    float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
               texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
               texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;
    float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;

    float v = (texture2D(uTexture, uv + refractVecV.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
               texture2D(uTexture, uv + refractVecV.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
               texture2D(uTexture, uv + refractVecV.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;

    float R = r + (2.0*v + 2.0*y - c)/3.0;
    float G = g + (2.0*y + 2.0*c - v)/3.0;
    float B = b + (2.0*c + 2.0*v - y)/3.0;

    color.r += R;
    color.g += G;
    color.b += B;
    color = sat(color, 1.2);
  }
  color /= float(ITER);

  //add specular lighting
  float specularLight = specular(uLight, uShininess, uDiffuseness);
  color += specularLight * 0.25;

  // add fresnel effect
  // float f = fresnel(eyeVector, normal, uFresnelPower);
  // color.rgb += f * vec3(1.0);

  float cutPlane = dot(worldPos.xyz, cutPlaneNormal);
  float alpha = 1.;
  if (cutPlane > 1.38 || cutPlane < - 1.38 ) {
    discard;
  }

  gl_FragColor = vec4(color, 1);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
