varying vec2 vUv;
#define PI 3.1415926535897932384626433832795

void main()
{
    vec3 color = vec3(0.);
	vec2 uv = vUv;
    
    float width = 0.090;
    float height = 0.400;
    
    //Left bottom
	float lineLeftBottomUpY = 1. - step(height, uv.y);
    float lineLeftBottomUpX = 1. - step(width, uv.x);
    float draw = lineLeftBottomUpX * lineLeftBottomUpY;
    
    float lineLeftBottomDownY = 1. - step(width, uv.y);
    float lineLeftBottomDownX = 1. - step(height, uv.x);
    draw += lineLeftBottomDownX * lineLeftBottomDownY;
    
    //Left top
    float lineLeftTopUpY = 1. - step(height, 1. - uv.y);
    float lineLeftTopUpX = 1. - step(width, uv.x);
    draw += lineLeftTopUpX * lineLeftTopUpY;
    
    float lineLeftTopDownY = 1. - step(width, 1. - uv.y);
    float lineLeftTopDownX = 1. - step(height, uv.x);
    draw += lineLeftTopDownX * lineLeftTopDownY;
    
    //Right bottom
	float lineRightBottomUpY = 1. - step(height, uv.y);
    float lineRightBottomUpX = 1. - step(width, 1.- uv.x);
    draw += lineRightBottomUpX * lineRightBottomUpY;
    
    float lineRightBottomDownY = 1. - step(width, uv.y);
    float lineRightBottomDownX = 1. - step(height, 1.- uv.x);
    draw += lineRightBottomDownX * lineRightBottomDownY;
    
    //Right top
    float lineRightTopUpY = 1. - step(height, 1. - uv.y);
    float lineRightTopUpX = 1. - step(width, 1.- uv.x);
    draw += lineRightTopUpX * lineRightTopUpY;
    
    float lineRightTopDownY = 1. - step(width, 1. - uv.y);
    float lineRightTopDownX = 1. - step(height, 1. - uv.x);
    draw += lineRightTopDownX * lineRightTopDownY;

    
    color = vec3(draw);

	//color = mix(vec3(1., 0., 0.), vec3(0., 0., 1.), uv.x) * color;
    

    gl_FragColor = vec4(color,1.0);

    
}