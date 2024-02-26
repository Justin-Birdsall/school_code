let vertexShaderSource, fragmentShaderSource;

fetch('/Users/justinbirdsall/school_code/winter_2024/fuckk/vs.glsl')
  .then(response => response.text())
  .then(data => {
    vertexShaderSource = data;
    return fetch('/Users/justinbirdsall/school_code/winter_2024/fuckk/ps03.glsl');
  })
  .then(response => response.text())
  .then(data => {
    fragmentShaderSource = data;
    init();
  })
  .catch(error => console.error('Error loading shaders:', error));

function init() {
  // WebGL initialization
  const canvas = document.getElementById('canvas');
  const gl = canvas.getContext('webgl');

  // Compile vertex shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vertexShader));
    return;
  }

  // Compile fragment shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  // Link shaders into a program
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    return;
  }

  // Use the program for rendering
  gl.useProgram(program);

  // Set up other WebGL settings and render here
}
