/**
* XMLScene
* @constructor
*/

class XMLscene extends CGFscene {
    constructor() {
        super();

    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        this.tiles = [];
        this.colouredPieces = [];


        this.piecesBoard = [];
        this.pieces = [];
        this.validMoves = [];
        this.listP1 = [];
        this.listP2 = [];
        this.counter = 0;

        this.lastPicked = null;
        this.gameDifficulty = "normal";


        //Initialize scene objects
        this.scene1 = new MyScene1(this);

        this.currentScene = this.scene1;

        this.timer = new MyTimer(this, 5*60);
        this.controlPanel =  new MyControlPanel(this);
        this.announcementsPanel = new MyAnnouncementsPanel(this);

        this.ActiveCamera = 0;
        this.cameras = {'Settings': 0, 'Player1': 1, 'Player2': 2};
        this.cameraAnimation = new MyCameraAnimation(this.from, this.from, 0.0001, this.target, this.target);

        this.gameOrchestrator = new MyGameOrchestrator(this);


        this.gameOrchestrator.orchestrate();


        setTimeout( () => this.gameOrchestrator.setGameState(gameStates.gamePlayerPlayer),3000);


        this.setPickEnabled(true);
    }
    
    initLights() {
        this.lights[0].setPosition(0, 1, 1, 1);
        this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setConstantAttenuation(0.05);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.from = vec3.fromValues(5, 2, 0);
        this.target = vec3.fromValues(0, 0, 0)
        this.camera = new CGFcamera(0.4, 0.1, 500, this.from, this.target);
    }

    setDefaultAppearance() {
        this.setAmbient(1, 1, 1, 1.0);
        this.setDiffuse(1, 1, 1, 1.0);
        this.setSpecular(1, 1, 1, 1.0);
        this.setShininess(10.0);
    }

    logPicking() {
		if (this.pickMode == false) {
			if (this.pickResults != null && this.pickResults.length > 0) {
				for (var i = 0; i < this.pickResults.length; i++) {
					var obj = this.pickResults[i][0];
					if (obj) {
						var customId = this.pickResults[i][1];
                        console.log("Picked object: " + obj + ", with pick id " + customId + "with coords" + this.pickResults[i][0].getCoordX() + "," + this.pickResults[i][0].getCoordZ());	
                        if(this.lastPicked != customId) {
                            this.lastPicked = customId;
                        }
                        else if (this.lastPicked == customId && (customId > 0) && (customId < 65)){
                            this.gameOrchestrator.movePiece(this.pickResults[i][0].getCoordX(), this.pickResults[i][0].getCoordZ(),this.pieces);
                            this.lastPicked = null;
                        }					
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
    }

    changeActiveCamera() {
        this.cameraAnimation.reSetCameta(this.from, this.currentScene.cameraCoords()[this.ActiveCamera], 5, this.target, this.currentScene.cameraViewPoints()[this.ActiveCamera]);
        this.from = this.currentScene.cameraCoords()[this.ActiveCamera];
        this.target = this.currentScene.cameraViewPoints()[this.ActiveCamera];
    }

    update(t) {
        this.scene1.update(t);
        this.timer.update(t);
        this.cameraAnimation.update(t);
    }

    display() {

        this.logPicking();
        this.clearPickRegistration();

        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();


        //Apply default appearance
        this.setDefaultAppearance();

        this.lights[0].update();
        // ---- BEGIN Primitive drawing section

        
        this.cameraAnimation.display(this.camera);


        for (var s = 0; s < this.piecesBoard.length; s++) {
            this.pushMatrix();
            //this.currentScene.piecesPosition();
            this.piecesBoard[s].display();
            this.popMatrix();

        }

        this.currentScene.display();

        this.pushMatrix();
        this.currentScene.timerPosition();
        this.timer.display();
        this.popMatrix();

        this.pushMatrix();
        this.currentScene.controlPanelPosition();
        this.controlPanel.display();
        this.popMatrix();

        this.pushMatrix();
        this.currentScene.announcementsPanelPosition();
        this.announcementsPanel.display();
        this.popMatrix();

        this.pushMatrix();
        this.currentScene.boardPosition();
        this.gameOrchestrator.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}
