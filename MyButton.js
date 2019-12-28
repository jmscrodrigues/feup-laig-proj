class MyButton {
    constructor(scene, text) {
        this.scene = scene;

        this.texture = new CGFtexture(this.scene, text);
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.setDiffuse(1, 1, 1, 1.0);
        this.material.setSpecular(1, 1, 1, 1.0);
        this.material.setShininess(10.0);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT','REPEAT');

        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.whiteMaterial.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.whiteMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.whiteMaterial.setShininess(10.0);

        this.planeFront = new MyPlane(scene, 30, 30);
        this.planeU = new MyPlane(scene, 30, 30);
        this.planeD = new MyPlane(scene, 30, 30);
        this.planeR = new MyPlane(scene, 30, 30);
        this.planeL = new MyPlane(scene, 30, 30);
    }

    display () {

        this.scene.pushMatrix();

        this.material.apply();

        this.scene.translate(0,1,0);

        this.planeFront.display();

        this.whiteMaterial.apply();

        
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0,0.5,0.5);
        this.planeU.display();


        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(-0.5,0.5,0);
        this.planeR.display();

        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(-0.5,0.5,0);
        this.planeD.display();

        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.translate(-0.5,0.5,0);
        this.planeL.display();

        this.scene.popMatrix();

    }

    reTexture(texture) {
        this.material.setTexture(texture);
    }

}