class MyGameSequence  {
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
}