/**
 * MyTorus
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id - Id of the primitive
 * @param slices - Number of sides in z axis
 * @param loops - Number of divisons along the z axis 
 * 
 */

class MyTorus extends CGFobject {
    constructor(scene, id, slices, outer_radius, inner_radius, loops) {
        super(scene);
        this.id = id;

        this.slices = slices;
        this.outer_radius = outer_radius;
        this.inner_radius = inner_radius;
        this.loops = loops;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var outerAng = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var inerAng = 0;
        var betaAng = 2*Math.PI/this.loops;

        for(var i = 0; i <= this.slices; i++){
            for (var j = 0; j <= this.loops - 1; j++) {
                //x,y R*cos(o)+cos(i)*r, sin(o)*R,sin(i)*r
                this.vertices.push(Math.cos(outerAng)*(this.outer_radius+this.inner_radius*Math.cos(inerAng)),Math.sin(outerAng)*(this.outer_radius+this.inner_radius*Math.cos(inerAng)),this.inner_radius*Math.sin(inerAng));
                
                // normalization
                var xNormal = Math.cos(outerAng)*Math.cos(inerAng);
                var yNormal = Math.sin(outerAng)*Math.cos(inerAng);
                var zNormal = Math.sin(inerAng);
               	
				var nsize=Math.sqrt(
					xNormal*xNormal+
					yNormal*yNormal+
					zNormal*zNormal
				);
				zNormal = zNormal/nsize;
				yNormal = yNormal/nsize;
				xNormal = xNormal/nsize;

				this.normals.push(xNormal,yNormal,zNormal);

                
                this.texCoords.push(i/this.slices,j/this.loops);

                if(i != 0) {
                    if (j != this.loops - 1) {
                        this.indices.push(this.loops*i+j,this.loops*(i-1) +j,this.loops*(i-1) +j + 1);
                        this.indices.push(this.loops*(i-1) +j + 1,this.loops*(i-1) +j,this.loops*i+j);
                    }
                    else {
                        this.indices.push(this.loops*(i-1),this.loops*(i) - 1,this.loops*i+j);
                        this.indices.push(this.loops*i+j,this.loops*(i) - 1,this.loops*(i-1) );
                    }
                    if (j != 0) {
                        this.indices.push(this.loops*i+j,this.loops*i+j - 1,this.loops*(i-1) +j);
                        this.indices.push(this.loops*(i-1) +j,this.loops*i+j - 1,this.loops*i+j);
                    }
                    if (j == this.loops-1) {
                        this.indices.push(this.loops*i +j,this.loops*i, this.loops*(i-1));
                        this.indices.push(this.loops*(i-1),this.loops*i, this.loops*i +j);
                    }
                }
                inerAng += betaAng;
            }
            outerAng += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

	/**
	 * @method createTexCoords
	 * creates the texcoords for the updateTexCoords method and call it
	 * @param {Int} length_s - length of the texture/X on the x scale 
	 * @param {Int} length_t - length of the textures/Y on the y scale 
	 */
	createTexCoords(length_s, length_t) {
        var coords = [];

        for(var i = 0; i <= this.slices; i++){
            for (var j = 0; j <= this.loops - 1; j++) {
                coords.push((i/this.slices)/length_s,(j/this.loops)/length_t);
            }
        }

        this.updateTexCoords(coords);
    }
}
