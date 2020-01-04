class MyGameSequence extends CGFobject{
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.sequence = [];
    }

    undoMove() {
        this.sequence.pop();
    }

    addMove(move) {
        this.sequence.push(move);
    }

    getLastPlay() {
        if (this.sequence.length == 0) {
            return -1;
        }

        else {
            return this.sequence[this.sequence.length - 1];
        }
    }

    getSequence() {
        return this.sequence;
    }
}