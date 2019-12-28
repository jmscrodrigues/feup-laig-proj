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

    }

    display () {

        this.scene.pushMatrix();

        this.outherRingDw.display();

        this.innerRingDw.display();

        this.scene.translate(0,0,1);

        this.sphereDw.display();

        this.scene.translate(0,0,0.24);

        this.cylinderDw.display();

        this.scene.translate(0,0,1);

        this.cylinderUp.display();

        this.scene.translate(0,0,2.3);

        this.sphereUp.display();

        this.scene.translate(0,0,1);

        this.innerRingUp.display();

        this.outherRingUp.display();

        this.scene.popMatrix();

    }

}