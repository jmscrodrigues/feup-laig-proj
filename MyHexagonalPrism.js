class MyHexagonalPrism extends CGFobject {
    constructor(scene, texture) {
        super(scene);

        this.scene = scene;
        this.texture = texture;

        this.initbuffers();
    }

    initbuffers() {
        let alfaAng = Math.PI/3;

        this.vertices = [
            0,      0,      1.25,    //centro cima 1
            //Ligacao com os centro
            Math.sin(0),      Math.cos(0),      1,	        //0 cima
			Math.sin(alfaAng*1), Math.cos(alfaAng*1), 1,	//1 cima
            Math.sin(alfaAng*2), Math.cos(alfaAng*2), 1,	//2 cima
            Math.sin(alfaAng*3), Math.cos(alfaAng*3), 1,	//3 cima
            Math.sin(alfaAng*4), Math.cos(alfaAng*4), 1,    //4 cima 
            Math.sin(alfaAng*5), Math.cos(alfaAng*5), 1,    //5 cima
            Math.sin(0),      Math.cos(0),      1,          //6 cima
            //ligacoes entre os centros
            Math.sin(0),      Math.cos(0),      0,	        //0 baixo
			Math.sin(alfaAng*1), Math.cos(alfaAng*1), 0,	//1 baixo
			Math.sin(alfaAng*2), Math.cos(alfaAng*2), 0,	//2 baixo
            Math.sin(alfaAng*3), Math.cos(alfaAng*3), 0,	//3 baixo
            Math.sin(alfaAng*4), Math.cos(alfaAng*4), 0,    //4 baixo
            Math.sin(alfaAng*5), Math.cos(alfaAng*5), 0,    //5 baixo
            Math.sin(0),      Math.cos(0),      0,          //6 baixo
            Math.sin(0),      Math.cos(0),      1,	        //0 cima
			Math.sin(alfaAng*1), Math.cos(alfaAng*1), 1,	//1 cima
            Math.sin(alfaAng*2), Math.cos(alfaAng*2), 1,	//2 cima
            Math.sin(alfaAng*3), Math.cos(alfaAng*3), 1,	//3 cima
            Math.sin(alfaAng*4), Math.cos(alfaAng*4), 1,    //4 cima 
            Math.sin(alfaAng*5), Math.cos(alfaAng*5), 1,    //5 cima
            Math.sin(0),      Math.cos(0),      1,          //6 cima
            //ligacao ao centro inferior
            Math.sin(0),      Math.cos(0),      0,	        //0 baixo
			Math.sin(alfaAng*1), Math.cos(alfaAng*1), 0,	//1 baixo
			Math.sin(alfaAng*2), Math.cos(alfaAng*2), 0,	//2 baixo
            Math.sin(alfaAng*3), Math.cos(alfaAng*3), 0,	//3 baixo
            Math.sin(alfaAng*4), Math.cos(alfaAng*4), 0,    //4 baixo
            Math.sin(alfaAng*5), Math.cos(alfaAng*5), 0,    //5 baixo
            Math.sin(0),      Math.cos(0),      0,          //6 baixo
            0,      0,      0.25                            //centro baixo
		];

		//Counter-clockwise reference of vertices
		this.indices = [];

        
        for (var i = 0; i != 7; i++) {
            this.indices.push(i+1,i,0);
        }
        
        for (var i = 0; i != 6; i++) {
            this.indices.push(i+8,i+15,i+9);
            this.indices.push(i+16,i+9, i+15);
        }

        for (var i = 0; i != 7; i++) {
            this.indices.push(29,22+i,23+i);
        }
        

        //Facing Z positive
        
		this.normals = [
			0, 0, 1,                //centro cima
            //Ligacoes com os centros
            0,      0,      1,		//0 cima
			0,      0,      1,	    //1 cima
            0,      0,      1,		//2 cima
            0,      0,      1,		//3 cima
            0,      0,      1,	    //4 cima 
            0,      0,      1,	    //5 cima
            0,      0,      1,	    //6 cima
            //ligacoes entre os centros
            Math.sin(0),      Math.cos(0),      0,	        //0 baixo
			Math.sin(alfaAng*1), Math.cos(alfaAng*1), 0,	//1 baixo
			Math.sin(alfaAng*2), Math.cos(alfaAng*2), 0,	//2 baixo
            Math.sin(alfaAng*3), Math.cos(alfaAng*3), 0,	//3 baixo
            Math.sin(alfaAng*4), Math.cos(alfaAng*4), 0,    //4 baixo
            Math.sin(alfaAng*5), Math.cos(alfaAng*5), 0,    //5 baixo
            Math.sin(0),      Math.cos(0),      0,          //6 baixo
            Math.sin(0),      Math.cos(0),      0,	        //0 cima
			Math.sin(alfaAng*1), Math.cos(alfaAng*1), 0,	//1 cima
            Math.sin(alfaAng*2), Math.cos(alfaAng*2), 0,	//2 cima
            Math.sin(alfaAng*3), Math.cos(alfaAng*3), 0,	//3 cima
            Math.sin(alfaAng*4), Math.cos(alfaAng*4), 0,    //4 cima 
            Math.sin(alfaAng*5), Math.cos(alfaAng*5), 0,    //5 cima
            Math.sin(0),      Math.cos(0),      0,          //6 cima
            0,      0,      -1,		//0 cima
			0,      0,      -1,	    //1 cima
            0,      0,      -1,		//2 cima
            0,      0,      -1,		//3 cima
            0,      0,      -1,	    //4 cima 
            0,      0,      -1,	    //5 cima
            0,      0,      -1,	    //6 cima
            0, 0, -1
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
        
		this.texCoords = [
            0.5, 0.5,                                       //centro
            //ligacao ao centro
			Math.sin(0)/2+0.5,      Math.cos(0)/2+0.5,	            //0 cima
			Math.sin(alfaAng*1)/2+0.5, Math.cos(alfaAng*1)/2+0.5,	//1 cima
            Math.sin(alfaAng*2)/2+0.5, Math.cos(alfaAng*2)/2+0.5,	//2 cima
            Math.sin(alfaAng*3)/2+0.5, Math.cos(alfaAng*3)/2+0.5,	//3 cima
            Math.sin(alfaAng*4)/2+0.5, Math.cos(alfaAng*4)/2+0.5,   //4 cima 
            Math.sin(alfaAng*5)/2+0.5, Math.cos(alfaAng*5)/2+0.5,   //5 cima
            Math.sin(0)/2+0.5,      Math.cos(0)/2+0.5,              //6 cima
            //
            0,   1,	        //0 baixo
			1/6, 1,	        //1 baixo
			2/6, 1,	        //2 baixo
            3/6, 1,	        //3 baixo
            4/6, 1,         //4 baixo
            5/6, 1,         //5 baixo
            1,   1,         //6 baixo
            0,   0,	        //0 cima
			1/6, 0,	        //1 cima
            2/6, 0,	        //2 cima
            3/6, 0,	        //3 cima
            4/6, 0,         //4 cima 
            5/6, 0,         //5 cima
            1,   0,         //6 cima
            //ligacao no centro inferior
			Math.sin(0)/2+0.5,      Math.cos(0)/2+0.5,	            //0 cima
			Math.sin(alfaAng*1)/2+0.5, Math.cos(alfaAng*1)/2+0.5,	//1 cima
            Math.sin(alfaAng*2)/2+0.5, Math.cos(alfaAng*2)/2+0.5,	//2 cima
            Math.sin(alfaAng*3)/2+0.5, Math.cos(alfaAng*3)/2+0.5,	//3 cima
            Math.sin(alfaAng*4)/2+0.5, Math.cos(alfaAng*4)/2+0.5,   //4 cima 
            Math.sin(alfaAng*5)/2+0.5, Math.cos(alfaAng*5)/2+0.5,   //5 cima
            Math.sin(0)/2+0.5,      Math.cos(0)/2+0.5,              //6 cima
            //centro
            0.5, 0.5                                       //centro
        ];
        

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

}