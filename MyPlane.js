/**
 * MyPlane
 * @constructor
 * @param npartsU - Number of parts U
 * @param npartsV  - Number of parts V
 */

class MyPlane extends CGFobject {
    constructor(scene, npartsU, npartsV) {
        super(scene);

        this.npartsU = npartsU;
        this.npartsV = npartsV;

        var nurbsSurface = new CGFnurbsSurface(1, 1, [
            [
                [0.5, 0.0, -0.5, 1],
                [0.5, 0.0, 0.5, 1]

            ],
            [
                [-0.5, 0.0, -0.5, 1],
                [-0.5, 0.0, 0.5, 1]
            ]
        ]);

        this.plane = new CGFnurbsObject(scene, this.npartsU, this.npartsV, nurbsSurface);
    }

    display() {
        this.plane.display();
    }

    createTexCoords() {};
}