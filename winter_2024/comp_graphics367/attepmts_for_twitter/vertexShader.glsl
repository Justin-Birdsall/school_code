        attribute vec4 a_position;
        attribute vec4 a_texCoord;
        uniform mat4 u_modelViewProjectionMatrix;
        varying vec4 v_texCoord;

        void main() {
            gl_Position = u_modelViewProjectionMatrix * a_position;
            v_texCoord = a_texCoord;
        }