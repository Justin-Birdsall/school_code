Report / Homework (100 pts)	

1)	Copy and paste the code changes you made to change the color of the first triangle.  What values have you changed?
gl_FragColor = vec4( 0.0, 1.0, 0.0, 1.0 )
this is the fragment color shader which follows the r,g,b,a and we are telling our gpu to ignore red and blue and make our all of our points green.

to scale up the points we need to modify this line of code:

	gl_PointSize = 25.0;

we are saying to draw all of our points now at size 25 

2)	Triangle rotation

a)	Copy/paste the code you made to rotate the triangle.
    var vertices = [
        vec2( -1,  1 ),
        vec2(  1,  1 ),
        vec2(  0, -1 )
    ];
livePreview.autoRefreshPreview

b)	Can you think of any other way to rotate the triangle?  Describe one possibility.
store our vectors in a matrix times the matrix by 

 [x'][cos0 -sin0]
 [y ][sin0  cos0]

since we are in two dimensions we an plug in the amount we want to rotate by
and it should output a new matrix for that position. 
3)	Why does our code need to be placed into a window.onload function?
the window onload is saying to use the webpage as our program. If this were on  

4)	Paste your screenshots here on perturbing things.

5)	In the JavaScript file, there are two uses of the scale function.  For the second (scale(0.5, p);) modify the value sent in.  What do you think is happening here (i.e., what is the purpose of scaling)?

6)	We have the following three lines of code in all our gasket files, and they will show up in one form or another in pretty much everything we do.  What is the purpose of each line of this code block specifically (i.e., get comfortable with reading documentation)?

var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition );

7)	Create your portfolio website.
