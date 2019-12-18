class MyPiece extends CGFobject {
    constructor(scene, coordX, coordZ, texture) { 
        this.scene = scene;
        this.coordX = coordX;
        this.coordZ = coordZ;
        this.tile = null; //getTile() para a coordenada X e Z
        this.texture = texture;

        this.piece = new MyHexagonalPrism(this.scene, this.texture); 
    }

    getCoordX() {
        return this.coordX;
    }

    getCoordZ() {
        return this.coordZ;
    }

    setTile(tile) {
        this.tile = tile;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.coordX, 0, this.coordZ);
        this.piece.display();
        this.piece.popMatrix();
    }
}