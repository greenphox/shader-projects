// Author: greenphox 
// Title: AAAAAAAAAAAAAAAAAAA

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float size=0.156;
float point_size=0.0;
vec3 color=vec3(1.000,0.189,0.170);
float line_size=0.00;
float faces=0.5;
vec3 rotation=vec3(.3,.7,.5);
float change=0.;
float perspective=1.;


float DrawLine(float stColor,float endColor,vec2 stpos,vec2 endpos,vec2 st){
    vec2 t_st=stpos-st;
    vec2 t_end=stpos-endpos;
    float l_angle=t_end.y/t_end.x;
    float p_angle=t_st.y/t_st.x;


    float closines=length(t_st)+length(t_end-t_st);
    float pct=1.-(closines-length(t_end));
    pct=step(1.-line_size,pct)-step(1.,pct);
    
    float mix_pct=length(t_st)/length(t_end);
    float color=mix(stColor,endColor,mix_pct);
    
    return color*pct;
}

float semiPlain(vec2 start_pos,vec2 end_pos,vec2 point){
    vec2 t_st=normalize(point-start_pos);
    vec2 t_end=normalize(end_pos-start_pos);
	float dot=t_st.x*-t_end.y + t_st.y*t_end.x;
    
//    float point_angle=acos(acos(dot(t_st, t_end)));
    float pct=dot;

    return step(0.,pct);
}


float inCube(float x,float y) {
	float ins=0.;
    
    vec2 st=vec2(x,y);
    
    mat3 rotationmatrix;
    float a=rotation.x*u_time;
    float b=rotation.y*u_time;
    float c=rotation.z*u_time;
    
	rotationmatrix[0]=vec3(cos(b)*cos(c),cos(b)*sin(c),-sin(b));
	rotationmatrix[1]=vec3(sin(a)*sin(b)*cos(c)-(cos(a)*sin(c)),sin(a)*sin(b)*sin(c)+cos(a)*cos(c),sin(a)*cos(b));
	rotationmatrix[2]=vec3(cos(a)*sin(b)*cos(c)+sin(a)*sin(c),cos(a)*sin(b)*sin(c)-sin(a)*cos(c),cos(a)*cos(b));
    
    vec3 point0=vec3(-size,-size,-size)*rotationmatrix;   
    vec3 point1=vec3(-size,-size,size)*rotationmatrix;
    vec3 point2=vec3(-size,size,-size)*rotationmatrix;
    vec3 point3=vec3(-size,size,size)*rotationmatrix;
    vec3 point4=vec3(size,-size,-size)*rotationmatrix;
    vec3 point5=vec3(size,-size,size)*rotationmatrix;
    vec3 point6=vec3(size,size,-size)*rotationmatrix;
    vec3 point7=vec3(size,size,size)*rotationmatrix;
    
    point0.xy+=point0.xy*(point0.z)*perspective;
    point1.xy+=point1.xy*(point1.z)*perspective;
    point2.xy+=point2.xy*(point2.z)*perspective;
    point3.xy+=point3.xy*(point3.z)*perspective;
    point4.xy+=point4.xy*(point4.z)*perspective;
    point5.xy+=point5.xy*(point5.z)*perspective;
    point6.xy+=point6.xy*(point6.z)*perspective;
    point7.xy+=point7.xy*(point7.z)*perspective;
    
    
    
    ins=max(ins,(point0.z+.5)*(step(-point_size,point0.x-x)-step(point_size,point0.x-x))*(step(-point_size,point0.y-y)-step(point_size,point0.y-y)));
    ins=max(ins,(point1.z+.5)*(step(-point_size,point1.x-x)-step(point_size,point1.x-x))*(step(-point_size,point1.y-y)-step(point_size,point1.y-y)));
    ins=max(ins,(point2.z+.5)*(step(-point_size,point2.x-x)-step(point_size,point2.x-x))*(step(-point_size,point2.y-y)-step(point_size,point2.y-y)));
    ins=max(ins,(point3.z+.5)*(step(-point_size,point3.x-x)-step(point_size,point3.x-x))*(step(-point_size,point3.y-y)-step(point_size,point3.y-y)));
    ins=max(ins,(point4.z+.5)*(step(-point_size,point4.x-x)-step(point_size,point4.x-x))*(step(-point_size,point4.y-y)-step(point_size,point4.y-y)));
    ins=max(ins,(point5.z+.5)*(step(-point_size,point5.x-x)-step(point_size,point5.x-x))*(step(-point_size,point5.y-y)-step(point_size,point5.y-y)));
    ins=max(ins,(point6.z+.5)*(step(-point_size,point6.x-x)-step(point_size,point6.x-x))*(step(-point_size,point6.y-y)-step(point_size,point6.y-y)));
    ins=max(ins,(point7.z+.5)*(step(-point_size,point7.x-x)-step(point_size,point7.x-x))*(step(-point_size,point7.y-y)-step(point_size,point7.y-y)));
    
    float line1=DrawLine(point0.z+.5,point1.z+.5,point0.xy,point1.xy,st );
    float line2=DrawLine(point0.z+.5,point2.z+.5,point0.xy,point2.xy,st );
    float line3=DrawLine(point1.z+.5,point3.z+.5,point1.xy,point3.xy,st );
    float line4=DrawLine(point2.z+.5,point3.z+.5,point2.xy,point3.xy,st );
    float line5=DrawLine(point0.z+.5,point4.z+.5,point0.xy,point4.xy,st );
    float line6=DrawLine(point4.z+.5,point5.z+.5,point4.xy,point5.xy,st );
    float line7=DrawLine(point1.z+.5,point5.z+.5,point1.xy,point5.xy,st );
    float line8=DrawLine(point2.z+.5,point6.z+.5,point2.xy,point6.xy,st );
    float line9=DrawLine(point4.z+.5,point6.z+.5,point4.xy,point6.xy,st );
    float line10=DrawLine(point3.z+.5,point7.z+.5,point3.xy,point7.xy,st );
    float line11=DrawLine(point5.z+.5,point7.z+.5,point5.xy,point7.xy,st );
    float line12=DrawLine(point6.z+.5,point7.z+.5,point6.xy,point7.xy,st );

    
    ins=max(ins,line1);
    ins=max(ins,line2);
    ins=max(ins,line3);
    ins=max(ins,line4);
    ins=max(ins,line5);
    ins=max(ins,line6);
    ins=max(ins,line7);
    ins=max(ins,line8);
    ins=max(ins,line9);
    ins=max(ins,line10);
    ins=max(ins,line11);
    ins=max(ins,line12);
    
    //finding the first face:
    float dist=length(point0.xy-st)+length(point1.xy-st)+length(point2.xy-st)+length(point3.xy-st);
    float face11=semiPlain(point0.xy,point1.xy,st)*
        semiPlain(point1.xy,point3.xy,st)*
        semiPlain(point3.xy,point2.xy,st)*
        semiPlain(point2.xy,point0.xy,st);
    float face12=semiPlain(point1.xy,point0.xy,st)*
        semiPlain(point3.xy,point1.xy,st)*
        semiPlain(point2.xy,point3.xy,st)*
        semiPlain(point0.xy,point2.xy,st);
    float gradient=(point0.z+.5)*(1.-(length(point0.xy-st)/dist))+
        (point1.z)*(1.-(length(point1.xy-st)/dist))+
        (point2.z)*(1.-(length(point2.xy-st)/dist))+
        (point3.z)*(1.-(length(point3.xy-st)/dist));
    face11*=gradient;
    face12*=gradient;
    
    
    dist=length(point1.xy-st)+length(point5.xy-st)+length(point7.xy-st)+length(point3.xy-st);
    float face21=semiPlain(point1.xy,point5.xy,st)*
        semiPlain(point5.xy,point7.xy,st)*
        semiPlain(point7.xy,point3.xy,st)*
        semiPlain(point3.xy,point1.xy,st);
    float face22=semiPlain(point5.xy,point1.xy,st)*
        semiPlain(point1.xy,point3.xy,st)*
        semiPlain(point3.xy,point7.xy,st)*
        semiPlain(point7.xy,point5.xy,st);
    gradient=(point1.z+.5)*(1.-(length(point1.xy-st)/dist))+
        (point5.z)*(1.-(length(point5.xy-st)/dist))+
        (point3.z)*(1.-(length(point3.xy-st)/dist))+
        (point7.z)*(1.-(length(point7.xy-st)/dist));
    face21*=gradient;
    face22*=gradient;

    dist=length(point0.xy-st)+length(point1.xy-st)+length(point5.xy-st)+length(point4.xy-st);
    float face31=semiPlain(point0.xy,point1.xy,st)*
        semiPlain(point1.xy,point5.xy,st)*
        semiPlain(point5.xy,point4.xy,st)*
        semiPlain(point4.xy,point0.xy,st);
    float face32=semiPlain(point4.xy,point5.xy,st)*
        semiPlain(point5.xy,point1.xy,st)*
        semiPlain(point1.xy,point0.xy,st)*
        semiPlain(point0.xy,point4.xy,st);
    gradient=(point0.z+.5)*(1.-(length(point0.xy-st)/dist))+
        (point1.z)*(1.-(length(point1.xy-st)/dist))+
        (point5.z)*(1.-(length(point5.xy-st)/dist))+
        (point4.z)*(1.-(length(point4.xy-st)/dist));
    face31*=gradient;
    face32*=gradient;

    dist=length(point0.xy-st)+length(point4.xy-st)+length(point6.xy-st)+length(point2.xy-st);
    float face41=semiPlain(point0.xy,point4.xy,st)*
        semiPlain(point4.xy,point6.xy,st)*
        semiPlain(point6.xy,point2.xy,st)*
        semiPlain(point2.xy,point0.xy,st);
    float face42=semiPlain(point2.xy,point6.xy,st)*
        semiPlain(point6.xy,point4.xy,st)*
        semiPlain(point4.xy,point0.xy,st)*
        semiPlain(point0.xy,point2.xy,st);
    gradient=(point0.z+.5)*(1.-(length(point0.xy-st)/dist))+
        (point4.z)*(1.-(length(point4.xy-st)/dist))+
        (point6.z)*(1.-(length(point6.xy-st)/dist))+
        (point2.z)*(1.-(length(point2.xy-st)/dist));
    face41*=gradient;
    face42*=gradient;

    dist=length(point4.xy-st)+length(point5.xy-st)+length(point7.xy-st)+length(point6.xy-st);
    float face51=semiPlain(point6.xy,point4.xy,st)*
        semiPlain(point4.xy,point5.xy,st)*
        semiPlain(point5.xy,point7.xy,st)*
        semiPlain(point7.xy,point6.xy,st);
    float face52=semiPlain(point6.xy,point7.xy,st)*
        semiPlain(point7.xy,point5.xy,st)*
        semiPlain(point5.xy,point4.xy,st)*
        semiPlain(point4.xy,point6.xy,st);
    gradient=(point4.z+.5)*(1.-(length(point4.xy-st)/dist))+
        (point5.z)*(1.-(length(point5.xy-st)/dist))+
        (point7.z)*(1.-(length(point7.xy-st)/dist))+
        (point6.z)*(1.-(length(point6.xy-st)/dist));
    face51*=gradient;
    face52*=gradient;

    dist=length(point2.xy-st)+length(point6.xy-st)+length(point7.xy-st)+length(point3.xy-st);
    float face61=semiPlain(point2.xy,point6.xy,st)*
        semiPlain(point6.xy,point7.xy,st)*
        semiPlain(point7.xy,point3.xy,st)*
        semiPlain(point3.xy,point2.xy,st);
    float face62=semiPlain(point3.xy,point7.xy,st)*
        semiPlain(point7.xy,point6.xy,st)*
        semiPlain(point6.xy,point2.xy,st)*
        semiPlain(point2.xy,point3.xy,st);
    gradient=(point2.z+.5)*(1.-(length(point2.xy-st)/dist))+
        (point6.z)*(1.-(length(point6.xy-st)/dist))+
        (point7.z)*(1.-(length(point7.xy-st)/dist))+
        (point3.z)*(1.-(length(point3.xy-st)/dist));
    face61*=gradient;
    face62*=gradient;    
    
    
    
    ins=max(ins,face11*faces);
    ins=max(ins,face12*faces);
    ins=max(ins,face21*faces);
    ins=max(ins,face22*faces);
    ins=max(ins,face31*faces);
    ins=max(ins,face32*faces);
    ins=max(ins,face41*faces);
    ins=max(ins,face42*faces);
    ins=max(ins,face51*faces);
    ins=max(ins,face52*faces);
    ins=max(ins,face61*faces);
    ins=max(ins,face62*faces);

    return ins;
}

void main() {
    size=abs(cos(u_time*change)/5.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st-=.5;
 
    float ins=inCube(st.x,st.y);
    vec3 final=exp(ins*color)-1.;
	
    
    gl_FragColor = vec4(final,1.0);
}
