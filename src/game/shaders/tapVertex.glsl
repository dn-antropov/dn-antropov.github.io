#include <common>

attribute float aProgress;

varying vec2 vUv;
varying float vProgress;

void main() {
    vUv = uv;
    vProgress = aProgress;
    #include <begin_vertex>
    #include <project_vertex>
}
