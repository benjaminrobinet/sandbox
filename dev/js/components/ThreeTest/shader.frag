uniform float time;
uniform vec2 resolution;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float progress;
uniform float gradientScale;
uniform float angle;
varying vec2 vUv;

#include <common>

void main(){
    float _tmp = smoothstep(0. + progress - gradientScale * 0.5, gradientScale * 0.5 + progress, vUv.x);
    vec4 finalTexture = (_tmp * texture2D(texture1, vUv)) + ((1. - _tmp) * texture2D(texture2, vUv));
    gl_FragColor = finalTexture;
}