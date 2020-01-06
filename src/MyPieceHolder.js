class MyPieceHolder{
    constructor(scene) {
        this.scene = scene;
        
        this.claw1 = new MyTriangularPyramid(this.scene);
        this.claw2 = new MyTriangularPyramid(this.scene);
        this.claw3 = new MyTriangularPyramid(this.scene);
        this.claw4 = new MyTriangularPyramid(this.scene);
        this.claw5 = new MyTriangularPyramid(this.scene);
        this.claw6 = new MyTriangularPyramid(this.scene);

    }

    display() {
        this.scene.pushMatrix();
        
        this.claw1.display();

        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.claw2.display();
    
        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.claw3.display();

        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.claw4.display();

        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.claw5.display();
    
        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.claw6.display();

        this.scene.popMatrix();
    }
}