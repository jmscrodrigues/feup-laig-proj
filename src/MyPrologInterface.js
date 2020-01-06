class MyPrologInterface {
    constructor(scene) {
        this.scene = scene;
        this.port = 8081;

    }


    getPrologRequest(requestString, onSuccess) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);

    request.onload = function(data) {
        
        let reply;

        reply = JSON.parse(data.target.response);

        onSuccess(reply);
    }

    request.onerror = function(){console.log("Error!");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
    
    }

    exitProlog() {
        let requestString = 'quit';

    }
    
}


