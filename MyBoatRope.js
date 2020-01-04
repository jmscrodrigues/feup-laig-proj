class MyBoatRope {
    constructor(scene) {
        this.scene = scene;

        this.ropeTexture = new CGFtexture(this.scene,  "images/rope.jpg");

        this.ropematerial = new CGFappearance(this.scene);
        this.ropematerial.setAmbient(1, 1, 1, 1.0);
        this.ropematerial.setDiffuse(1, 1, 1, 1.0);
        this.ropematerial.setSpecular(1, 1, 1, 1.0);
        this.ropematerial.setShininess(10.0);
        this.ropematerial.setTexture(this.ropeTexture);
        this.ropematerial.setTextureWrap('REPEAT','REPEAT');

        this.rope = new MyCylinder(this.scene, 0, 1, 1, 3, 12, 12);
    }

    display() {
        this.ropematerial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.87,1,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.8,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.6,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.4,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.2,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.9,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.7,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.5,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.3,0.25);
        this.scene.scale(0.01,0.01,0.12);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.1,0.26);
        this.scene.scale(0.01,0.3,0.01);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.rope.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.87,0.1,0.6);
        this.scene.scale(0.01,0.3,0.01);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.rope.display();
        this.scene.popMatrix();
    }

}