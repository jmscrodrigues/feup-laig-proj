class MyGameSequence extends CGFobject{
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.board = [];

        this.initialBoard = [];

        this.sequence = [];
    }

    undoMove(move) {
        this.sequence.pop();
        //FAZER ANIMAÇAO COM OS DADOS DA MOVE (MYMOVE)
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