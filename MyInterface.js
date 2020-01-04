/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        

        // add a group of controls (and open/expand by defult)

        this.gui.add(this.scene, 'ActiveCamera', this.scene.cameras).name('ActiveCamera').onChange(this.scene.changeActiveCamera.bind(this.scene));

        

        return true;
    }
}