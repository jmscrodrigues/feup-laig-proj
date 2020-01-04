class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        const gameStates = Object.freeze({
            menu : "Menu",
            loadGame : "LoadGame",
            gameMove : "GameMove",
            animation : "Animation",
            gameOver: "GameOver"
        });

        this.gameState = gameStates.menu;

        this.scene = scene;


        this.board = new MyBoard(this.scene);
        //this.theme = new MySceneGraph(this.scene);  ADD MySceneGraph with the needed changes
        this.prolog = new MyPrologInterface(this.scene); 
        //this.animator = new MyAnimator(this.scene);
        this.gameSequence = new MyGameSequence(this.scene);

    }



    getBoardProl() {
        let rep = function(data) {
            this.scene.pieces = data;

        };

        let requestString = 'board';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));

    }


    getValidMoves(board) {
        let rep = function(data) {
            this.scene.validMoves = data;
        
        };

        let requestString = 'valid_moves([' + '[' +board[0] + ']'+ ',' + '[' +board[1] + ']' + ','+ '[' +board[2] + ']' + ',' + '[' +board[3] + ']' + ',' + '[' +board[4] + ']'
        + ',' + '[' +board[5] + ']' + ',' + '[' +board[6] + ']' + ',' + '[' + board[7] + ']' + '])';


        return this.prolog.getPrologRequest(requestString, rep.bind(this));



    }


    movePiece(xCoord, zCoord, board) {
        let rep = function(data) {

            
            console.log(data[0]);

            this.scene.pieces = data[0];


            //FAZER ALGO COM A PEÇA, data[1]
        
        };

        let requestString = 'move(' + xCoord + ',' + zCoord  + ',' + '[' + '[' + board[0] + ']' + ',' + '[' + board[1] + ']' + ',' + 
         '[' + board[2] + ']' + ',' + '[' + board[3] + ']' + ',' + '[' + board[4] + ']' + ',' + '[' + board[5] + ']' + ',' + '[' + board[6] + ']' + ',' + 
         '[' + board[7] + ']' +'])';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));
    }


    askPlayAIEasy(board, aiList, validMoves) {
        let rep = function(data) {

            this.scene.pieces = data[0];

            this.scene.listP2 = data[1];

            //X = data[2];

            //Y = data[3];

            //ANIMACAO DA PEÇA COM ESSAS COORDENADAS PARA O CONTAINER ESPECIFICO
            //REMOVER O APONTADOR PARA O TILE DA PEÇA
            //LISTA DO BOT JA ATUALIZADA (DATA[1])
        };

        var movesString = '[';

        for (var i = 0; i < validMoves.length; i++) {
            if (i == 0) {

            }
            else {movesString += ',';}

            movesString += ( '[' + validMoves[i] + ']');
        }

        movesString += ']';

        var aiListS = '[';

        for (var l = 0; l < aiList.length; l++) {
            if (l == 0) {

            }
            else {aiListS += ',';}

            aiListS += aiList[l];
        }

        aiListS += ']'

        let requestString = 'makePlayAIEasy([' +'[' + board[0] + ']' + ',' + '[' + board[1] + ']' + ',' + 
        '[' + board[2] + ']' + ',' + '[' + board[3] + ']' + ',' + '[' + board[4] + ']' + ',' + '[' + board[5] + ']' + ',' + '[' + board[6] + ']' + ',' + 
        '[' + board[7] + ']' +  '],' + aiListS + ',' + movesString + ')';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));


    }

    askPlayAIHard(board, aiList, validMoves) {
        let rep = function(data) {

            this.scene.pieces = data[0];

            this.scene.listP2 = data[1];

            //X = data[2];

            //Y = data[3];

            //ANIMACAO DA PEÇA COM ESSAS COORDENADAS PARA O CONTAINER ESPECIFICO
            //REMOVER O APONTADOR PARA O TILE DA PEÇA
            //LISTA DO BOT JA ATUALIZADA (DATA[1])



        };

        var movesString = '[';

        for (var i = 0; i < validMoves.length; i++) {
            if (i == 0) {

            }
            else {movesString += ',';}

            movesString += ( '[' + validMoves[i] + ']');
        }

        movesString += ']';

        var aiListS = '[';

        for (var l = 0; l < aiList.length; l++) {
            if (l == 0) {

            }
            else {aiListS += ',';}

            aiListS += aiList[l];
        }

        aiListS += ']'

        

        let requestString = 'makePlayAIHard([' +'[' + board[0] + ']' + ',' + '[' + board[1] + ']' + ',' + 
        '[' + board[2] + ']' + ',' + '[' + board[3] + ']' + ',' + '[' + board[4] + ']' + ',' + '[' + board[5] + ']' + ',' + '[' + board[6] + ']' + ',' + 
        '[' + board[7] + ']' +  '],' + aiListS + ',' + movesString + ')';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));


    }


    parseBoard(board) {
        var index = 1;

        var associationTile = null;
        

        for (var t = 0; t < board.length; t++) {
            for (var z = 0; z < board[t].length; z++) {

                for(var s = 0; s < this.scene.tiles.length; s++) {
                    if ((this.scene.tiles[s].getCoordX == t) && (this.scene.tiles[s] == z)) {
                        associationTile = this.scene.tiles[s];
                        break;
                    }
                    
                }
                if (board[t][z] == "r") {
                    var newPiece = new MyPiece(this.scene,t,z,index,null); //RED TEXT
                    newPiece.setTile = associationTile;
                    this.scene.piecesBoard.push(newPiece);

                }
                else if (board[t][z] == "a") {
                    var newPiece = new MyPiece(this.scene,t,z,index,null); //YELLOW TEXT
                    newPiece.setTile = associationTile;
                    this.scene.piecesBoard.push(newPiece);
                    
                }

                else if (board[t][z] == "b"){
                    var newPiece = new MyPiece(this.scene,t,z,index, null); //BLUE TEXT
                    newPiece.setTile = associationTile;
                    this.scene.piecesBoard.push(newPiece);
                    
                }
                else {
                    //ASTERISCO
                }
                index++;
            }
        }


    }




    initiateGame() {
        this.getBoardProl();

        setTimeout( () => this.getValidMoves(this.scene.pieces), 3000);

        setTimeout( () => this.parseBoard(this.scene.pieces), 4000);

    }



    easyBotPlay() {
        setTimeout( () => this.getValidMoves(this.scene.pieces),3000);

        setTimeout( () => this.askPlayAIEasy(this.scene.pieces,this.scene.listP2,this.scene.validMoves),5000);

        

    }

    hardBotPlay() {
        this.getValidMoves(this.scene.pieces);

        setTimeout( () => this.askPlayAIHard(this.scene.pieces,this.scene.listP2,this.scene.validMoves),2000);


    }



    orchestrate() {
        switch(this.gameState) {
            case menu:
                break;
            case loadGame:
                break;
            case gameMove:
                break;
            case animation:
                break;
            case gameOver:
                break;
            default:
                break;
        }

    }

    update(time) {
        //this.animator.update(time);
    }


    display() {

        this.board.display();
        
    }

    
        

}