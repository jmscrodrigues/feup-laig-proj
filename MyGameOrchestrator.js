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
        //this.prolog = new MyPrologInterface(); ADD MyPrologInteface
        //this.animator = new MyAnimator(this.scene);
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

    logPicking() {
		if (this.pickMode == false) {
			if (this.pickResults != null && this.pickResults.length > 0) {
				for (var i = 0; i < this.pickResults.length; i++) {
					var obj = this.pickResults[i][0];
					if (obj) {
						var customId = this.pickResults[i][1];
						console.log("Picked object: " + obj + ", with pick id " + customId);						
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
	}

    display() {

        this.board.display();
        
    }

    
        

}