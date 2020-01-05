class MyScene1 {
    constructor(scene) {
        this.scene = scene;

        this.water = new MyPlane(scene, 30, 30);

        this.waterTexture = new CGFtexture(this.scene, "images/waterTex.jpg");
        this.waterTexture2 = new CGFtexture(this.scene, "images/waterMap.jpg");
        this.woodTexture = new CGFtexture(this.scene, "images/wood.jpg");
        this.flagTexture = new CGFtexture(this.scene, "images/flag.jpg");
        this.cabinTexture = new CGFtexture(this.scene, "images/cabin.jpg");
        this.cabinRoofTexture = new CGFtexture(this.scene,  "images/roof.jpg");
        this.ropeTexture = new CGFtexture(this.scene,  "images/rope.jpg");
        
        this.watermaterial = new CGFappearance(this.scene);
        this.watermaterial.setAmbient(1, 1, 1, 1.0);
        this.watermaterial.setDiffuse(1, 1, 1, 1.0);
        this.watermaterial.setSpecular(1, 1, 1, 1.0);
        this.watermaterial.setShininess(10.0);
        this.watermaterial.setTexture(this.waterTexture);
        this.watermaterial.setTextureWrap('REPEAT','REPEAT');

        this.woodmaterial = new CGFappearance(this.scene);
        this.woodmaterial.setAmbient(1, 1, 1, 1.0);
        this.woodmaterial.setDiffuse(1, 1, 1, 1.0);
        this.woodmaterial.setSpecular(1, 1, 1, 1.0);
        this.woodmaterial.setShininess(10.0);
        this.woodmaterial.setTexture(this.woodTexture);
        this.woodmaterial.setTextureWrap('REPEAT','REPEAT');

        this.woolmaterial = new CGFappearance(this.scene);
        this.woolmaterial.setAmbient(1, 1, 1, 1.0);
        this.woolmaterial.setDiffuse(1, 1, 1, 1.0);
        this.woolmaterial.setSpecular(1, 1, 1, 1.0);
        this.woolmaterial.setShininess(10.0);
        this.woolmaterial.setTexture(this.flagTexture);
        this.woolmaterial.setTextureWrap('REPEAT','REPEAT');

        this.roofmaterial = new CGFappearance(this.scene);
        this.roofmaterial.setAmbient(1, 1, 1, 1.0);
        this.roofmaterial.setDiffuse(1, 1, 1, 1.0);
        this.roofmaterial.setSpecular(1, 1, 1, 1.0);
        this.roofmaterial.setShininess(10.0);
        this.roofmaterial.setTexture(this.cabinRoofTexture);
        this.roofmaterial.setTextureWrap('REPEAT','REPEAT');

        this.ropematerial = new CGFappearance(this.scene);
        this.ropematerial.setAmbient(1, 1, 1, 1.0);
        this.ropematerial.setDiffuse(1, 1, 1, 1.0);
        this.ropematerial.setSpecular(1, 1, 1, 1.0);
        this.ropematerial.setShininess(10.0);
        this.ropematerial.setTexture(this.ropeTexture);
        this.ropematerial.setTextureWrap('REPEAT','REPEAT');

        this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");

        this.boatBody = new MyHexagonalPrism(this.scene, this.woodTexture);
        this.boatProw = new MyCylinder(this.scene, 1, 1, 0, 2, 6, 6);
        this.boarMast = new MyCylinder(this.scene, 1, 1, 1, 3, 6, 6);
        this.boarMastCrox = new MyCylinder(this.scene, 1, 1, 1, 3, 6, 6);
        this.boarDeck = new MyPlane(this.scene, 30, 30);
        this.boarDeckUp = new MyTriangle(this.scene, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0);
        this.boarDeckDw = new MyTriangle(this.scene, 0, 1, 0, 0, -1, 0, 0, 0, -1, 0);
        this.flag = new MyHexagonalPrism(this.scene, this.woodTexture);
        this.boarMastEnd = new MySphere (this.scene, 0, 1, 6, 6);

        this.cabin = new MyButton(this.scene, "images/roof.jpg");
        this.cabin.chanegeTextureSides(this.cabinTexture);

        this.cabinRoof = new MyCylinder(this.scene, 0, 1, 0, 0.1, 4, 4);

        this.rope = new MyCylinder(this.scene, 0, 1, 1, 3, 12, 12);

        this.boatRope = new MyBoatRope(this.scene);

        this.post = new MyButton(this.scene, "images/wood.jpg");
        this.post.chanegeTextureSides(this.woodTexture);
    }

    update(t) {
        this.waterShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    }

    display() {
        this.scene.pushMatrix();
        this.watermaterial.apply();

        this.scene.setActiveShader(this.waterShader);        

        this.waterTexture.bind(0);
        this.waterTexture2.bind(1);      

        this.scene.scale(5,5,5);

        this.water.display();

        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.woodmaterial.apply();
        this.scene.translate(0,1,0);
        this.scene.scale(1,1,1.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.boatBody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.75,0.75);
        this.scene.scale(0.5,0.25,1);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.boatProw.display();
        this.scene.popMatrix();
    
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.scale(0.1,1.5,0.1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.boarMast.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.1,3.25,0);
        this.scene.scale(0.75,0.1,0.1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.boarMastCrox.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.scale(1.76,0.1,1.5);
        //this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.boarDeck.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.75,1,0.75);
        this.scene.scale(0.75,1,1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.boarDeckUp.display();
        this.scene.popMatrix();


        this.woolmaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,3.25,0.1);
        this.scene.scale(1.2,1.25,0.1);
        //this.scene.rotate(Math.PI/2, 1, 0, 0);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.flag.display();
        this.scene.popMatrix();

        this.woodmaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,4.5,0);
        this.scene.scale(0.1,0.01,0.1);
        //this.scene.rotate(Math.PI/2, 1, 0, 0);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.boarMastEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.15,3.25,0);
        this.scene.scale(0.01,0.1,0.1);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.boarMastEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.1,3.25,0);
        this.scene.scale(0.01,0.1,0.1);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.boarMastEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1,-0.8);
        this.scene.scale(0.75,0.5,0.5);
        //this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.cabin.display();
        this.scene.popMatrix();

        this.roofmaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,1.5,-0.8);
        this.scene.scale(0.7,2,0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.cabinRoof.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.boatRope.display();
        this.scene.translate(-1.75,0,0);
        this.boatRope.display();
        this.scene.popMatrix();

        //post

        this.scene.pushMatrix();
        this.scene.translate(0.85,1,0.22);
        this.scene.scale(0.05,0.2,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.post.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.85,1,0.64);
        this.scene.scale(0.05,0.2,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.post.display();
        this.scene.popMatrix();




        this.scene.pushMatrix();
        this.scene.translate(0.85,1,-0.72);
        this.scene.scale(0.05,0.2,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.post.display();
        this.scene.popMatrix();

        //other side
        this.scene.pushMatrix();
        this.scene.translate(-0.85,1,0.22);
        this.scene.scale(0.05,0.2,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.post.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.85,1,0.64);
        this.scene.scale(0.05,0.2,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.post.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.85,1,-0.72);
        this.scene.scale(0.05,0.2,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.post.display();
        this.scene.popMatrix();

        //rope
        this.ropematerial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.85,1.15,-0.7);
        this.scene.scale(0.01,0.01,0.3);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.85,1.15,-0.7);
        this.scene.scale(0.01,0.01,0.3);
        this.rope.display();
        this.scene.popMatrix();

    }

    //Tem as transformacoes necessarias para por os elementos no local certo

    timerPosition() {
        this.scene.translate(0,1,0.25);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
    }

    boardPosition() {
        this.scene.translate(-0.15,1.01,0.9);
        this.scene.scale(0.05,0.05,0.05);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
    }

    announcementsPanelPosition() {
        this.scene.translate(0,1,1.3);
        this.scene.scale(0.1,0.08,0.1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
    }

    piecesPosition() {
        this.scene.translate(-0.15,1,0.52);
        this.scene.scale(0.05,0.05,0.05);
        //this.scene.rotate(-Math.PI/2, 1, 0, 0);
    } 

    controlPanelPosition() {
        this.scene.translate(0.85,0.65,0);
        this.scene.scale(0.1,0.08,0.1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
    }
    
    //Tem as coodenadas da camera e o ponto para onde esta a ver

    cameraCoords() {
        let coords0 = vec3.fromValues(5, 2, 0);
        let coords1 = vec3.fromValues(3, 3, 1);
        let coords2 = vec3.fromValues(-3,3,1);
        return new Array(coords0,  coords1, coords2);
    }

    cameraViewPoints() {
        let VP0 = vec3.fromValues(0, 0, 0);
        let VP1 = vec3.fromValues(0, 1, 1);
        let VP2 = vec3.fromValues(0,1,1);
        return new Array(VP0,VP1,VP2);
    }
}