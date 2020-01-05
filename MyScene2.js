class MyScene2 {
    constructor(scene) {
        this.scene = scene;

        this.umbrelaTexture = new CGFtexture(this.scene, "images/umbrela.jpg");
        this.woodTexture = new CGFtexture(this.scene, "images/wood.jpg");
        this.metalTexture = new CGFtexture(this.scene, "images/cleanMetal.jpg");

        this.woodmaterial = new CGFappearance(this.scene);
        this.woodmaterial.setAmbient(1, 1, 1, 1.0);
        this.woodmaterial.setDiffuse(1, 1, 1, 1.0);
        this.woodmaterial.setSpecular(1, 1, 1, 1.0);
        this.woodmaterial.setShininess(10.0);
        this.woodmaterial.setTexture(this.woodTexture);
        this.woodmaterial.setTextureWrap('REPEAT','REPEAT');


        this.umbrelamaterial = new CGFappearance(this.scene);
        this.umbrelamaterial.setAmbient(1, 1, 1, 1.0);
        this.umbrelamaterial.setDiffuse(1, 1, 1, 1.0);
        this.umbrelamaterial.setSpecular(1, 1, 1, 1.0);
        this.umbrelamaterial.setShininess(10.0);
        this.umbrelamaterial.setTexture(this.umbrelaTexture);
        this.umbrelamaterial.setTextureWrap('REPEAT','REPEAT');

        this.metalmaterial = new CGFappearance(this.scene);
        this.metalmaterial.setAmbient(1, 1, 1, 1.0);
        this.metalmaterial.setDiffuse(1, 1, 1, 1.0);
        this.metalmaterial.setSpecular(1, 1, 1, 1.0);
        this.metalmaterial.setShininess(10.0);
        this.metalmaterial.setTexture(this.metalTexture);
        this.metalmaterial.setTextureWrap('REPEAT','REPEAT');

        this.carpet = new MyTorus(this.scene, 0, 12, 12, 12, 12);
        this.carpetG = new MyTorus(this.scene, 0, 12, 24, 1, 12);

        this.post = new MyCylinder (this.scene, 0, 1, 1, 1, 6, 6);
        this.topPost = new MyCylinder (this.scene, 0, 1, 0, 1, 6, 6);
        
    }

    display() {
        this.umbrelamaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(0,20,0);

        this.scene.pushMatrix();
        this.scene.scale(1,0.1,1);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.carpet.display();
        this.scene.popMatrix();

        this.metalmaterial.apply();

        this.scene.pushMatrix();

        this.scene.scale(0.4,1,0.4);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0 ,0);
        this.post.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.rotate(-Math.PI/2, 1, 0 ,0);
        this.topPost.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,40,1);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.post.display();
        this.scene.popMatrix();

        this.woodmaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,-20,0);
        this.scene.scale(1,0.1,1);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.carpet.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-19,0);
        this.scene.rotate(Math.PI/2, 1, 0 ,0);
        this.carpetG.display();
        this.scene.popMatrix();


        this.scene.popMatrix();

        this.scene.popMatrix();

        /*
        this.watermaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,0.75,0.75);
        this.scene.scale(0.5,0.25,1);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.boatProw.display();
        this.scene.popMatrix();
        */
    }

    //Tem as transformacoes necessarias para por os elementos no local certo

    timerPosition() {
        this.scene.translate(-2,1.2,0);
    }

    boardPosition() {
        this.scene.translate(2,1.2,-1.75);
        this.scene.scale(0.5,1,0.5);
    }

    announcementsPanelPosition() {
        this.scene.translate(-6,1,0);
    }

    piecesPosition() {
        this.scene.translate(2,1.2,1.75);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
    } 

    controlPanelPosition() {
        this.scene.translate(3, -1.1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
    }
    
    //Tem as coodenadas da camera e o ponto para onde esta a ver

    cameraCoords() {
        let coords0 = vec3.fromValues(10, -30, 1);
        let coords1 = vec3.fromValues(0, 18, 15);
        let coords2 = vec3.fromValues(0,18, -15);
        return new Array(coords0,  coords1, coords2);
    }

    cameraViewPoints() {
        let VP0 = vec3.fromValues(10, 0, 0);
        let VP1 = vec3.fromValues(0, 2, 0);
        let VP2 = vec3.fromValues(0,2,0);
        return new Array(VP0,VP1,VP2);
    }
}