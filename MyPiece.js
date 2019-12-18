class MyPiece extends CGFobject {
    constructor(scene, coordX, coordZ) { // TALVEZ RECEBER TEXTURA TAMBEM
        this.scene = scene;
        this.coordX = coordX;
        this.coordZ = coordZ;
        this.tile = null; //getTile() para a coordenada X e Z

        this.piece = new MyHexagonalPrism(this.scene); //TEXTURA TAMBEM AQUI? 

        //TRABALHO DO JUSTINO
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.coordX, 0, this.coordZ);
        this.piece.display();
        this.piece.popMatrix();
    }
}