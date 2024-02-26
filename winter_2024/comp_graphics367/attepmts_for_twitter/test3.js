const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
precision mediump float;

uniform float time;
uniform vec2 resolution;

mat2 rotate2D(float angle) {
    float cosine = cos(angle);
    float sine = sin(angle);
    return mat2(cosine, -sine, sine, cosine);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Define variables
    float elapsedTime = 0.0;
    float intensity = 0.0;
    float attention = 0.0;
    float weight = 0.0;
    float xCoord = 0.0;
    float globalIntensity = 0.0;
    float height = 0.0;
    float scale = 0.0;

    // Main loop
    for (float intensity = 0.0; intensity < 90.0; intensity++) {
        float factor = 0.01 - 0.02 / exp(max(scale, elapsedTime) * 3000.0) / height;

        // Calculate initial position vector
        vec3 position = vec3((gl_FragCoord.xy - 0.5 * resolution) / resolution.y * globalIntensity + 2.0, globalIntensity);
        position.zy *= rotate2D(0.5);

        // Apply 2D rotation
        elapsedTime = position.y;
        height = elapsedTime + position.x * 0.3;

        position.z += time;

        // Nested loop
        for (float attention = 0.6; attention > 0.001; attention *= 0.7) {
            position.xz *= rotate2D(5.0);
            xCoord = (position.x + position.z) / attention + time + time;

            elapsedTime -= weight = sin(xCoord - 3.0) * attention;
            height += abs(dot(sin(position.xz / attention * 0.3) * attention, uv));
            globalIntensity += elapsedTime = min(elapsedTime, height * 0.5 - 1.0);
        }
    }

    // Output final color
    gl_FragColor = vec4(height, globalIntensity, elapsedTime, 1.0);
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
