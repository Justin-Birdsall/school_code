"use strict";
const loc_aPosition = 3;
const loc_aNormal = 5;
const loc_aTexCoord = 7;
const VSHADER_SOURCE =
`#version 300 es
layout(location=${loc_aPosition}) in vec4 aPosition;
layout(location=${loc_aNormal}) in vec4 aNormal;
layout(location=${loc_aTexCoord}) in vec2 aTexCoord;


uniform mat4 uMvpMatrix;
uniform mat4 uModelMatrix;    // Model matrix
uniform mat4 uNormalMatrix;   // Transformation matrix of the normal

out vec3 vNormal;
out vec3 vPosition;
out vec2 vTexCoord;


void main() 
{
  gl_Position = uMvpMatrix * aPosition;

  // Calculate the vertex position in the world coordinate
  vPosition = vec3(uModelMatrix * aPosition);

  vNormal = normalize(vec3(uNormalMatrix * aNormal));
  vTexCoord = aTexCoord;
}`;

// Fragment shader program
const FSHADER_SOURCE =
`#version 300 es
precision highp float;

uniform vec3 uLightColor;     // Light color
uniform vec3 uLightPosition;  // Position of the light source
uniform vec3 uAmbientLight;   // Ambient light color


uniform sampler2D specularMap;


in vec3 vNormal;
in vec3 vPosition;
in vec2 vTexCoord;
out vec4 fColor;

void main() 
{
    vec2 dHdxy;
    vec3 bumpNormal;
    float bumpness = 1.0;
    
    fColor = vec4(0.5, 0.5, 1, 1);

    // Normalize the normal because it is interpolated and not 1.0 in length any more
    vec3 normal = normalize(vNormal);

    // Calculate the light direction and make its length 1.
    vec3 lightDirection = normalize(uLightPosition - vPosition);

    // The dot product of the light direction and the orientation of a surface (the normal)
    float nDotL;
    nDotL = max(dot(lightDirection, normal), 0.0);

    // Calculate the final color from diffuse reflection and ambient reflection
    vec3 diffuse = uLightColor * fColor.rgb * nDotL;
    vec3 ambient = uAmbientLight * fColor.rgb;
    float specularFactor = texture(specularMap, vTexCoord).r; //Extracting the color information from the image

    bumpNormal = normal;
    vec3 specular = vec3(0.0);
    float shiness = 12.0;
    vec3 lightSpecular = vec3(1.0);

    vec3 v = normalize(-vPosition); // EyePosition
    vec3 r = reflect(-lightDirection, bumpNormal); // Reflect from the surface
    specular = lightSpecular * specularFactor * pow(dot(r, v), shiness);

    fColor = vec4( (diffuse + specular) + ambient, fColor.a); // Specular
}`;

function main() {
  const m4 = twgl.m4;
  const gl = document.querySelector('canvas').getContext('webgl2');
  if (!gl) { return alert('need webgl2'); }

  const prgInfo = twgl.createProgramInfo(gl, [VSHADER_SOURCE, FSHADER_SOURCE]);
  const verts = twgl.primitives.createSphereVertices(1, 40, 40);
  // calls gl.createBuffer, gl.bindBuffer, gl.bufferData for each array
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
    aPosition: verts.position,
    aNormal: verts.normal,
    aTexCoord: verts.texcoord,
    indices: verts.indices,
  });
  
  const specularTex = twgl.createTexture(gl, {src: 'https://i.imgur.com/JlIJu5V.jpg'});

  function render(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer for each attribute
    twgl.setBuffersAndAttributes(gl, prgInfo, bufferInfo);

    gl.useProgram(prgInfo.program);

    const fov = 60 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const near = 0.1;
    const far = 20.0;
    const mat = m4.perspective(fov, aspect, near, far);
    
    m4.translate(mat, [0, 0, -3], mat);
    
    const model = m4.rotationY(time / 1000);

    m4.multiply(mat, model, mat);

    // calls gl.activeTexture, gl.bindTexture, gl.uniform
    twgl.setUniforms(prgInfo, {
      uMvpMatrix: mat,
      uModelMatrix: model,    // Model matrix
      uNormalMatrix: model,   // Transformation matrix of the normal
      uLightColor: [1, 1, 1],     // Light color
      uLightPosition: [2, 2, 10], // Position of the light source
      uAmbientLight: [0, 0, 0],   // Ambient light color
      specularMap: specularTex,
    });

    // calls gl.drawArrays or gl.drawElements
    twgl.drawBufferInfo(gl, bufferInfo);
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();

