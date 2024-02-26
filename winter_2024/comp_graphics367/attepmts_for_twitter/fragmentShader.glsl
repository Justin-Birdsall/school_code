precision mediump float;

#define PI 3.14159265
#define FC gl_FragCoord

uniform vec2 resolution;
uniform float time;
uniform float frame;

mat2 rotate2D(float r) {
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

mat3 rotate3D(float angle, vec3 axis) {
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

void main() {
    vec2 r = resolution;
    float t = time;
    float f = frame;
    vec4 o = vec4(1.0);
    vec3 p = vec3(0.0);

    float i;
    float e = 0.0;
    float s = 0.0;
    float g = 0.0;
    float k = 0.01;

    for (i = 0.0; i < 100.0; i += 1.0) {
        g += min(f, max(0.03, e)) * 0.3;
        s = 2.0;
        p = vec3((FC.xy - r / s) / r.y * g, g - s);
        p.yz *= rotate2D(-0.8);
        p.z += t;
        for (e = f = p.y; s < 200.0; s /= 0.6) {
            p.xz *= rotate2D(s);
            e += abs(dot(sin(p * s) / s, p - p + vec3(0.4)));
            f += abs(dot(sin(p.xz * s * 0.6) / s, r / r));
        }
        o += (f > k * k ? e : -exp(-f * f)) * o * k;
    }
    gl_FragColor = o;
}

