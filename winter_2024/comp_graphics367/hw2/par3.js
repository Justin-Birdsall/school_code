// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.Camera();
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();

// Set up a plane geometry to cover the screen
const geometry = new THREE.PlaneGeometry(2, 2);

// Set up uniforms for the shader
const uniforms = {
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2() },
    u_time: { value: 0.0 }
};

// Create a shader material
const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});

// Create a mesh using the geometry and material
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Set up the camera and renderer
camera.position.z = 1;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resizing
window.addEventListener('resize', onWindowResize, false);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Update uniforms
    uniforms.u_time.value = clock.getElapsedTime();

    // Render the scene
    renderer.render(scene, camera);
}

animate();

// Function to handle window resizing
function onWindowResize() {
    uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
