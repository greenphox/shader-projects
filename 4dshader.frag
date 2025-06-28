#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
mat4 R1 = mat4(1.0);
mat4 R2 = mat4(1.0);
mat4 R3 = mat4(1.0);
mat4 R4 = mat4(1.0);
mat4 R5 = mat4(1.0);
mat4 R6 = mat4(1.0);


float shell(vec4 st){
    float n=.5;
	float r=1.252;
    return step(pow(abs(st.r),n)+pow(abs(st.g),n)+pow(abs(st.b),n)+pow(abs(st.a),n),pow(r,n));
}

float cube(vec4 st){
	float l=0.424;
    return step( max(abs(st.r) , max(abs(st.g), max(abs(st.b),abs(st.a)))),l);
}

float cross(vec4 st){
	float l=0.424;
    return step( pow(st.x,1./2.)+pow(st.y,1./2.)+pow(st.z,1./2.)+pow(st.w,1./2.),l);
}


float sphere(vec4 st){
    float n=2.;
	float r=0.424;
    return step(pow(st.r,n)+pow(st.g,n)+pow(st.b,n)+pow(st.a,n),pow(r,n));
}

float torus(vec4 st){
	float r=0.112;
	float R=0.416;
	return step(pow(pow(pow(st.r,2.)+pow(st.g,2.),1./2.)-R,2.)+pow(st.b,2.)+pow(st.a,2.),pow(r,2.));
}

float cone(vec4 st){
	float R=0.176;
	return step(pow(st.r,2.)+pow(st.g,2.)+pow(st.b,2.),R*pow(st.a,4.)+0.003);
}

float paraboloid(vec4 st){
	float R=0.328;
	return step(pow(st.r,2.)+pow(st.g,2.)+pow(st.b,2.),abs(st.a));
}
float realshape(vec4 st){ //1 if is in shape, 0 if it isn't
	return shell(st);
}

vec4 rotate(vec4 v){
    v*=R1;
    v*=R2;
    v*=R3;
    v*=R4;
    v*=R5;
  //  st*=R6;
    return v;
}

void rotateMatrix(){
    float clock=u_time;
    float a=clock*0.424;
    float b=clock*0.872;
    float c=clock*0.392;
    float d=clock*0.496;
    float e=clock*0.632;
//    float f=clock*0.692;
    
    R1*=mat4(cos(a), sin(a), 0, 0, -sin(a), cos(a), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    R2*=mat4(cos(b), 0, sin(b), 0, 0, 1, 0, 0, -sin(b), 0, cos(b), 0, 0, 0, 0, 1);
    R3*=mat4(cos(c), 0, 0, sin(c), 0, 1, 0, 0, 0, 0, 1, 0, -sin(c), 0, 0, cos(c));
    R4*=mat4(1, 0, 0, 0, 0, cos(d), sin(d), 0, 0, -sin(d), cos(d), 0, 0, 0, 0, 1);
    R5*=mat4(1, 0, 0, 0, 0, cos(e), 0, sin(e), 0, 0, 1, 0, 0, -sin(e), 0, cos(e));
//    R6*=mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, cos(f), sin(f), 0, 0, -sin(f), cos(f));
    return ;
}
float norm(float x){
    return (x+1.)/2.;
}

void main() {
	rotateMatrix();
    vec2 st = (gl_FragCoord.xy/u_resolution.xy-.5)*2.;
    st.x *= u_resolution.x/u_resolution.y;
    
	float z=-1.; // maximum number of Z where (st,z) is in the shape
    float redness=0.;
	gl_FragColor = vec4(.0);
	bool br=false;
    const int n=15;
    
//    st.x=floor(st.x*float(n))/float(n);
//    st.y=floor(st.y*float(n))/float(n);

    
    for (int intz=-n;intz<=n;intz++){
        float z=float(intz)/float(n); //reali goes from -1 to 1
        for (int intw=-n;intw<=n;intw++){
            float w=float(intw)/float(n); //reali goes from -1 to 1
            vec4 coords=vec4(st.x,st.y,z,w);
            coords=rotate(coords);
        	if (realshape(coords)>=0.9){
               gl_FragColor = vec4(norm(coords.a),0.,1.-norm(coords.a),norm(-coords.z));
//               gl_FragColor = vec4(norm(-coords.w),norm(coords.y),norm(-coords.z),norm(coords.x));
                
            	br=true;
                break;
            }
        }
        if (br){
            br=false;
            break;
        }
    }
}






