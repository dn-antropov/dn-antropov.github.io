varying vec3 worldNormal;
varying vec3 eyeVector;
varying vec4 worldPos;

uniform float uTime;
uniform float squize;

void main() {
    worldPos = modelMatrix * vec4(position, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;

    gl_Position = projectionMatrix * mvPosition;
    float deform = smoothstep(0.5, 1., distance(gl_Position.xyz, vec3(0.)));
    float curved_squize =  squize;
    // ease out quart
    curved_squize = 1. - (1. - curved_squize) * (1. - curved_squize);
    gl_Position.y *= (cos(deform + curved_squize * 6.283) * 0.25 + 0.75);
    vec3 transformedNormal = normalMatrix * normal;
    worldNormal = normalize(transformedNormal);

    eyeVector = normalize(worldPos.xyz - cameraPosition);
}
