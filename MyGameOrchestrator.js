class MyGameOrchestrator {
    construtor(scene) {
        super(scene);
        const gameStates = {
            menu,
            loadGame,
            gameMove,
            animation,
            gameOver
        }

        this.gameState = gameStates.menu;

        this.scene = scene;

        this.board = new MyBoard(this.scene);
        //this.theme = new MySceneGraph(this.scene);  ADD MySceneGraph with the needed changes
        //this.prolog = new MyPrologInterface(); ADD MyPrologInteface
        this.animator = new MyAnimator(this.scene);
        this.gameSequence = new MyGameSequence(this.scene);

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