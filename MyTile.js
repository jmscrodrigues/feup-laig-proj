class MyTile extends CGFobject {
    constructor(scene, coordX, coordZ) {
        super(scene);
        
        this.scene = scene;
        this.coordX = coordX;
        this.coordZ = coordZ;
        this.piece = null; //getPeca() para a coordenada X e Z

        this.plane = new MyPlane(scene, 60, 60);

    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.coordX, 0, this.coordZ);
        this.scene.scale(20,1,20);
        this.plane.display();
        this.scene.popMatrix();
    }


}