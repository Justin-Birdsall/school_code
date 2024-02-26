var elapsedTime = 0.0;
var startTime = new Date().getTime() / 1000; // Start time in seconds

window.onload = function() {
    var canvas = document.getElementById('gl-canvas');
    var gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert('WebGL unavailable');
        return;
    }

    var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    var vertices = [
        -1.0, -1.0,
        0.0, 1.0,
        1.0, -1.0
    ];

    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var timeLoc = gl.getUniformLocation(program, 'time');
    var resolutionLoc = gl.getUniformLocation(program, 'resolution');

    function render() {
        elapsedTime = new Date().getTime() / 1000 - startTime;

        gl.uniform1f(timeLoc, elapsedTime);
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

        window.requestAnimationFrame(render);
    }

    render();
};
