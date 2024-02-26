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

    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 color = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0, 2, 4));
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
