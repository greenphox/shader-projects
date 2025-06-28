// Author: greenphox 
// Title: AAAAAAAAAAAAAAAAAAA

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float size=0.968;
vec3 BGcolor=vec3(0.030,0.050,0.080);
vec3 rotation=vec3(.3,.5,.8);
float perspective=0.;
float brightnessz=1.708;//variable brightness
float brightnessc=0.628;//constant brightness 

struct tr
{
	mat3 points;
    vec3 color;
	float ntransp;
};

float semiPlain(vec2 start_pos,vec2 end_pos,vec2 pnt){
    vec2 t_st=normalize(pnt-start_pos);
    vec2 t_end=normalize(end_pos-start_pos);
	float dot=t_st.x*-t_end.y + t_st.y*t_end.x;
    
    float pct=dot;

    return step(0.,pct);
}

mat3 RotateMatrix(){
    float clock=u_time;
    mat3 rotationmatrix;
    float a=rotation.x*clock;
    float b=rotation.y*clock;
    float c=rotation.z*clock;
	rotationmatrix[0]=vec3(cos(b)*cos(c),cos(b)*sin(c),-sin(b));
	rotationmatrix[1]=vec3(sin(a)*sin(b)*cos(c)-(cos(a)*sin(c)),sin(a)*sin(b)*sin(c)+cos(a)*cos(c),sin(a)*cos(b));
	rotationmatrix[2]=vec3(cos(a)*sin(b)*cos(c)+sin(a)*sin(c),cos(a)*sin(b)*sin(c)-sin(a)*cos(c),cos(a)*cos(b));  
    return rotationmatrix;    
}

struct pixinf{
    vec3 color;
    float z;
    bool visible;
};

float FindZ(tr mtr, vec2 st){
	vec3 a=mtr.points[0];
	vec3 b=mtr.points[1]-mtr.points[0];
	vec3 c=mtr.points[2]-mtr.points[0];
    
	float dzdy=(c.x*b.z-c.z*b.x)/(c.x*b.y-b.x*c.y);
	float dzdx=(c.y*b.z-c.z*b.y)/(c.y*b.x-b.y*c.x);
    
	return dzdx*(st.x-a.x)+dzdy*(st.y-a.y)+a.z;
}

pixinf inCube(tr mtr,vec2 st,mat3 rotationmatrix,pixinf cur) {
    pixinf information=cur;
    
	mtr.points[0]=rotationmatrix*mtr.points[0];
	mtr.points[1]=rotationmatrix*mtr.points[1];
	mtr.points[2]=rotationmatrix*mtr.points[2];

	mtr.points[0].xy+=(mtr.points[0]).xy*(mtr.points[0].z)*perspective;
	mtr.points[1].xy+=(mtr.points[1]).xy*(mtr.points[1].z)*perspective;
	mtr.points[2].xy+=(mtr.points[2]).xy*(mtr.points[2].z)*perspective;
    
	vec3 pnt0=mtr.points[0];
	vec3 pnt1=mtr.points[1];
	vec3 pnt2=mtr.points[2];
    information.visible=bool(
    	semiPlain(pnt0.xy,pnt1.xy,st)*
    	semiPlain(pnt1.xy,pnt2.xy,st)*
    	semiPlain(pnt2.xy,pnt0.xy,st)+
    	semiPlain(pnt1.xy,pnt0.xy,st)*
    	semiPlain(pnt2.xy,pnt1.xy,st)*
    	semiPlain(pnt0.xy,pnt2.xy,st));
    
    information.z=FindZ(mtr,st);
    
    
    if (information.visible==true){
        if (information.z>cur.z){
            information.color=mix(cur.color,mtr.color,mtr.ntransp);
			information.color*=((information.z+.5)/2.*brightnessz)+brightnessc;    
            return information;
        }
    }
    return cur;
}

const int n=20;

void main() {
    mat3 rotationmatrix=RotateMatrix();
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st*=2.*(1./size);
	st-=(1./size);
    
    vec2 vtest1=vec2(1.,3.);
    vec2 vtest2=vec2(3.,5.);
    mat2 mtest=mat2(vtest1,vtest2);
    
	vec3 point0=vec3(-.5,-.5,-.5)-vec3(.5);
	vec3 point1=vec3(-.5,-.5,.5)-vec3(.5);
	vec3 point2=vec3(-.5,.5,-.5)-vec3(.5);
	vec3 point3=vec3(.5,-.5,-.5)-vec3(.5);
	vec3 point4=vec3(-.5,.5,.5)-vec3(.5);
	vec3 point5=vec3(.5,-.5,.5)-vec3(.5);
	vec3 point6=vec3(.5, .5, -.5)-vec3(.5);
	vec3 point7=vec3(.5,.5,.5)-vec3(.5);
    
    tr trs[n];

    trs[0].points = mat3 (point0,point1,point2);
    trs[0].color = vec3(0.612,0.965,0.445);
    trs[0].ntransp = 1.;

    trs[1].points = mat3 (point1,point2,point3);
    trs[1].color = vec3(0.612,0.965,0.445);
    trs[1].ntransp = 1.;

    trs[2].points = mat3 (point0,point3,point2);
    trs[2].color = vec3(0.612,0.965,0.445);
    trs[2].ntransp = 1.;

    trs[3].points = mat3 (point0,point1,point3);
    trs[3].color = vec3(0.612,0.965,0.445);
    trs[3].ntransp = 1.;

    trs[4].points = mat3 (point0,point1,point3);
    trs[4].color = vec3(0.612,0.965,0.445);
    trs[4].ntransp = 1.;

    trs[5].points = mat3 (point0,point1,point3);
    trs[5].color = vec3(0.612,0.965,0.445);
    trs[5].ntransp = 1.;

    trs[6].points = mat3 (point0,point1,point3);
    trs[6].color = vec3(0.612,0.965,0.445);
    trs[6].ntransp = 1.;

   
    vec3 final=vec3(0.,0.,0.);	
 	bool visible=false;
    float dist=0.;
    pixinf cur;
    cur.visible=false;
    cur.z=-100.;
    
    for (int i=0; i<n; i++){
	    cur=inCube(trs[i],st,rotationmatrix,cur);
    }
    
    if (cur.visible)
		final=cur.color;
    else
        final=BGcolor;
    gl_FragColor = vec4(final,1.0);
}


