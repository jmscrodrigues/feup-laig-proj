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

        this.tiles = [];
        this.colouredPieces = [];


        this.piecesBoard = [];
        this.pieces = [];
        this.validMoves = [];
        this.listP1 = [];
        this.listP2 = [];
        this.counter = 0;


        //Initialize scene objects
        this.gameOrchestrator = new MyGameOrchestrator(this);

        this.gameOrchestrator.initiateGame();

        this.gameOrchestrator.easyBotPlay();


        this.setPickEnabled(true);

    

    }
    


    initLights() {
        this.lights[0].setPosition(0, 70, 0, 1);
        this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setConstantAttenuation(0.05);
        this.lights[0].disable();
        this.lights[0].setVisible(true);
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
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
						console.log("Picked object: " + obj + ", with pick id " + customId);						
					}
				}
				this.pickResults.splice(0, this.pickResults.length);
			}
		}
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

        



        for (var s = 0; s < this.piecesBoard.length; s++) {

            this.piecesBoard[s].display();
        }

        


        this.gameOrchestrator.display();
        // ---- END Primitive drawing section
    }
}