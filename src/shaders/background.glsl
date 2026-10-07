uniform vec2 winResolution;
uniform float uTime;
uniform float desaturation;

vec3 contrast(vec3 color, float contrast)
{
    float midpoint = pow(0.5, 2.2);
    return ((color - midpoint) * contrast + midpoint);
}
void main() {
    vec2 uv = gl_FragCoord.xy / winResolution.xy;
    uv.y *= winResolution.y / winResolution.x;
    float d = -uTime * 0.09;
    float a = 0.0;
    for (float i = 0.0; i < 4.0; ++i) {
        a += cos(i - d - a * uv.x * 2.);
        d += sin(uv.y * i * 2. + a);
    }
    d += uTime * 0.09;
    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
    col.g *= 0.69;
    float luminance = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722)) * 0.5;
    vec3 desaturated = mix(col.rgb, vec3(luminance), desaturation);
    desaturated = contrast(desaturated, 1.5);
    gl_FragColor = vec4(desaturated, 1);
}
