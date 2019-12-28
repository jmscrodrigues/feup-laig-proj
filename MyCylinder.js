/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param base_radius  - Cylinder base radius
 * @param top_radius  - Cylinder top radius
 * @param height - Cylinder height
 * @param slices - Number of sides in z axis
 * @param stacks - Number of divisons along the z axis 
 */

class MyCylinder extends CGFobject {
    constructor(scene,id, base_radius, top_radius, height, slices, stacks) {
        super(scene);
            this.id = id;
            this.scene = scene;

            if (height <= 0) height = 0.00001;
            if (slices < 2) slices = 3;

            this.base_radius = base_radius;
            this.top_radius = top_radius;
            this.height = height;
            this.slices = slices;
            this.stacks = stacks;

            this.degreeU = 3;
            this.degreeV = 1;

            this.halfCylinder;

            this.getControlPoints();
            this.makeSurface(scene);
            
    }

    getControlPoints() {

        var xBase = this.base_radius;
        var xTop = this.top_radius;

        this.controlPoints = [];

        this.controlPoints.push([xBase,0,0,1.0]);
        this.controlPoints.push([xTop,0,this.height,1.0]);
        this.controlPoints.push([xBase,(4/3) * xBase,0,1.0]);
        this.controlPoints.push([xTop,(4/3) * xTop,this.height,1.0]);

        this.controlPoints.push([-xBase,(4/3) * xBase,0,1.0]);
        this.controlPoints.push([-xTop,(4/3) * xTop,this.height,1.0]);
        this.controlPoints.push([-xBase,0,0,1.0]);
        this.controlPoints.push([-xTop,0,this.height,1.0]);

        this.finalControlPoints = [];

        for (var i= 0; i <= this.degreeU; i++) {
            var degreePoints = [];
            for (var j = 0; j <= this.degreeV; j++)
                degreePoints.push(this.controlPoints.shift());

            this.finalControlPoints.push(degreePoints);
        }

    }

    makeSurface(scene) {
        var nurbsSurface = new CGFnurbsSurface(this.degreeU,this.degreeV, this.finalControlPoints);


        this.halfCylinder = new CGFnurbsObject(scene, this.slices, this.stacks, nurbsSurface);
    }

    display() {
        this.halfCylinder.display();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 1,0,0);
        this.scene.translate(0,0,-this.height);
        this.halfCylinder.display();
        this.scene.popMatrix();
    }

    createTexCoords() {};

};