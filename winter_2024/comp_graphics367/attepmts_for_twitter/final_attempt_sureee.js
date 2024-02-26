// Initialize Three.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry
var geometry = new THREE.PlaneGeometry(2, 2);

// Create uniforms
var uniforms = {
    time: { value: 0 },
    frame: { value: 0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    sound: { value: 0 }
};

// Create material
var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});

// Create mesh
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value += 0.01; // Update time uniform
    uniforms.frame.value += 1;   // Update frame uniform
    renderer.render(scene, camera);
}

animate();
