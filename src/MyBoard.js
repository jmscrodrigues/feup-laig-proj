class MyBoard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.textureWood = new CGFtexture(this.scene, 'images/darkwood.jpg');
        this.materialWood = new CGFappearance(this.scene);
        this.materialWood.setAmbient(1, 1, 1, 1.0);
        this.materialWood.setDiffuse(1, 1, 1, 1.0);
        this.materialWood.setSpecular(1, 1, 1, 1.0);
        this.materialWood.setShininess(10.0);
        this.materialWood.setTexture(this.textureWood);
        this.materialWood.setTextureWrap('REPEAT','REPEAT');

        this.texturewhiteRock = new CGFtexture(this.scene, 'images/darkwood.jpg');
        this.materialWhiteRock = new CGFappearance(this.scene);
        this.materialWhiteRock.setAmbient(1, 1, 1, 1.0);
        this.materialWhiteRock.setDiffuse(1, 1, 1, 1.0);
        this.materialWhiteRock.setSpecular(1, 1, 1, 1.0);
        this.materialWhiteRock.setShininess(10.0);
        this.materialWhiteRock.setTexture(this.texturewhiteRock);
        this.materialWhiteRock.setTextureWrap('REPEAT','REPEAT');

        this.textureblackRock = new CGFtexture(this.scene, 'images/wool.jpg');
        this.materialBlackRock = new CGFappearance(this.scene);
        this.materialBlackRock.setAmbient(1, 1, 1, 1.0);
        this.materialBlackRock.setDiffuse(1, 1, 1, 1.0);
        this.materialBlackRock.setSpecular(1, 1, 1, 1.0);
        this.materialBlackRock.setShininess(10.0);
        this.materialBlackRock.setTexture(this.textureblackRock);
        this.materialBlackRock.setTextureWrap('REPEAT','REPEAT');


        this.player1R = new MyPieceHolder(this.scene);
        this.player1Y = new MyPieceHolder(this.scene);
        this.player1B = new MyPieceHolder(this.scene);
       
        this.player2R = new MyPieceHolder(this.scene);
        this.player2Y = new MyPieceHolder(this.scene);
        this.player2B = new MyPieceHolder(this.scene);

        this.boardBorder = new MyBoardBorder(this.scene);

        this.index = 1;

        for (var t = 0; t < 8; t++) {
            for(var j = 0; j < 8; j++) {

                this.tile = new MyTile(this.scene, t, j, this.index);
                this.scene.tiles.push(this.tile);

                this.index++;
            }
        }

        
    }

    getTiles() {
        return this.scene.tiles;
    }

    display() {
        for (var z = 0; z < this.scene.tiles.length; z++) {
            if((Math.floor(z/8))%2 == 0) {
            if(z%2 == 0) this.materialBlackRock.apply();
            else this.materialWhiteRock.apply();
            }else{
                if(z%2 == 0) this.materialWhiteRock.apply();
                else this.materialBlackRock.apply();
            }
            this.scene.tiles[z].display();
        }

        this.materialWood.apply();

        this.boardBorder.display();


        this.scene.pushMatrix();
        this.scene.translate(3.5,0,-6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.player1B.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(8.5,0,-6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.player1R.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,-6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.player1Y.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,13);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.player2Y.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,13);
        this.scene.translate(5,0,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.player2B.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(8.5,0,13);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.player2R.display();
        this.scene.popMatrix();
    }
}