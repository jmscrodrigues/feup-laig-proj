class MyPrologInterface {
    constructor(scene) {
        this.scene = scene;
        this.port = 8081;

    }


    getPrologRequest(requestString) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);

    request.addEventListener("load", this.parsePrologReply());
    request.addEventListener("error", this.errorRequest());

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    }

    parsePrologReply() {
        if (this.status === 400) {
        console.log("ERROR");
        return;
        }

        let responseArray = textStringToArray(this.responseText,true);
        // do something with responseArray[0];

    }

    errorRequest() {
        console.log("ERROR");
    }
    
}