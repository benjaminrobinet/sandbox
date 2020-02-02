precision mediump float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

uniform vec2 mousePosition;

varying vec2 vTextureCoord;

void main(void)
{

//    vec2 newPos = aVertexPosition + mousePosition;
    vec4 position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.);

    gl_Position = position;
    vTextureCoord = aTextureCoord;
}