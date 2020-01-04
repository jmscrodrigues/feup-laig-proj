/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param base_radius  - Cylinder base radius
 * @param top_radius  - Cylinder top radius
 * @param height - Cylinder height
 * @param slices - Number of sides in z axis
 * @param stacks - Number of divisons along the z axis 
 * 
 */

class MyCylinder extends CGFobject {
    constructor(scene,id, base_radius, top_radius, height, slices, stacks) {
        super(scene);
        this.id = id;

        if (height <= 0) height = 0.00001;
        if (slices < 2) slices = 3;

        this.base_radius = base_radius;
        this.top_radius = top_radius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var heightStack = this.height/this.stacks;
        var radiusAdjustment = (this.top_radius - this.base_radius)/this.stacks;
        var actualHeight = 0;
        var actualRadius = this.base_radius;

        for (var t= 0; t<=this.stacks -1; t++) {


            for(var i = 0; i <= this.slices - 1; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different
                
                var seno = Math.sin(ang);
                var cosseno= Math.cos(ang);
               this.vertices.push(cosseno*(actualRadius+radiusAdjustment), seno*(actualRadius+radiusAdjustment),actualHeight + heightStack);
               this.vertices.push(cosseno*actualRadius, seno*actualRadius,actualHeight);
    
    
                // triangle normal computed by cross product of two edges
                var normal= [
                    Math.cos(ang),
                    Math.sin(ang),
                    0
                ];
    
                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;
    
                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);
    
                if (i == (this.slices - 1)) {
                    this.indices.push(2*t*this.slices + (2*i) + 1, 2*t*this.slices + 1, 2*t*this.slices + (2*i));
                    this.indices.push(2*t*this.slices + (2*i), 2*t*this.slices + 1, 2*t*this.slices);
    
                }
                else {
                    this.indices.push( 2*t*this.slices + (2*i) + 1, 2*t*this.slices + (2*i) + 3, 2*t*this.slices + (2*i));
                    this.indices.push( 2*t*this.slices + (2*i), 2*t*this.slices + (2*i)+3, 2*t*this.slices + (2*i) + 2);
                }
                this.texCoords.push(i/(this.slices-1),1-(t+1)/this.stacks);
                this.texCoords.push(i/(this.slices-1),1-t/this.stacks);
                ang+=alphaAng;
            }

            actualRadius += radiusAdjustment;
            actualHeight += heightStack;
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

        for (var t= 0; t<=this.stacks -1; t++) {
            for(var i = 0; i <= this.slices - 1; i++){
                this.texCoords.push(i/(this.slices-1)/length_s,((t+1)/this.stacks)/length_t);
                this.texCoords.push(i/(this.slices-1)/length_s,(t/this.stacks)/length_t);
            }
        }
    }
}