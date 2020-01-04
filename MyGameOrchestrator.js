const gameStates = Object.freeze({
    menu : "Menu",
    loadGame : "LoadGame",
    loadScene : "LoadScene",
    gamePlayerPlayer : "GamePlayerPlayer",
    gamePlayerBotEasy : "GamePlayerBotEasy",
    gamePlayerBotHard : "GamePlayerBotHard",
    gameBotBot : "GameBotBot",
    gameOver: "GameOver"
});

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        

        this.gameState = gameStates.loadGame;

        this.scene = scene;


        this.board = new MyBoard(this.scene);
        //this.theme = new MySceneGraph(this.scene);  ADD MySceneGraph with the needed changes
        this.prolog = new MyPrologInterface(this.scene); 
        //this.animator = new MyAnimator(this.scene);
        this.gameSequence = new MyGameSequence(this.scene);

    }


    setGameState(gameState) {
        this.gameState = gameState;
        this.orchestrate();
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

            this.gameSequence.addMove(new MyMove(xCoord, zCoord, data[1])); //ADICIONA A SEQUENCIA DO JOGO

            //FAZER A ANIMAÇAO DA PEÇA PARA O RESPETIVO CONTAINER
            //ADICIONAR A LISTA DO PLAYER HUMANO EM QUESTAO (talvez passar como parametro a esta função)
        
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


            this.gameSequence.addMove(new MyMove(data[2], data[3], data[4])); //ADICIONA A SEQUENCIA DO JOGO


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

            //Z = data[3];

            //Peca = data[4]

            this.gameSequence.addMove(new MyMove(data[2], data[3], data[4])); //ADICIONA A SEQUENCIA DO JOGO


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

        setTimeout( () => this.getValidMoves(this.scene.pieces), 2500);

        setTimeout( () => this.parseBoard(this.scene.pieces), 3000);

    }



    easyBotPlay() {
        setTimeout( () => this.getValidMoves(this.scene.pieces),3000);

        setTimeout( () => this.askPlayAIEasy(this.scene.pieces,this.scene.listP2,this.scene.validMoves),5000);

        

    }

    hardBotPlay() {
        this.getValidMoves(this.scene.pieces);

        setTimeout( () => this.askPlayAIHard(this.scene.pieces,this.scene.listP2,this.scene.validMoves),2000);


    }


    undoSequenceMove() {
        var move = this.gameSequence.getLastPlay();

        if (move == -1) {
            return -1;
        }
        else {
            //FAZER A ANIMAÇÃO INVERSA DO MOVE
            this.gameSequence.undoMove();
        }
    }


    gameSequence() {
        var sequenceVector = this.gameSequence.getSequence();
        for(var m = 0; m < sequenceVector.length; m++) {
            //DISPLAY DA ANIMAÇÃO INVERSA DO MOVE DE sequenceVector[m];
            console.log("1");
        }
    }



    orchestrate() {
        switch(this.gameState) {

            case gameStates.loadGame:
                this.initiateGame();
                this.gameState = gameStates.menu;
                console.log("YO");
                this.orchestrate();
                break;

            case gameStates.loadScene:
                console.log("what?");
                //IR BUSCAR A SCENE
                break;

            

            case gameStates.menu:
                console.log("AW HE\n");

                break;

            case gameStates.gamePlayerPlayer:
                console.log("Na na");
                // INICIO DO LOOP JOGADOR JOGADOR
                break;

            case gameStates.gamePlayerBotEasy:
                // INICIO DO LOOP JOGADOR BOT EASY

                break;

            case gameStates.gamePlayerBotHard:
                // INICIO DO LOOP JOGADOR BOT HARD


                break;

            case gameStates.gamePlayerBotBot:
                // INICIO DO LOOP JOGADOR BOT BOT

                break;

            case gameStates.gameOver:
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