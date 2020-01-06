class MyTile extends CGFobject {
    constructor(scene, coordX, coordZ, index) {
        super(scene);


        this.index = index;
        this.scene = scene;
        this.coordX = coordX;
        this.coordZ = coordZ;
        this.piece = null; //getPeca() para a coordenada X e Z

        this.plane = new MyPlane(scene, 60, 60);

    }

    removePiece() {
        this.piece = null;
    }

    setPiece(piece) {
        this.piece = piece;
    }

    getCoordX() {
        return this.coordX;
    }

    getCoordZ() {
        return this.coordZ;
    }

    getIndex() {
        return this.index;
    }

    display() {
        this.scene.pushMatrix();
        //this.scene.scale(20,1,20);
        this.scene.translate(this.coordX, 0, this.coordZ);      
        this.plane.display();
        this.scene.popMatrix();
    }


}
