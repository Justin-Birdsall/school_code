// Source: https://twigl.app/?ol=true&mode=7&source=float%20i,e,f,s,g,k%3D.01%3Bfor(o%2B%2B%3Bi%2B%2B<1e2%3Bg%2B%3Dmin(f,max(.03,e))*.3){s%3D2.%3Bvec3%20p%3Dvec3((FC.xy-r/s)/r.y*g,g-s)%3Bp.yz*%3Drotate2D(-.8)%3Bp.z%2B%3Dt%3Bfor(e%3Df%3Dp.y%3Bs<2e2%3Bs/%3D.6)p.xz*%3Drotate2D(s),e%2B%3Dabs(dot(sin(p*s)/s,p-p%2B.4)),f%2B%3Dabs(dot(sin(p.xz*s*.6)/s,r/r))%3Bo%2B%3D(f>k*k%3Fe:-exp(-f*f))*o*k%3B}
//
// float i,e,f,s,g,k=.01;for(o++;i++<1e2;g+=min(f,max(.03,e))*.3){s=2.;vec3 p=vec3((FC.xy-r/s)/r.y*g,g-s);p.yz*=rotate2D(-.8);p.z+=t;for(e=f=p.y;s<2e2;s/=.6)p.xz*=rotate2D(s),e+=abs(dot(sin(p*s)/s,p-p+.4)),f+=abs(dot(sin(p.xz*s*.6)/s,r/r));o+=(f>k*k?e:-exp(-f*f))*o*k;}
//
// via: https://twitter.com/zozuar/status/1443012484189888515
//
#version 300 es
uniform float time;
uniform float frame;
uniform vec2 resolution;
in vec4 v_texcoord;
out vec4 FragColor;

#define PI 3.14159265
#define FC gl_FragCoord

mat2 rotate2D(float r)
{
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

mat3 rotate3D(float angle, vec3 axis)
{
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    return mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c
    );
}

void main()
{
  vec2 r = resolution;
  float t = time;
  float f = frame;
  vec4 o = vec4(1.0);
  vec3 p = vec3(0.0);

  //float i,e,f,s,g,k=.01;
  float i=0,e=0,s=0,g=0,k=.01;
  for(;i++<1e2;g+=min(f,max(.03,e))*.3)
  {
    s=2.;
    vec3 p=vec3((FC.xy-r/s)/r.y*g,g-s);
    p.yz*=rotate2D(-.8);
    p.z+=t;
    for(e=f=p.y;s<2e2;s/=.6)
      p.xz*=rotate2D(s),e+=abs(dot(sin(p*s)/s,p-p+.4)),f+=abs(dot(sin(p.xz*s*.6)/s,r/r));
      o+=(f>k*k?e:-exp(-f*f))*o*k;
  }
  FragColor = o;
}









