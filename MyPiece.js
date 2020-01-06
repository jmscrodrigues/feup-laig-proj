class MyPiece extends CGFobject {
    constructor(scene, coordX, coordZ, index,material) { 
        super(scene);
        this.scene = scene;
        this.coordX = coordX;
        this.coordZ = coordZ;
        this.coordY = 0;
        this.tile = null; //getTile() para a coordenada X e Z
        this.material = material;
        this.index = index;

        this.piece = new MyHexagonalPrism(this.scene, this.material); 
        this.halo = new MyTorus(this.scene, 0, 12, 1.25, 0.75, 12);

        this.textureGold = new CGFtexture(this.scene, 'images/gold.jpg');
        this.materialGold = new CGFappearance(this.scene);
        this.materialGold.setAmbient(1, 1, 1, 1.0);
        this.materialGold.setDiffuse(1, 1, 1, 1.0);
        this.materialGold.setSpecular(1, 1, 1, 1.0);
        this.materialGold.setShininess(10.0);
        this.materialGold.setTexture(this.textureGold);
        this.materialGold.setTextureWrap('REPEAT','REPEAT');
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
        this.scene.translate(this.coordX*2.5, this.coordY, this.coordZ*2.5); 
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.registerForPick(this.index, this);
        this.piece.display();
        if(this.coordY != 0) {
            this.materialGold.apply();
            this.scene.translate(0, 0, 1.5);
            this.scene.scale(0.5,0.5,0.2);
            this.halo.display(); 
        }

        this.scene.clearPickRegistration();
        this.scene.popMatrix();
    }
}