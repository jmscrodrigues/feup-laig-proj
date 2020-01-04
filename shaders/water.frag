#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler4;
uniform float timeFactor;

void main() {
	vec2 textcoord = mod(vTextureCoord +timeFactor * 0.015, 1.0);

	vec4 color = texture2D(uSampler3, textcoord);
	vec4 filter = texture2D(uSampler4,textcoord);
	if (filter.b > 0.5){
		color.r -= color.r * filter.r *0.2;
		color.b -= color.b* filter.b * 0.2;
		color.g -= color.g* filter.g * 0.2;
	}

	
	gl_FragColor = color;
}