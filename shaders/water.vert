attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler4;
varying vec2 vTextureCoord;
uniform float timeFactor;


void main() {
	
	vTextureCoord = aTextureCoord;
	
	vec2 textcoord = mod(vTextureCoord +timeFactor * 0.015, 1.0);
	vec4 filter = texture2D(uSampler4,textcoord);

	vec3 offset = aVertexNormal * filter.b * 0.05;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);



}

