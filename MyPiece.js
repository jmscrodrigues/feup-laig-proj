class MyPiece extends CGFobject {
    constructor(scene, coordX, coordZ, index,material) { 
        super(scene);
        this.scene = scene;
        this.coordX = coordX;
        this.coordZ = coordZ;
        this.tile = null; //getTile() para a coordenada X e Z
        this.material = material;
        this.index = index;

        this.piece = new MyHexagonalPrism(this.scene, this.material); 
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
        this.material.apply(this.material);
        this.scene.pushMatrix();  
        this.scene.translate(this.coordX*2.5, 0, this.coordZ*2.5); 
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.registerForPick(this.index, this);
        this.piece.display();
        this.scene.clearPickRegistration();
        this.scene.popMatrix();
    }
}