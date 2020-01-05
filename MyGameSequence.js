class MyGameSequence extends CGFobject{
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.board = [];

        this.initialBoard = [];

        this.sequence = [];
    }

    undoMove() {
        this.sequence.pop();
        //Fazer animação
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

    getBoard() {
        return this.board;
    }

    setBoard(board) {
        this.board = board;
    }

    setInitialBoard(board) {
        this.initialBoard = board;
    }

    getSequence() {
        return this.sequence;
    }
}