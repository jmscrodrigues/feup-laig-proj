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

        let requestString = 'valid_moves(' + board + ')';

        return this.prolog.getPrologRequestArray(requestString, rep.bind(this));



    }


    movePiece(xCoord, zCoord, board) {
        let rep = function(data) {

            //peça = data.charAt(147);

            this.scene.pieces = data.substring(1,146);
        };

        let requestString = 'move(' + xCoord + ',' + zCoord + ',' + board + ')';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));
    }


    askPlayAIEasy(board, aiList, validMoves) {
        let rep = function(data) {

            console.log("data");
            console.log(data);
            console.log("..");


        };

        let requestString = 'makePlayAIEasy(' + board + ',' + aiList + ',' + validMoves + ')';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));


    }

    askPlayAIHard(board, aiList, validMoves) {
        let rep = function(data) {

            console.log("data");
            console.log(data);
            console.log("..");


        };

        let requestString = 'makePlayAIHard(' + board + ',' + aiList + ',' + validMoves + ')';

        return this.prolog.getPrologRequest(requestString, rep.bind(this));


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