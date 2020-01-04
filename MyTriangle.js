/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - Coord of first ponit in X
 * @param y1 - Coord of first ponit in Y
 * @param z1 - Coord of first ponit in Z
 * @param x2 - Coord of second ponit in X
 * @param y2 - Coord of second ponit in Y
 * @param z2 - Coord of second ponit in Z
 * @param x3 - Coord of third ponit in X
 * @param y3 - Coord of third ponit in Y
 * @param z3 - Coord of third ponit in Z
 * 
 */
class MyTriangle extends CGFobject {
	constructor(scene, id,x1, y1, z1, x2, y2, z2, x3, y3, z3) {
		super(scene);
		this.id = id;
		
		this.x1 = x1;
		this.y1 = x1;
		this.z1 = z1;

		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;

		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;

        var v1 = [x2 -x1, y2 - y1, z2 - z1];
        var v2 = [x3 -x1, y3 - y1, z3 - z1];

        var normalVectornonnormalize = [ (v1[1]*v2[2]) - (v1[2]*v2[1]) ,-((v1[0]*v2[2]) - (v1[2]*v2[0])),(v1[0]*v2[1]) - (v1[1]*v2[0])];
		var vectorlength = Math.sqrt(normalVectornonnormalize[0]*normalVectornonnormalize[0] + normalVectornonnormalize[1]*normalVectornonnormalize[1]+ normalVectornonnormalize[2]*normalVectornonnormalize[2]);
		
		this.normalVector = [normalVectornonnormalize[0]/vectorlength, normalVectornonnormalize[1]/vectorlength, normalVectornonnormalize[2]/vectorlength];

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            this.x1, this.y1, this.z1,	//0
            this.x1, this.y1, this.z1,  //1
            this.x2, this.y2, this.z2,  //2
            this.x2, this.y2, this.z2,  //3
            this.x3, this.y3, this.z3,  //4
            this.x3, this.y3, this.z3   //5
        
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 4,
			5, 3, 1
		];

		
		//Nomral Vector
		this.normals = [
			this.normalVector[0], this.normalVector[1], this.normalVector[2],
			-this.normalVector[0], -this.normalVector[1], -this.normalVector[2],
            this.normalVector[0], this.normalVector[1], this.normalVector[2],
            -this.normalVector[0], -this.normalVector[1], -this.normalVector[2],
            this.normalVector[0], this.normalVector[1], this.normalVector[2],
            -this.normalVector[0], -this.normalVector[1], -this.normalVector[2]
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */
		
		var distanciaP2P3 = Math.sqrt((this.x3 - this.x2)*(this.x3 - this.x2) + (this.y3 - this.y2)*(this.y3 - this.y2) + (this.z3 - this.z2)*(this.z3 - this.z2));
		var distanciaP1P2 = Math.sqrt((this.x2 - this.x1)*(this.x2 - this.x1) + (this.y2 - this.y1)*(this.y2 - this.y1) + (this.z2 - this.z1)*(this.z2 - this.z1));
		var distanciaP1P3 = Math.sqrt((this.x1 - this.x3)*(this.x1 - this.x3) + (this.y1 - this.y3)*(this.y1 - this.y3) + (this.z1 - this.z3)*(this.z1 - this.z3));
		var lengthv = 1;
		var lenghtu = 1;
		var cosAlfa = ((distanciaP1P2*distanciaP1P2) - (distanciaP2P3*distanciaP2P3) + (distanciaP1P3*distanciaP1P3)) / (2*distanciaP1P3*distanciaP1P2);
		var sinAlfa = (Math.sqrt(1-(cosAlfa*cosAlfa)));
		
		this.texCoords = [
			distanciaP1P2/lenghtu, 0,
			distanciaP1P2/lenghtu, 0,
			(distanciaP1P3/lenghtu)*cosAlfa,(distanciaP1P3/lengthv)*sinAlfa,
			(distanciaP1P3/lenghtu)*cosAlfa,(distanciaP1P3/lengthv)*sinAlfa,		
			0, 0,
			0, 0
		];
		
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
	
		var distanciaP2P3 = Math.sqrt((this.x3 - this.x2)*(this.x3 - this.x2) + (this.y3 - this.y2)*(this.y3 - this.y2) + (this.z3 - this.z2)*(this.z3 - this.z2));	
		var distanciaP1P2 = Math.sqrt((this.x2 - this.x1)*(this.x2 - this.x1) + (this.y2 - this.y1)*(this.y2 - this.y1) + (this.z2 - this.z1)*(this.z2 - this.z1));
		var distanciaP1P3 = Math.sqrt((this.x1 - this.x3)*(this.x1 - this.x3) + (this.y1 - this.y3)*(this.y1 - this.y3) + (this.z1 - this.z3)*(this.z1 - this.z3));
		var cosAlfa = (distanciaP1P2*distanciaP1P2 - distanciaP2P3*distanciaP2P3 + distanciaP1P3*distanciaP1P3) / 2*distanciaP1P3*distanciaP1P2;
		var sinAlfa = (Math.sqrt(1-(cosAlfa*cosAlfa)));
		var lengthv = 1;
		var lenghtu = 1;

		coords.push(((distanciaP1P3*cosAlfa)/lenghtu)/length_s,(distanciaP2P3*sinAlfa)/lengthv)/length_t;
		coords.push(((distanciaP1P3*cosAlfa)/lenghtu)/length_s,(distanciaP2P3*sinAlfa)/lengthv)/length_t;
		coords.push(0, 0);
		coords.push(0, 0);
		coords.push((distanciaP1P2/lenghtu)/length_s, 0);
		coords.push((distanciaP1P2/lenghtu)/length_s, 0);

		this.updateTexCoords(coords);
	}
}

