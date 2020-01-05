const gameStates = Object.freeze({
    menu : "Menu",
    loadGame : "LoadGame",
    loadScene : "LoadScene",
    gamePlayerPlayer : "GamePlayerPlayer",
    gamePlayerBotEasy : "GamePlayerBotEasy",
    gamePlayerBotHard : "GamePlayerBotHard",
    playerPlay : "PlayerPlay",
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

        this.pieceTexture = new CGFtexture(this.scene,  "images/piece.jpg");

        this.pieceRmaterial = new CGFappearance(this.scene);
        this.pieceRmaterial.setAmbient(1, 0, 0, 1.0);
        this.pieceRmaterial.setDiffuse(1, 0, 0, 1.0);
        this.pieceRmaterial.setSpecular(1, 0, 0, 1.0);
        this.pieceRmaterial.setShininess(10.0);
        this.pieceRmaterial.setTexture(this.pieceTexture);
        this.pieceRmaterial.setTextureWrap('REPEAT','REPEAT');

        this.pieceBmaterial = new CGFappearance(this.scene);
        this.pieceBmaterial.setAmbient(0, 0, 1, 1.0);
        this.pieceBmaterial.setDiffuse(0, 0, 1, 1.0);
        this.pieceBmaterial.setSpecular(0, 0, 1, 1.0);
        this.pieceBmaterial.setShininess(10.0);
        this.pieceBmaterial.setTexture(this.pieceTexture);
        this.pieceBmaterial.setTextureWrap('REPEAT','REPEAT');

        this.pieceYmaterial = new CGFappearance(this.scene);
        this.pieceYmaterial.setAmbient(1, 1, 0, 1.0);
        this.pieceYmaterial.setDiffuse(1, 1, 0, 1.0);
        this.pieceYmaterial.setSpecular(1, 1, 0, 1.0);
        this.pieceYmaterial.setShininess(10.0);
        this.pieceYmaterial.setTexture(this.pieceTexture);
        this.pieceYmaterial.setTextureWrap('REPEAT','REPEAT');

    }

    
    /* Function to set the actual gameState */

    setGameState(gameState) {
        this.gameState = gameState;
        this.orchestrate();
    }

    getGameState() {
        return this.gameState;
    }

    /* Prolog connection to get the initial board */

    getBoardProl() {
        let rep = function(data) {
            this.scene.pieces = data;

        };

        let requestString = 'board';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));

    }


    /* Prolog connection to get the valid moves from the current board */

    getValidMoves(board) {
        let rep = function(data) {
            this.scene.validMoves = data;
        
        };

        let requestString = 'valid_moves([' + '[' +board[0] + ']'+ ',' + '[' +board[1] + ']' + ','+ '[' +board[2] + ']' + ',' + '[' +board[3] + ']' + ',' + '[' +board[4] + ']'
        + ',' + '[' +board[5] + ']' + ',' + '[' +board[6] + ']' + ',' + '[' + board[7] + ']' + '])';


        return this.prolog.getPrologRequest(requestString, rep.bind(this));



    }


    /* Prolog connection to move a piece from the board */


    movePiece(xCoord, zCoord, board) {
        let rep = function(data) {

            
            this.scene.pieces = data[0];


            //FAZER ALGO COM A PEÇA, data[1]
            if(this.scene.playerListPicker == 0) {
                this.scene.listP1.push(data[1]);
                if(this.scene.gameMode == "pvp") {
                    this.scene.playerListPicker = 1;
                }
                console.log(this.scene.listP1);
            }
            else {
                this.scene.listP2.push(data[1]);
                this.scene.playerListPicker = 0;
                console.log(this.scene.listP2);

            }

            this.gameSequence.addMove(new MyMove(xCoord, zCoord, data[1]));

            //TODO: ANIMAÇÃO DO MOVE
        };

        let requestString = 'move(' + xCoord + ',' + zCoord  + ',' + '[' + '[' + board[0] + ']' + ',' + '[' + board[1] + ']' + ',' + 
         '[' + board[2] + ']' + ',' + '[' + board[3] + ']' + ',' + '[' + board[4] + ']' + ',' + '[' + board[5] + ']' + ',' + '[' + board[6] + ']' + ',' + 
         '[' + board[7] + ']' +'])';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));
    }



    /* Prolog connection to get a play from the easy difficulty bot */


    askPlayAIEasy(board, aiList, validMoves,number) {
        let rep = function(data) {

            this.scene.pieces = data[0];

            if (number == 1) {
                this.scene.listP1 = data[1];
            }
            else if(number == 2) {
                this.scene.listP2 = data[1];
            }

            console.log("MOVE: " + [data[2], data[3]]);
            //X = data[2];

            //Y = data[3];


            this.gameSequence.addMove(new MyMove(data[2], data[3], data[4])); //ADICIONA A SEQUENCIA DO JOGO


            //TODO: ANIMAÇÃO DO MOVE

            //REMOVER O APONTADOR PARA O TILE DA PEÇA
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


    /* Prolog connection to get a play from the hard difficulty bot */

    askPlayAIHard(board, aiList, validMoves) {
        let rep = function(data) {

            this.scene.pieces = data[0];

            this.scene.listP2 = data[1];

            console.log("MOVE: " + [data[2], data[3]]);


            //Peca = data[4]

            this.gameSequence.addMove(new MyMove(data[2], data[3], data[4])); //ADICIONA A SEQUENCIA DO JOGO


            //TODO: ANIMAÇÃO DO MOVE


            //REMOVER O APONTADOR PARA O TILE DA PEÇA

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


    /* Function to get all the pieces in the board */

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
                    var newPiece = new MyPiece(this.scene,t,z,index,this.pieceRmaterial); //RED TEXT
                    newPiece.setTile = associationTile;
                    this.scene.piecesBoard.push(newPiece);

                }
                else if (board[t][z] == "a") {
                    var newPiece = new MyPiece(this.scene,t,z,index,this.pieceYmaterial); //YELLOW TEXT
                    newPiece.setTile = associationTile;
                    this.scene.piecesBoard.push(newPiece);
                    
                }

                else if (board[t][z] == "b"){
                    var newPiece = new MyPiece(this.scene,t,z,index,this.pieceBmaterial); //BLUE TEXT
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




    /* Function to get the initial board */


    initiateGame() {
        this.getBoardProl();

        setTimeout( () => this.getValidMoves(this.scene.pieces), 2500);

        setTimeout( () => this.parseBoard(this.scene.pieces), 3000);

    }



    /* Function to get a play from bot in easy difficulty */

    async easyBotPlay(list,number) {
        setTimeout( () => this.getValidMoves(this.scene.pieces),2000);

        if (this.scene.validMoves.length == 0) {
            return;
        }

        setTimeout( () => this.askPlayAIEasy(this.scene.pieces,list,this.scene.validMoves, number),5000);

        setTimeout( () => console.log(list), 7000);
    }


    /* Function to get a play from bot in hard difficulty */

    hardBotPlay(list) {
        setTimeout( () => this.getValidMoves(this.scene.pieces),2000);

        setTimeout( () => this.askPlayAIHard(this.scene.pieces,list,this.scene.validMoves),5000);

        setTimeout(() => console.log(list), 7000);
    }


    /* Function to undo move*/
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


    /*Function to show the gameSequence */

    gameSequence() {
        var sequenceVector = this.gameSequence.getSequence();
        for(var m = 0; m < sequenceVector.length; m++) {
            //DISPLAY DA ANIMAÇÃO INVERSA DO MOVE DE sequenceVector[m];
            console.log("1");
        }
    }


    /*Function to parse controlPanel inputs*/

    parseGameInputs(id) {
        if (id == 100) {
            this.scene.gameDifficulty = "medium";
        }

        else if(id == 101) {
            this.scene.gameDifficulty = "hard";
        }

        else if(id == 102) {
            this.scene.gameMode = "pvp";

        }

        else if(id == 103) {
            this.scene.gameMode = "pvm";

        }

        else if(id == 104) {
            this.scene.gameMode = "mvm";

        }
    }



    /*Function to parse the definitions to start the game*/

    startGame() {

        if (this.scene.gameMode == "pvm") {
            if (this.scene.gameDifficulty == "medium") {
                this.gameState = gameStates.gamePlayerBotEasy;
            }
            else if (this.scene.gameDifficulty == "hard") {
                this.gameState = gameStates.gamePlayerBotHard;
            }
        }

        else if(this.scene.gameMode == "pvp") {
            this.gameState = gameStates.gamePlayerPlayer;
        }

        else if(this.scene.gameMode == "mvm") {
            this.gameState = gameStates.gamePlayerBotBot;
        }

        this.orchestrate();
    }


    countPoints(list) {
        var a = 0;
        var b = 0;
        var r = 0;

        for (var t = 0; t < list.length; t++) {
            if (list[t] == "a") {
                a++;
            }
            else if(list[t] == "b") {
                b++;
            }
            else if(list[t] == "r") {
                r++;
            } 
        }

        return (Math.floor(a/5) + Math.floor(b/5) + Math.floor(r/5));
    }

    gameOver(){
        if (this.scene.validMoves.length == 0) {
            this.setgameState = gameStates.gameOver;
            this.orchestrate;
            return 1;
        }
        else {
            return 0;
        }
    
    }


    async botvsBotGameLoop() {
        var cancel = 0;

        this.getValidMoves(this.scene.pieces);

        setTimeout( ()=> cancel = this.gameOver(),3000);

        if (cancel == 1) {
            return;
        }


        setTimeout(() => this.easyBotPlay(this.scene.listP1, 1),4000); 


        setTimeout(() => this.getValidMoves(this.scene.pieces),11000); 


        setTimeout( () => cancel = this.gameOver(),13000);

        if (cancel == 1) {
            return;
        }



        setTimeout(() => this.easyBotPlay(this.scene.listP2, 2),16000);


        setTimeout(() => this.orchestrate(),23000);

    }

    async botPlay() {
        var cancel = 0;


        if(this.scene.gameDifficulty == "medium") {

        
            this.getValidMoves(this.scene.pieces);

            setTimeout( ()=> cancel = this.gameOver(),2000);

            if (cancel == 1) {
                return;
            }

            setTimeout(() => this.easyBotPlay(this.scene.listP2, 2),3000); 


            setTimeout(() => this.setGameState(gameStates.playerPlay),8000);


        }

        else {

            this.getValidMoves(this.scene.pieces);

            setTimeout( ()=> cancel = this.gameOver(),5000);

            if (cancel == 1) {
                return;
            }

            setTimeout(() => this.hardBotPlay(this.scene.listP2),6000); 


            setTimeout(() => this.setGameState(gameStates.playerPlay),10000);

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
                break;

            case gameStates.gamePlayerPlayer:
                this.setGameState(gameStates.playerPlay);
                break;

            case gameStates.playerPlay:
                console.log("Player Play");

                break;

            case gameStates.botPlay:
                console.log("Bot play");

                this.botPlay();

                break;

            case gameStates.gamePlayerBotEasy:
                console.log("EASY PB");

                this.setGameState(gameStates.playerPlay);

                break;

            case gameStates.gamePlayerBotHard:
                console.log("HARD PB");

                this.setGameState(gameStates.playerPlay);

                break;

            case gameStates.gamePlayerBotBot:
                this.botvsBotGameLoop();
                console.log("BB");

                break;

            case gameStates.gameOver:
                var pointsP1 = this.countPoints(this.scene.listP1);
                var pointsP2 = this.countPoints(this.scene.listP2);
                if (pointsP1 > pointsP2) {
                    console.log("Player 1 WINS!");
                }
                else if (pointsP2 > pointsP1) {
                    console.log("Player 2 WINS!");
                }
                else {
                    console.log("It's a TIE!");
                }
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