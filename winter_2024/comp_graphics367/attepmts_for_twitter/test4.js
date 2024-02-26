let gl, program, resolutionLocation, timeLocation, modelViewMatrix, projectionMatrix;

function init() {
    const canvas = document.getElementById('glCanvas');
    gl = canvas.getContext('webgl');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);

    const vertexShaderSource = `
        attribute vec4 position;
        void main() {
            gl_Position = position;
        }
    `;
    
    const fragmentShaderSource = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    
    out vec4 fragColor1;
    out vec4 fragColor2;
    
    mat2 rotate2D(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
    }
    
    void main() {
        vec3 position, previousPosition = vec3(0, 0.4, -3), direction = vec3((gl_FragCoord.xy - 0.5 * resolution) / resolution.y, 2);
    
        for(float i = 0.0; i < 100.0; i++) {
            position = previousPosition += direction * i;
            position.xz *= rotate2D(time);
            float energy = 9.0;
            float velocity = 9.0;
            
            for(int j = 0; j < 9; j++) {
                float scale = 0.02 / velocity;
                float distance = max(length(position.xz = abs(position.xz *= rotate2D(1.0)) - 0.6) - scale, position.y) / velocity;
                velocity /= dot(position, position);
                position /= dot(position, position) + cos(time) / (25.0 - time);
                position.y = 1.73 - position.y;
                energy = min(energy, position.y / 1.93);
            }
            
            fragColor1 += exp(-position.y / velocity - 6.0) * vec4(cos(time) * 10.0, sin(time / 10.0) * 5.0, 5.0, 0.0);
            fragColor2 += exp(-position.y / velocity - 6.0) * vec4(cos(time) * 10.0, sin(time / 10.0) * 5.0, 5.0, 0.0);
            energy = min(energy, previousPosition.y / 1.93);
        }
    }
    `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    program = createProgram(gl, vertexShader, fragmentShader);
    
    resolutionLocation = gl.getUniformLocation(program, 'resolution');
    timeLocation = gl.getUniformLocation(program, 'time');
    modelViewMatrix = mat4.create();
    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -3.0]);

    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelViewMatrix'), false, modelViewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, projectionMatrix);

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, 0.0);

    requestAnimationFrame(render);
}

function render(now) {
    now *= 0.001;
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color to black
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(timeLocation, now);

    gl.drawArrays(gl.TRIANGLES, 0, 36); // Assuming you're rendering a cube

    requestAnimationFrame(render);
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.error('Program linking failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function setGeometry(gl) {
    const positions = [
                // Triangle 1
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
               -1.0,  1.0, 0.0,
               // Triangle 2
               -1.0,  1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0,  1.0, 0.0,
           ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

window.onload = init;





