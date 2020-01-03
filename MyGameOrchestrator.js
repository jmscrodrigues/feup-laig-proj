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

    setBoardPieces() {
        this.result = this.prolog.getBoard;
        if (this.result == -1) {
            console.log("error");
            return -1;
        }
        else {
            this.scene.pieces = this.result;
            return 0;
        }
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