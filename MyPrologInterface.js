class MyPrologInterface {
    constructor(scene) {
        this.scene = scene;
        this.port = 8081;

    }


    getPrologRequest(requestString) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);

    request.addEventListener("load", this.parsePrologReply());
    request.addEventListener("error", this.errorRequest());

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    }

    parsePrologReply() {
        if (this.status === 400) {
        console.log("ERROR");
        return -1;
        }

        let responseArray = textStringToArray(this.responseText,true);
        return responseArray;

    }

    errorRequest() {
        console.log("ERROR");
    }

    validMoves(board) {
        let requestString = 'valid_moves(' + board + ')';

        console.log(requestString);

        var result = this.getPrologRequest(requestString);

        if (result == -1) {
            return -1;
        }

        else {
            console.log(result);
            //DO SOMETHING WITH IT
            return 0;
        }

    }

    getBoard() {
        let requestString = 'board()';

        var result = this.getPrologRequest(requestString);

        if (result == -1) {
            return -1;
        }
        else {
            console.log(result);
            //DO SOMETHING WITH IT
            return 0;
        }
    }

    makeMove(xCoord, zCoord, Board) {
        let requestString = 'move(' + xCoord + ',' + zCoord + ',' + Board + ')';

        var result = this.getPrologRequest(requestString);

        if (result == -1) {
            return -1;
        }
        else {
            console.log(result);
            //DO SOMETHING WITH IT
            return 0;
        }
    }

    askPlayAIEasy(board, aiList) {
        var valid_moves = this.validMoves(board);

        if (valid_moves == -1) {
            return -1;
        }

        else {

            let requestString = 'makePlayAIEasy(' + board + ',' + aiList + ',' + valid_moves + ')';

            var result = this.getPrologRequest(requestString);

            if (result == -1) {
                return -1;
            }
            else {
                console.log(result);
                //DO SOMETHING WITH IT
                return 0;
            }

        }
    }

    askPlayAIHard(board, aiList) {

        var valid_moves = this.validMoves(board);

        if (valid_moves == -1) {
            return -1;
        }

        else {

            let requestString = 'makePlayAIHard(' + board + ',' + aiList + ',' + valid_moves + ')';

            var result = this.getPrologRequest(requestString);

            if (result == -1) {
                return -1;
            }
            else {
                console.log(result);
                //DO SOMETHING WITH IT
                return 0;
            }

        }

    }
    
}