#include <common>

uniform float time;
uniform vec2 resolution;
varying vec2 vUv;

void main(){
    #include <begin_vertex>

    vUv = uv;

    #include <project_vertex>
}