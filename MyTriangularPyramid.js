
class MyTriangularPyramid extends CGFobject {
    constructor(scene) {
        super(scene);
       
        this.scene = scene;
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices =     [];
        this.indices =      [];
        this.normals =      [];
        this.texCoords =    [];

        //VERTICES

        this.vertices.push(Math.sin(0)                  , Math.cos(0)                    ,0);    //0
        this.vertices.push(Math.sin(Math.PI/3*1)*0.25    , Math.cos(Math.PI/3*1)*3      ,0);    //1
        this.vertices.push(Math.sin(-Math.PI/3*1)*0.25   , Math.cos(-Math.PI/3*1)*3     ,0);    //2
        this.vertices.push(Math.sin(0)                  , Math.cos(0)                    ,0);    //3

        this.vertices.push(Math.sin(0)                  , Math.cos(0)                    ,1);    //4
        this.vertices.push(Math.sin(Math.PI/3*1)*0.25    , Math.cos(Math.PI/3*1)*3      ,1);    //5
        this.vertices.push(Math.sin(-Math.PI/3*1)*0.25   , Math.cos(-Math.PI/3*1)*3     ,1);    //6
        this.vertices.push(Math.sin(0)                  , Math.cos(0)                    ,1);    //7

        this.vertices.push(Math.sin(0)                   , Math.cos(0)                   ,1.25); //8
        this.vertices.push(Math.sin(Math.PI/3*1)*0.25    , Math.cos(Math.PI/3*1)*3      ,1.25);    //9
        this.vertices.push(Math.sin(-Math.PI/3*1)*0.25   , Math.cos(-Math.PI/3*1)*3     ,1.25);    //10
        this.vertices.push(Math.sin(0)                   , Math.cos(0)                   ,1.25); //11

        this.vertices.push(Math.sin(0)                   , Math.cos(0)                   ,2);    //12
        this.vertices.push(Math.sin(0)                   , Math.cos(0)                   ,2);    //13
        this.vertices.push(Math.sin(0)                   , Math.cos(0)                   ,2);    //14
    
        
        //INDICES

        this.indices.push(1,0,2);

        for(var j = 0; j != 2; j++) {
            for(var i = 0; i != 3; i++) {
                this.indices.push(1+i + (j*4)   ,5+i + (j*4)    ,4+i + (j*4) );
                this.indices.push(4+i + (j*4)   ,0+i + (j*4)    ,1+i + (j*4) );
            }
        }

        for (var i = 0; i !=3; i++) 
            this.indices.push(12+i, 8+i, 9+i);

        //NORMALS

        for (var i = 0; i !=4; i++)
            this.normals.push(0,0,-1);

            this.normals.push(-Math.sin(0)                  , -Math.cos(0)                    ,0);    //4
            this.normals.push(Math.sin(Math.PI/3*1)*0.25    , Math.cos(Math.PI/3*1)*3      ,0);    //5
            this.normals.push(Math.sin(-Math.PI/3*1)*0.25   , Math.cos(-Math.PI/3*1)*3     ,0);    //6
            this.normals.push(-Math.sin(0)                  , -Math.cos(0)                    ,0);    //7

            this.normals.push(-Math.sin(0)                  , -Math.cos(0)                    ,0);    //7
            this.normals.push(Math.sin(Math.PI/3*1)*0.25    , Math.cos(Math.PI/3*1)*3      ,1);    //5
            this.normals.push(Math.sin(-Math.PI/3*1)*0.25   , Math.cos(-Math.PI/3*1)*3     ,1);    //6
            this.normals.push(-Math.sin(0)                  , -Math.cos(0)                    ,0);    //7
            
        for (var i = 0; i !=3; i++)    
            this.normals.push(0,0,1);

        //TEXTURE

        for (var i = 0; i != 4; i++)
            this.texCoords.push(i/3,0);

        for (var i = 0; i != 4; i++)
            this.texCoords.push(i/3,-0.5);
            
        for (var i = 0; i != 4; i++)
            this.texCoords.push(i/3,-0.75);

        for (var i = 0; i != 3; i++)
            this.texCoords.push(i/2,-1);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}
