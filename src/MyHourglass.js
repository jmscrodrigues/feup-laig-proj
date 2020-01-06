class MyHourglass {
    constructor (scene) {
        this.scene = scene;
    
        this.outherRingDw = new MyTorus (this.scene, 1, 4, 2, 0.5, 6);
        this.outherRingUp = new MyTorus (this.scene, 1, 4, 2, 0.5, 6);

        this.innerRingDw = new MyTorus (this.scene, 1, 4, 1, 0.5, 6);
        this.innerRingUp = new MyTorus (this.scene, 1, 4, 1, 0.5, 6);
  
        this.sphereDw = new MySphere (this.scene, 1, 1, 6, 6);
        this.sphereUp = new MySphere (this.scene, 1, 1, 6, 6);

        this.cylinderDw = new MyCylinder (this.scene, 1, 1, 0, 2, 6, 6);
        this.cylinderUp = new MyCylinder (this.scene, 1, 0, 1, 2, 6, 6);

        this.textureGlass = new CGFtexture(this.scene, 'images/glass.jpg');
        this.materialGlass = new CGFappearance(this.scene);
        this.materialGlass.setAmbient(1, 1, 1, 1.0);
        this.materialGlass.setDiffuse(1, 1, 1, 1.0);
        this.materialGlass.setSpecular(1, 1, 1, 1.0);
        this.materialGlass.setShininess(10.0);
        this.materialGlass.setTexture(this.textureGlass);
        this.materialGlass.setTextureWrap('REPEAT','REPEAT');

        this.textureWood = new CGFtexture(this.scene, 'images/darkwood.jpg');
        this.materialWood = new CGFappearance(this.scene);
        this.materialWood.setAmbient(1, 1, 1, 1.0);
        this.materialWood.setDiffuse(1, 1, 1, 1.0);
        this.materialWood.setSpecular(1, 1, 1, 1.0);
        this.materialWood.setShininess(10.0);
        this.materialWood.setTexture(this.textureWood);
        this.materialWood.setTextureWrap('REPEAT','REPEAT');

    }

    display () {

        this.scene.pushMatrix();

        this.scene.scale(0.5,0.5,0.5);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.materialWood.apply();

        this.outherRingDw.display();

        this.innerRingDw.display();

        this.scene.translate(0,0,1);

        this.materialGlass.apply();

        this.sphereDw.display();

        this.scene.translate(0,0,0.24);

        this.cylinderDw.display();

        this.scene.translate(0,0,1);

        this.cylinderUp.display();

        this.scene.translate(0,0,2.3);

        this.sphereUp.display();

        this.scene.translate(0,0,1);

        this.materialWood.apply();

        this.innerRingUp.display();

        this.outherRingUp.display();

        this.scene.popMatrix();

    }

}