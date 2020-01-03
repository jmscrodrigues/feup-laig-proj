class MyCameraAnimation {
    constructor(currentCameraPosition, newCameraPosition, timeAnimation, currentCameraTarget, newCameraTarget) {        
        this.Xdelta = newCameraPosition[0] - currentCameraPosition[0];
        this.Ydelta = newCameraPosition[1] - currentCameraPosition[1];
        this.Zdelta = newCameraPosition[2] - currentCameraPosition[2];

        this.currentCameraTarget = currentCameraTarget;
        this.deltaTarget = vec3.fromValues(newCameraTarget[0] - currentCameraTarget[0], 
                                            newCameraTarget[1] - currentCameraTarget[1], 
                                            newCameraTarget[2] - currentCameraTarget[2]);

        this.time = -1;
        this.finalTime = -1;
        this.Tdelta = 0;
        this.TdeltaTotal = 0;
    
        this.timeAnimation = timeAnimation;

        this.froze = false;
        this.ready = false;
    }

    update(t) {
        if(!this.froze) {
            let time = t/1000;
            if (this.time == -1) {
                this.time = time;
                this.finalTime = this.time + this.timeAnimation;
            }
            else if (this.time > this.finalTime) { 
                this.Tdelta = 0;
                this.TdeltaTotal = 1;
                this.froze = true;
                this.ready = true;
            }
            else {
                this.Tdelta = ((time - this.time)/this.timeAnimation);
                this.TdeltaTotal = this.TdeltaTotal + this.Tdelta;
                this.time = time;
                this.ready = true;
            }
        }
    }

    display (camera) {
        if(this.ready) {
        
        var vecTranslate = vec3.fromValues(this.Tdelta*this.Xdelta,this.Tdelta*this.Ydelta,this.Tdelta*this.Zdelta);
        
        var vecTarget = vec3.fromValues(this.currentCameraTarget[0] + this.deltaTarget[0]*this.TdeltaTotal,
                                        this.currentCameraTarget[1] + this.deltaTarget[1]*this.TdeltaTotal, 
                                        this.currentCameraTarget[2] + this.deltaTarget[2]*this.TdeltaTotal);

        camera.setTarget(vecTarget);

        camera.translate(vecTranslate);

        this.ready = false;
        }
    }

    reSetCameta(currentCameraPosition, newCameraPosition, timeAnimation) {
        this.Xdelta = newCameraPosition[0] - currentCameraPosition[0];
        this.Ydelta = newCameraPosition[1] - currentCameraPosition[1];
        this.Zdelta = newCameraPosition[2] - currentCameraPosition[2];

        this.time = -1;
        this.finalTime = -1;
        this.Tdelta = 0;
    
        this.timeAnimation = timeAnimation;

        this.froze = false;
    }
}