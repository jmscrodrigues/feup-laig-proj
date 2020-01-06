class MyAnnouncementsPanel {
    constructor (scene) {
        this.scene = scene;

        this.post = new MyButton (this.scene, 'images/metal.jpg');
        this.post.chanegeTextureSides(new CGFtexture(this.scene, "images/metal.jpg"));

        this.panelFront = new MyButton (this.scene, 'images/wool.jpg');
        this.panelBack = new MyButton (this.scene, 'images/wool.jpg');

        this.panelFront.chanegeTextureSides(new CGFtexture(this.scene, "images/wool.jpg"));
        this.panelBack.chanegeTextureSides(new CGFtexture(this.scene, "images/wool.jpg"));

        this.annoucementFront = new MyButton (this.scene, 'images/rock.jpg');
        this.annoucementBack = new MyButton (this.scene, 'images/rock.jpg');

        this.undo = new MyButton (this.scene, 'images/undo.png');
    }

    changeAnnoucement (annoucement) {
        this.annoucement = new CGFtexture(this.scene, ("images/" + annoucement + ".png"));

        this.annoucementFront.reTexture(this.annoucement);
        this.annoucementBack.reTexture(this.annoucement);
    }

    display () {

        this.scene.pushMatrix();

        this.scene.scale(0.5,6.5,0.5);

        this.post.display();
    
        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(0,5,0);

        this.scene.scale(4,2,0.3);

        this.scene.rotate(Math.PI/2, 1, 0, 0);


        this.panelFront.display();

        this.scene.rotate(Math.PI, 0, 1, 0);

        this.scene.rotate(Math.PI, 0, 0, 1);

        this.panelBack.display();

        this.scene.scale(0.9,1.1,0.9);

        this.annoucementBack.display();

        this.scene.rotate(Math.PI, 0, 0, 1);

        this.annoucementFront.display();

        this.scene.popMatrix();


        this.scene.pushMatrix();

        this.scene.translate(0,3,0); 

        this.scene.scale(2.5,1.5,0.3);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.panelFront.display();

        this.scene.rotate(Math.PI, 0, 1, 0);

        this.scene.rotate(Math.PI, 0, 0, 1);

        this.panelBack.display();

        this.scene.scale(0.9,1.1,0.9);

        this.scene.registerForPick(500, this);
        this.undo.display();
        this.scene.clearPickRegistration();   


        this.scene.rotate(Math.PI, 0, 0, 1);

        this.scene.registerForPick(500, this);
        this.undo.display();
        this.scene.clearPickRegistration(); 

        this.scene.popMatrix();

    }


}
