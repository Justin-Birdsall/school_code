/*
triangle.js
Erik Fredericks, c/o Ed Angel

This file does the actual drawing of the triangle
*/

// Global variables we'll need
// var gl;
// var points;
// let x = 0.0;
// let y = 0.0;
// let xLoc, yLoc;
// let dirs = [null, null];  // horizontal, vertical

// // This function executes our WebGL code AFTER the window is loaded.
// // Meaning, that we wait for our canvas element to exist.
// window.onload = function init() {
//   // Grab the canvas object and initialize it
//   var canvas = document.getElementById('gl-canvas');
//   gl = WebGLUtils.setupWebGL(canvas);
//   window.addEventListener(
//     "keydown",
//     function (e) {
//     if (e.key ==="a") {
//         dirs[0] = false;
//         } else if (e.key === "d") {
//         dirs[0] = true;
//         } else if (e.key ==="w") {
//         dirs[1] = true;
//         } else if (e.key ==="s") {
//         dirs[1] = false;
//         } else if (e.key ===" ") {
//         dirs[0] = null;
//         dirs[1] = null;
//         }
//       console.log("Key: " + e.key);
//     },
//     false   
//   );
//   window.addEventListener(
//     "keyup",
//     function (e) {
//     if (e.key ==="a") {
//         dirs[0] = null;
//         } else if (e.key === "d") {
//         dirs[0] = null;
//         dirs[1] = null;
//         } else if (e.key ==="w") {
//         dirs[0] = null;
//         dirs[1] = null;
//         } else if (e.key ==="s") {
//         dirs[0] = null;
//         dirs[1] = null;
//         } else if (e.key ===" ") {
//         dirs[0] = null;
//         dirs[1] = null;
//         }
//       console.log("Key: " + e.key);
//     },
//     false   
//   );
//   // Error checking
//   if (!gl) { alert('WebGL unavailable'); }

//   // triangle vertices
//   var vertices = [
//     vec2(-.25, -.25),
//     vec2(0, .25),
//     vec2(.25, -.25)
//   ];

//   // configure WebGL
//   gl.viewport(0, 0, canvas.width, canvas.height);
//   gl.clearColor(1.0, 1.0, 1.0, 1.0);

//   // load shaders and initialize attribute buffers
//   var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
//   gl.useProgram(program);
//   xLoc = gl.getUniformLocation(program, "x");
//   yLoc = gl.getUniformLocation(program, "y");
//   // load data into GPU
//   var bufferID = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
//   gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

//   // set its position and render it
//   var vPosition = gl.getAttribLocation(program, 'vPosition');
//   gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
//   gl.enableVertexAttribArray(vPosition);
//   render();
// };

// // Render whatever is in our gl variable
// //changed it so that it stops on key upk
// function render() {
//     if (dirs[0] === true) // move right
//         x += 0.01;
//     else if (dirs[0] === false) // move left
//         x -= 0.01;
//     if (dirs[1] === true) // move up
//         y += 0.01;
//     else if (dirs[1] === false) // move down 
//         y -= 0.01;

//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.uniform1f(xLoc, x);
//     gl.uniform1f(yLoc, y);
//     gl.drawArrays(gl.TRIANGLES, 0, 3);
//     window.requestAnimationFrame(render);
// }
// Global variables we'll need
// var gl;
// var points;
// let x = 0.0;
// let y = 0.0;
// let angle = 0.0;  // Initial angle
// let xLoc, yLoc, angleLoc;
// let dirs = [null, null];  // horizontal, vertical

// // This function executes our WebGL code AFTER the window is loaded.
// // Meaning, that we wait for our canvas element to exist.
// window.onload = function init() {
//   // Grab the canvas object and initialize it
//   var canvas = document.getElementById('gl-canvas');
//   gl = WebGLUtils.setupWebGL(canvas);
//   window.addEventListener(
//     "keydown",
//     function (e) {
//       if (e.key === "a") {
//         dirs[0] = false;  // Move left
//       } else if (e.key === "d") {
//         dirs[0] = true;   // Move right
//       } else if (e.key === "w") {
//         dirs[1] = true;   // Move up
//       } else if (e.key === "s") {
//         dirs[1] = false;  // Move down
//       } else if (e.key === "e") {
//         angle += 0.5;     // Rotate counterclockwise
//       } else if (e.key === "q") {
//         angle -= 0.5;     // Rotate clockwise
//       } else if (e.key === " ") {
//         dirs[0] = null;
//         dirs[1] = null;
//       }
//       console.log("Key: " + e.key);
//     },
//     false   
//   );
//   window.addEventListener(
//     "keyup",
//     function (e) {
//       if (e.key === "a" || e.key === "d") {
//         dirs[0] = null;  // Stop horizontal movement
//       } else if (e.key === "w" || e.key === "s") {
//         dirs[1] = null;  // Stop vertical movement
//       } else if (e.key === " ") {
//         dirs[0] = null;
//         dirs[1] = null;
//       }
//       console.log("Key: " + e.key);
//     },
//     false   
//   );
//   // Error checking
//   if (!gl) { alert('WebGL unavailable'); }

//   // Triangle vertices
//   var vertices = [
//     vec2(-0.25, -0.25),
//     vec2(0, 0.25),
//     vec2(0.25, -0.25)
//   ];

//   // Configure WebGL
//   gl.viewport(0, 0, canvas.width, canvas.height);
//   gl.clearColor(1.0, 1.0, 1.0, 1.0);

//   // Load shaders and initialize attribute buffers
//   var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
//   gl.useProgram(program);
//   xLoc = gl.getUniformLocation(program, "x");
//   yLoc = gl.getUniformLocation(program, "y");
//   angleLoc = gl.getUniformLocation(program, "angle");

//   // Load data into GPU
//   var bufferID = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
//   gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

//   // Set its position and render it
//   var vPosition = gl.getAttribLocation(program, 'vPosition');
//   gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
//   gl.enableVertexAttribArray(vPosition);
//   render();
// };

// // Render whatever is in our gl variable
// function render() {
//   // Update position based on user input
//   if (dirs[0] === true) {  // Move right
//     x += 0.01;
//   } else if (dirs[0] === false) {  // Move left
//     x -= 0.01;
//   }
//   if (dirs[1] === true) {  // Move up
//     y += 0.01;
//   } else if (dirs[1] === false) {  // Move down
//     y -= 0.01;
//   }

//   // Clear canvas
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   // Pass position, angle, and zoom level to shader
//   gl.uniform1f(xLoc, x);
//   gl.uniform1f(yLoc, y);
//   gl.uniform1f(angleLoc, angle);

//   // Draw triangle
//   gl.drawArrays(gl.TRIANGLES, 0, 3);
var gl;
var points;
let x = 0.0;
let y = 0.0;
let potential_energy = 0.0;
let shootDirection = vec2(0, 0);
let angle = 0.0;  // Initial angle
let angleVel = 0.0; 
let xVel = 0.0;   // Initial horizontal velocity
let yVel = 0.0;   // Initial vertical velocity
let xAcc = 0.001; // Acceleration for horizontal movement
let yAcc = 0.001; // Acceleration for vertical movement
let maxVel = 0.15; // Maximum velocity
let maxAngleVel = 0.5;
let xLoc, yLoc, angleLoc, rotationMatrixLoc;
let dirs = [null, null];  // horizontal, vertical
let spacePressed = false; // Flag to track if spacebar is pressed
let lastDir = [0, 0];     // Last input direction

// Pre-calculate the rotation matrix
let rotationMatrix = mat2(1.0, 0.0, 0.0, 1.0); // Identity matrix

// This function executes our WebGL code AFTER the window is loaded.
// Meaning, that we wait for our canvas element to exist.
window.onload = function init() {
  // Grab the canvas object and initialize it
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);
  window.addEventListener(
    "keydown",
    function (e) {
      if (e.key === "a") {
        dirs[0] = false;  // Move left
        lastDir[0] = -1;
        shootDirection[0] = -1;  // Shoot left
    } else if (e.key === "d") {
        dirs[0] = true;   // Move right
        lastDir[0] = 1;
        shootDirection[0] = 1;   // Shoot right
      } else if (e.key === "w") {
        dirs[1] = true;   // Move up
        lastDir[1] = 1;
        shootDirection[1] = 1;   // Shoot up
      } else if (e.key === "s") {
        dirs[1] = false;  // Move down
        lastDir[1] = -1;
        shootDirection[1] = -1;  // Shoot down
      } else if (e.key === "e") {
        //angle += 0.001;     // Rotate counterclockwise
        angleVel += 0.005; // Increase angular velocity
        angleVel = Math.min(angleVel, maxAngleVel); // Limit angular velocity
      } else if (e.key === "q") {
        //angle -= 0.1;     // Rotate clockwise
        angleVel -= 0.005 // Increase angular velocity
        angleVel = Math.min(angleVel, maxAngleVel); 
      } else if (e.key === " ") {
        spacePressed = true;  // Spacebar pressed
        potential_energy += 0.009
        // Stop all movement
    } else if (e.key === "r") {
        // Check if the triangle is inside the canvas
        if (x > -0.99 && x < 0.99 && y > -0.99 && y < 0.99) {
            // Calculate the reflection angle (180 degrees)
            let currentVelocity = Math.sqrt(xVel * xVel + yVel * yVel);
            let currentAngle = Math.atan2(yVel, xVel);
            let newAngle = currentAngle + Math.PI;
            xVel = currentVelocity * Math.cos(newAngle);
            yVel = currentVelocity * Math.sin(newAngle);
            // Increase velocity slightly
            xVel *= 1.15;
            yVel *= 1.15;
        } else {
            // Reset triangle to origin with minimal velocity
            x = 0.0;
            y = 0.0;
            xVel = -0.001; // Opposite direction
            yVel = -0.001; // Opposite direction
        }
    }
    
    
      console.log("Key: " + e.key);
    },
    false   
  );
  window.addEventListener(
    "keyup",
    function (e) {
      if (e.key === "a" || e.key === "d") {
        dirs[0] = null;  // Stop horizontal movement
        
      } else if (e.key === "w" || e.key === "s") {
        dirs[1] = null;  // Stop vertical movement
      } else if (e.key === "q") {
        angleVel += 0.01
      } else if (e.key === "e") {
        angleVel -= 0.01
      } else if (e.key === " ") {
        spacePressed = false;
        // Calculate velocity based on potential energy and shoot direction
        xVel = shootDirection[0] * maxVel * potential_energy;
        yVel = shootDirection[1] * maxVel * potential_energy;
        // Reset potential energy
        potential_energy = 0.0;
      }
      console.log("Key: " + e.key);
    },
    false   
  );
  // Error checking
  if (!gl) { alert('WebGL unavailable'); }

  // Triangle vertices
  var vertices = [
    vec2(-0.25, -0.25),
    vec2(0, 0.25),
    vec2(0.25, -0.25)
  ];

  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Load shaders and initialize attribute buffers
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);
  xLoc = gl.getUniformLocation(program, "x");
  yLoc = gl.getUniformLocation(program, "y");
  angleLoc = gl.getUniformLocation(program, "angle");
  rotationMatrixLoc = gl.getUniformLocation(program, "rotationMatrix");

  // Load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Set its position and render it
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

// Render whatever is in our gl variable
function render() {
    
    // Update angle for continuous spinning
    angle += angleVel; // Use angleVel directly for continuous spinning
    angleVel *= 0.99;  // Decelerate angular velocity gradually
  
    // Update position based on user input if space bar is not pressed
    if (!spacePressed) {
      if (dirs[0] === true) {  // Move right
        xVel += xAcc;
      } else if (dirs[0] === false) {  // Move left
        xVel -= xAcc;
      }
      if (dirs[1] === true) {  // Move up
        yVel += yAcc;
      } else if (dirs[1] === false) {  // Move down
        yVel -= yAcc;
      }
    } else {
        xVel = 0
        yVel = 0

    }

    // Limit velocity to maximum
    xVel = Math.min(Math.max(xVel, -maxVel), maxVel);
    yVel = Math.min(Math.max(yVel, -maxVel), maxVel);
  
    // Update position based on velocity
    x += xVel;
    y += yVel;
  
    // Calculate the new rotation matrix
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    rotationMatrix = mat2(c, -s, s, c);
  
    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    // Pass position, angle, and rotation matrix to shader
    gl.uniform1f(xLoc, x);
    gl.uniform1f(yLoc, y);
    gl.uniform1f(angleLoc, angle);
    gl.uniformMatrix2fv(rotationMatrixLoc, false, rotationMatrix);
  
    // Draw triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  
    // Request next frame
    window.requestAnimationFrame(render);
  }