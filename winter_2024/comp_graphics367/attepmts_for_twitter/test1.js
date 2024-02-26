const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;

    mat2 rotate2D(float r){
        return mat2(cos(r), sin(r), -sin(r), cos(r));
    }

    vec3 hsv(float h, float s, float v){
        vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
        return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 color = hsv(mod(time, 360.0), 1.0, 1.0);
        gl_FragColor = vec4(color, 1.0);
    }
`;

let scene, camera, renderer, material, mesh;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gl-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(2, 2);
    material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.01;
    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
window.onload = function() {
    // Grab the canvas object and initialize it
    var canvas = document.getElementById('gl-canvas');
    var gl = canvas.getContext('webgl');

    // Error checking
    if (!gl) { alert('WebGL unavailable'); return; }

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    // Load data into GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Set its position and render it
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Get uniform locations
    var resolutionLoc = gl.getUniformLocation(program, 'resolution');
    var timeLoc = gl.getUniformLocation(program, 'time');

    // Render loop
    var startTime = performance.now();
    function render() {
        // Calculate time
        var currentTime = performance.now();
        var elapsedTime = (currentTime - startTime) / 1000.0;

        // Update uniforms
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, elapsedTime);

        // Clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Draw triangle
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // Request next frame
        window.requestAnimationFrame(render);
    }

    render();
};
