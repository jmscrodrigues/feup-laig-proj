class MyPiecesAnimations {
    constructor(currentLocation, finalLocation, elevation) {
        this.Xdelta = finalLocation[0] - currentLocation[0];
        this.Ydelta = finalLocation[2] - currentLocation[2];

        this.ZdeltaInitial = currentLocation[1] + elevation;
        this.ZdeltaFinal = finalLocation[1] - elevation;

        this.finalLocation = finalLocation;

        this.time = -1;
        this.finalTime = -1;

        this.Tdelta = 0;
        this.TdeltaTotal = 0;
        this.fase = 0;
    
        this.timeAnimation = 1.5;

        this.froze = false;
        this.ready = false;
    }

    update(t) {
        if(!this.froze) {
            let time = t/1000;
            if (this.time == -1) {
                this.time = time;
                this.finalTime = this.time + (this.timeAnimation*3);
            }
            else if (this.time > this.finalTime) { 
                this.Tdelta = 0;
                this.TdeltaTotal = 1;
                this.fase = 3;
                this.froze = true;
                this.ready = true;
            }
            else if (this.TdeltaTotal >= 1) {
                this.Tdelta = 0;
                this.TdeltaTotal = 0;
                this.fase++;
            }
            else {
                this.Tdelta = ((time - this.time)/this.timeAnimation);
                this.TdeltaTotal = this.TdeltaTotal + this.Tdelta;

                this.time = time;
                this.ready = true;
            }
        }
    }

    display (position) {
        if(this.ready) {
            if(this.fase == 0) {
                position[1] = position[1] + this.ZdeltaInitial*this.Tdelta;
            }
            else if (this.fase == 1) {
                position[0] = position[0] + this.Xdelta*this.Tdelta;
                position[2] = position[2] + this.Ydelta*this.Tdelta;
            }
            else if (this.fase == 2) {
                position[1] = position[1] + this.ZdeltaFinal*this.Tdelta;
            }
            else if (this.fase == 3) {
                position = this.finalLocation;
            }

            this.ready = false;
        }
    }
}