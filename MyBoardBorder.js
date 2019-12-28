class MyBoardBorder extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.sides = [];
        this.cornner = [];
        this.cornerTop = [];

        for(var i = 0; i != 4; i++)
        this.sides.push(new MyCylinder(this.scene,1,0.2,0.2,8,8,4));

        for(var i = 0; i != 4; i++)
        this.cornner.push(new MyCylinder(this.scene,1,0.3,0.3,0.5,4,4));

        for(var i = 0; i != 4; i++)
        this.cornerTop.push(new MyPlane(scene, 30, 30));
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-0.70,0,-0.5);
        this.sides[0].display();
        this.scene.translate(8.4,0,0);
        this.sides[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0.70,0,-0.5);
        this.sides[2].display();
        this.scene.translate(-8.4,0,0);
        this.sides[3].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.70,-0.2,-0.7);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.cornner[0].display();
        this.scene.translate(5.95,5.95,0);
        this.cornner[1].display();
        this.scene.translate(5.95,-5.95,0);
        this.cornner[2].display();
        this.scene.translate(-5.95,-5.95,0);
        this.cornner[3].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.70,0.3,-0.7);
        this.scene.scale(0.43,0.43,0.43);
        this.cornerTop[0].display();
        this.scene.translate(19.6,0,0);
        this.cornerTop[1].display();
        this.scene.translate(0,0,19.6);
        this.cornerTop[2].display();
        this.scene.translate(-19.6,0,0);
        this.cornerTop[2].display();
        this.scene.popMatrix();
    }

}