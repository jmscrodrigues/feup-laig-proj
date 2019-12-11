class MyBoard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.tiles = [];

        for (var t = 0; t < 8; t++) {
            for(var j = 0; j < 8; j++) {
                this.tiles.push(new MyTile(this.scene, t, j));
                console.log('new tile');
            }
        }
    }

    display() {
        for (var z = 0; z < this.tiles.length; z++) {
            this.tiles[z].display();
        }
    }
}