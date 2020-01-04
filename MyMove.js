class MyMove {
    constructor(xCoord, zCoord, piece) {
        this.xCoord = xCoord;
        this.zCoord = zCoord;
        this.piece = piece;
    }

    getPiece() {
        return this.piece;
    }

    getxCoord() {
        return this.xCoord;
    }

    getzCoord() {
        return this.zCoord;
    }
}