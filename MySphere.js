/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius  - Radius of the sphere
 * @param slices - Number of sides in z axis
 * @param stacks - Number of divisons along the z, of the halfSphere
 * 
 */

class MySphere extends CGFobject {
	constructor(scene, id, radius, slices, stacks) {
		super(scene);

		this.id = id;

		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		this.vertices.push(0,0,this.radius);
		this.normals.push(0,0,1);
		this.texCoords.push(0.5,1);

		var angZ = (Math.PI/2)/(this.stacks);
		var zCoord = this.radius;
		var actualRadius = 0;
		var alfaAngle = Math.PI*2/this.slices;
		var actualAngle = 0;

		//pisitive side
		for(var i = 1; i <= this.stacks; i++) {
			zCoord = this.radius * Math.cos(angZ*i);
			actualRadius = this.radius * Math.sin(angZ*i);
			actualAngle = 0;
			for (var j = 0 ; j != this.slices; j++) {
				this.vertices.push(Math.cos(actualAngle)*actualRadius,Math.sin(actualAngle)*actualRadius,zCoord);

				var newNormal = [Math.cos(actualAngle),Math.sin(actualAngle),Math.cos(angZ*i)];
				
                // normalization
                var xNormal = Math.cos(actualAngle);
                var yNormal = Math.sin(actualAngle);
                var zNormal = Math.cos(angZ*i);
               	
				var nsize=Math.sqrt(
					xNormal*xNormal+
					yNormal*yNormal+
					zNormal*zNormal
				);
				zNormal = zNormal/nsize;
				yNormal = yNormal/nsize;
				xNormal = xNormal/nsize;

				this.normals.push(xNormal,yNormal,zNormal);
				
				this.texCoords.push(j/(this.slices-1),1-(0.5*(i/this.stacks)));

				if (j != 0) {		
					if (i == 1) {
						this.indices.push(0,j,j+1); 
						if (j == this.slices - 1) this.indices.push(0,j+1,1);
					}
					else {
						this.indices.push((i-2)*this.slices+j,(i-1)*this.slices+j,(i-1)*this.slices+j+1);
						this.indices.push((i-2)*this.slices+j,(i-1)*this.slices+j+1,(i-2)*this.slices+j+1);

						if (j == this.slices - 1) {
							this.indices.push((i-2)*this.slices+j+1,(i-1)*this.slices+j+1,(i-1)*this.slices+1);
							this.indices.push((i-2)*this.slices+j+1,(i-1)*this.slices+1,(i-2)*this.slices+1);
						}
					}	
				}
				
				actualAngle += alfaAngle;
			}
		}

		//negative side
		this.vertices.push(0,0,- this.radius);
		this.normals.push(0,0,-1);
		this.texCoords.push(0.5,0);
		
		var halfVertices = this.stacks * this.slices + 1;
		for(var i = 1; i <= this.stacks; i++) {
			zCoord = this.radius * Math.cos(angZ*i);
			actualRadius = this.radius * Math.sin(angZ*i);
			actualAngle = 0;
			for (var j = 0 ; j != this.slices; j++) {
				this.vertices.push(Math.cos(actualAngle)*actualRadius,Math.sin(actualAngle)*actualRadius,-zCoord);
				this.normals.push(Math.cos(actualAngle),Math.sin(actualAngle),-Math.cos(angZ*i));
				this.texCoords.push(j/(this.slices-1),(0.5*(i/this.stacks)));
				if (j != 0) {		
					if (i == 1) {
						this.indices.push(j+1 + halfVertices,j + halfVertices,halfVertices); 
						if (j == this.slices - 1) this.indices.push(halfVertices+ 1, halfVertices + j+1,halfVertices );
					}
					else {				
						this.indices.push( (i-1)*this.slices+j+1 +  halfVertices,(i-1)*this.slices+j + halfVertices,(i-2)*this.slices+j + halfVertices);
						this.indices.push( (i-2)*this.slices+j+1 +halfVertices,(i-1)*this.slices+j+1 + halfVertices,(i-2)*this.slices+j + halfVertices);

						if (j == this.slices - 1) {
							this.indices.push((i-1)*this.slices+1 + halfVertices,(i-1)*this.slices+j+1 + halfVertices,(i-2)*this.slices+j+1 + halfVertices);
							this.indices.push((i-2)*this.slices+1 +halfVertices,(i-1)*this.slices+1 + halfVertices,(i-2)*this.slices+j+1 + halfVertices);
						}
					}	
				}
				
				actualAngle += alfaAngle;
			}
		}
		
	


		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		// x cos(actualAngle)*sin(angZ*i) + 0.5; 

		// y sin(actualAngle)*sin(angZ*i) + 0.5;

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

		coords.push(0.5/length_s,0.5/length_t);

		var angZ = (Math.PI/2)/(this.stacks);
		var alfaAngle = Math.PI*2/this.slices;

		for(var i = 1; i <= this.stacks; i++) { 
			for (var j = 0 ; j != this.slices; j++) { 
				coords.push((-Math.cos(alfaAngle*j)*Math.sin(angZ*i) + 0.5)/length_s,(-Math.sin(alfaAngle*j)*Math.sin(angZ*i) + 0.5)/length_t);
			}
		}

		coords.push(0.5/length_s,0.5/length_t);

		for(var i = 1; i <= this.stacks; i++) { 
			for (var j = 0 ; j != this.slices; j++) { 
				coords.push((-Math.cos(alfaAngle*j)*Math.sin(angZ*i) + 0.5)/length_s,(-Math.sin(alfaAngle*j)*Math.sin(angZ*i) + 0.5)/length_t);
			}
		}

		this.updateTexCoords(coords);
	}
}

