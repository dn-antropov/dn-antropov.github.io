varying vec2 vUv;
varying float vProgress;

void main() {
    if (vProgress >= 1.0) discard;

    float d = distance(vUv, vec2(0.5));
    float edge = fwidth(d);
    float radius = mix(0.05, 0.48, vProgress);
    float width = mix(0.08, 0.01, vProgress);
    float inner = smoothstep(radius - width - edge, radius - width, d);
    float outer = 1.0 - smoothstep(radius, radius + edge, d);
    float alpha = inner * outer * (1.0 - vProgress);

    if (alpha <= 0.0) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
