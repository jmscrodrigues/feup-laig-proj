class MyAnimator {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.animations = [];
    }

    newAnimation(animation) {
        this.animations.push(animation);
    }

    update(time) {
        //DO SOMETHING
    }

    display() {
        //DO SOMETHING
    }

}