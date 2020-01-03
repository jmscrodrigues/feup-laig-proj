class MyBoard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;


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
            this.scene.tiles[z].display();
        }
        this.boardBorder.display();


        this.scene.pushMatrix();
        
        this.scene.translate(3.5,0,-6);

        this.player1B.display();

        this.scene.translate(5,0,0);

        this.player1R.display();

        this.scene.translate(-10,0,0);

        this.player1Y.display();

        this.scene.translate(0,0,19);

        this.player2Y.display();

        this.scene.translate(5,0,0);

        this.player2B.display();

        this.scene.translate(5,0,0);

        this.player2R.display();

        this.scene.popMatrix();
    }
}