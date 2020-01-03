class MyPrologInterface {
    constructor(scene) {
        this.scene = scene;
        this.port = 8081;

    }


    getPrologRequest(requestString, onSuccess) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);

    request.onload = function(data) {
        
        let reply;

        reply = data.target.response;

        onSuccess(reply);
    }

    request.onerror = function(){console.log("Error!");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    }

    getPrologRequestArray(requestString, onSuccess) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);
    
        request.onload = function(data) {
            
            let reply;
    
            reply = JSON.parse(data.target.response);
    
            onSuccess(reply);
        }
    
        request.onerror = function(){console.log("Error!");};
    
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
        }



    makeMove(xCoord, zCoord, Board) {
        let requestString = 'move(' + xCoord + ',' + zCoord + ',' + Board + ')';

       
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

    exitProlog() {
        let requestString = 'quit';

    }
    
}