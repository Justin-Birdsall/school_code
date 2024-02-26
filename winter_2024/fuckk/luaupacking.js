const vertexShaderSource = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform float time;
uniform float frame;
uniform vec2 resolution;
void main() {
    vec2 r = resolution;
    float t = time;
    float f = frame;
    // Your fragment shader code here...
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Example: Red color
}
`;

// Initialize Twigl
const twigl = new Twigl('webglCanvas');

// Create shaders
const vertexShader = twigl.createShader(twigl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = twigl.createShader(twigl.FRAGMENT_SHADER, fragmentShaderSource);

// Create shader program
const shaderProgram = twigl.createProgram(vertexShader, fragmentShader);
twigl.useProgram(shaderProgram);

// Create buffer for a quad
const positionBuffer = twigl.createBuffer();
twigl.bindBuffer(twigl.ARRAY_BUFFER, positionBuffer);
const positions = [
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    1.0, 1.0,
];
twigl.bufferData(twigl.ARRAY_BUFFER, new Float32Array(positions), twigl.STATIC_DRAW);

// Setup attributes and uniforms
const positionAttributeLocation = twigl.getAttribLocation(shaderProgram, 'position');
twigl.enableVertexAttribArray(positionAttributeLocation);
twigl.vertexAttribPointer(positionAttributeLocation, 2, twigl.FLOAT, false, 0, 0);

const timeUniformLocation = twigl.getUniformLocation(shaderProgram, 'time');
const frameUniformLocation = twigl.getUniformLocation(shaderProgram, 'frame');
const resolutionUniformLocation = twigl.getUniformLocation(shaderProgram, 'resolution');

// Render loop
let startTime = Date.now();
function render() {
    const elapsedTime = (Date.now() - startTime) / 1000;
    const frame = 0; // Update frame count

    twigl.uniform1f(timeUniformLocation, elapsedTime);
    twigl.uniform1f(frameUniformLocation, frame);
    twigl.uniform2f(resolutionUniformLocation, twigl.canvas.width, twigl.canvas.height);

    twigl.clear(twigl.COLOR_BUFFER_BIT | twigl.DEPTH_BUFFER_BIT);
    twigl.drawArrays(twigl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
}
render();
