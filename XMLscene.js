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

        //Initialize scene objects
        this.board = new MyBoard(this);
        this.tile = new MyTile(this, 3, 3);


       

    }
    


    initLights() {
        this.lights[0].setPosition(0, 70, 0, 1);
        this.lights[0].setAmbient(1.0, 0.8, 0.8, 1.0);
        this.lights[0].setDiffuse(1.0, 0.8, 0.8, 1.0);
        this.lights[0].setSpecular(1.0, 0.8, 0.8, 1.0);
        this.lights[1].setConstantAttenuation(0.05);
        this.lights[0].disable();
        this.lights[0].setVisible(false);
        this.lights[0].update();

        this.lights[1].setPosition(0,70,0,1);
        this.lights[1].setAmbient(0.1, 0.1, 0.1, 1.0);
        this.lights[1].setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.lights[1].setSpecular(0.1, 0.1, 0.1, 1.0);
        this.lights[1].setConstantAttenuation(0.6);
        this.lights[1].disable();
        this.lights[1].setVisible(false);
        this.lights[1].update();

        this.lights[2].setPosition(0,0.4,-1,1);
        this.lights[2].setAmbient(0.8, 0.4, 0.4, 1.0);
        this.lights[2].setDiffuse(0.8, 0.4, 0.4, 1.0);
        this.lights[2].setSpecular(0.8, 0.4, 0.4, 1.0);
        this.lights[2].setQuadraticAttenuation(0.6);
        this.lights[2].disable();
        this.lights[2].setVisible(false);
        this.lights[2].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
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
        this.lights[1].update();
        this.lights[2].update();
        // ---- BEGIN Primitive drawing section

        this.board.display();
        // ---- END Primitive drawing section
    }
}