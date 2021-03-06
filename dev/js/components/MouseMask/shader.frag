#pragma glslify: snoise = require(glsl-noise/simplex/2d)

precision highp float;

varying vec2 vTextureCoord;

uniform vec2 mousePosition;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform float time;

void main() {
   vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
   float noise = snoise(vTextureCoord + time * 0.0001);
   if (length(mousePosition - screenPos) < 100.0 * (1. + noise * 0.5)) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 0.) * 0.; //yellow circle, alpha=0.7
   } else {
      gl_FragColor = vec4(1., (mousePosition.xy - outputFrame.xy) / outputFrame.zw, 1.0) * 1.5; // blend with underlying image, alpha=0.5
   }
}