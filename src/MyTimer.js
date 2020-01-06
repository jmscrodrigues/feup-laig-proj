class MyTimer {
    constructor(scene, initialTimer) {
        this.scene = scene;

        this.timer = initialTimer;
    
        this.froze = true;

        this.time = 0;
        this.scond = -1;

        this.hourGlass = new MyHourglass(this.scene);

        this.minuteDouze = new MyButton (this.scene, 'images/0.png');
        this.minuteUnit = new MyButton (this.scene, 'images/0.png');

        this.secondDouze = new MyButton (this.scene, 'images/0.png');
        this.secondUnit = new MyButton (this.scene, 'images/0.png');

        this.midle = new MyButton (this.scene, 'images/colon.png');

        this.reTextureTimer();
    }

    reSetTimer (timer) {
        this.timer = timer;
    }

    getTimer() {
        return this.timer;
    }

    update(t) {
        if (!this.froze) {
            if(this.time == 0) 
                this.time = t;
            else {
               this.timer = this.timer -((t - this.time)/ 1000);
               this.time = t;
            }

            this.reTextureTimer();
        }
    }

    reTextureTimer() {
        if (this.scond != Math.floor((this.timer % 60) % 10)) {
            this.scond = Math.floor((this.timer % 60) % 10);
            this.minuteDouze.reTexture( new CGFtexture(this.scene, ("images/" + Math.floor(((this.timer / 60) / 10) % 10) + ".png")));
            this.minuteUnit.reTexture(  new CGFtexture(this.scene, ("images/" + Math.floor((this.timer / 60) % 10) + ".png")));

            this.secondDouze.reTexture( new CGFtexture(this.scene, ("images/" + Math.floor((this.timer % 60) / 10) + ".png")));
            this.secondUnit.reTexture(  new CGFtexture(this.scene, ("images/" + Math.floor((this.timer % 60) % 10) + ".png")));
        }
    }

    frezeTimer() {
        this.froze = true;
    }

    startTimer() {
        this.froze = false;
    }

    display () {
        this.hourGlass.display();

        this.scene.pushMatrix();
        this.scene.translate(0,4,0);
        this.scene.scale(0.5,1,0.2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);       
        this.scene.scale(0.5,0.5,0.5);
        this.midle.display();
        this.scene.scale(2,1,1);
        this.scene.translate(-1,0,0);
        this.secondDouze.display();
        this.scene.translate(-1.25,0,0);
        this.secondUnit.display();
        this.scene.translate(3.25,0,0);
        this.minuteUnit.display();
        this.scene.translate(1.25,0,0);
        this.minuteDouze.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0,4,0);
        this.scene.scale(0.5,1,0.2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);       
        this.scene.scale(0.5,0.5,0.5);
        this.midle.display();
        this.scene.scale(2,1,1);
        this.scene.translate(-1,0,0);
        this.secondDouze.display();
        this.scene.translate(-1.25,0,0);
        this.secondUnit.display();
        this.scene.translate(3.25,0,0);
        this.minuteUnit.display();
        this.scene.translate(1.25,0,0);
        this.minuteDouze.display();
        this.scene.popMatrix();
    }



}