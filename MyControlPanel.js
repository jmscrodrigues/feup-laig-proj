class MyControlPanel {
    constructor (scene){
        this.scene = scene;

        this.mainbody = new MyButton(this.scene, 'images/wood.jpg');

        this.difficultyTitle = new MyButton(this.scene, 'images/difficulty.png');
        this.easy = new MyButton(this.scene, 'images/easy.png');
        this.medium = new MyButton(this.scene, 'images/medium.png');
        this.hard = new MyButton(this.scene, 'images/hard.png');

        this.modeTitle = new MyButton(this.scene, 'images/game mode.png');
        this.pvp = new MyButton(this.scene, 'images/PvP.png');
        this.pvm = new MyButton(this.scene, 'images/PvM.png');
        this.mvm = new MyButton(this.scene, 'images/MvM.png');

        this.ready =  new MyButton(this.scene, 'images/ready.png');
        this.confirm = new MyButton(this.scene, 'images/confirm.png');

        this.main = new MyButton(this.scene, 'images/rock.jpg')

        this.player1 = new MyButton(this.scene, 'images/player 1.png');
        this.player2 = new MyButton(this.scene, 'images/player 2.png');


        this.score = new MyButton(this.scene, 'images/score board.png')

        this.player1Score = 0;
        this.player2Score = 0;

        this.player1ScoreUnit = new MyButton(this.scene, 'images/0.png');

        this.player2ScoreUnit = new MyButton(this.scene, 'images/0.png');

    }

    setScore(player1Score, player2Score) {
        this.player1Score = player1Score;
        this.player2Score = player2Score;

        this.player1ScoreUnit.reTexture('images/' + this.player1Score + '.png');

        this.player2ScoreUnit.reTexture('images/' + this.player2Score + '.png');
    }

    addScore1(score) {
        this.player1Score = this.player1Score + score;

        console.log(this.player1Score);

        this.player1ScoreUnit.reTexture( new CGFtexture(this.scene, ("images/" + this.player1Score + ".png")));
    }

    addScore2(score) {
        this.player2Score = this.player2Score + score;

        this.player2ScoreUnit.reTexture( new CGFtexture(this.scene, ("images/" + this.player2Score + ".png")));
    }

    display() {
        
        
        this.scene.pushMatrix();
        this.scene.scale(3,0.20,6);
        this.main.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2,0,0);
        this.scene.scale(1,0.20,2);
        this.main.display();
        this.scene.popMatrix();

        //upper panel

        this.scene.pushMatrix();

        this.scene.translate(0,0,3);  

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.6);       
        this.scene.scale(3,0.30,1);
        this.difficultyTitle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5,0,-0.60); 
        this.scene.scale(1,0.30,1); 
        this.scene.registerForPick(100, this);
        this.easy.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.6);       
        this.scene.scale(1.5,0.30,1);
        this.scene.registerForPick(100, this);
        this.medium.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,-0.60); 
        this.scene.scale(1,0.30,1); 
        this.scene.registerForPick(101, this);   
        this.hard.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

       

        this.scene.pushMatrix();
        this.scene.scale(4.25,0.25,2.5);        
        this.mainbody.display();
        this.scene.popMatrix();
 
        this.scene.popMatrix();

        //midle panel
        
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.6);       
        this.scene.scale(2.5,0.30,1);
        this.modeTitle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.2,0,-0.60); 
        this.scene.scale(1,0.30,1);  
        this.scene.registerForPick(102, this);  
        this.pvp.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.6);       
        this.scene.scale(1,0.3,1);
        this.scene.registerForPick(103, this);  
        this.pvm.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.2,0,-0.60); 
        this.scene.scale(1,0.30,1); 
        this.scene.registerForPick(104, this);     
        this.mvm.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(4.25,0.25,2.5);        
        this.mainbody.display();
        this.scene.popMatrix();


        //lower panel

        this.scene.pushMatrix();
        this.scene.translate(0,0,-3.75);  

        this.scene.pushMatrix();
        this.scene.scale(4.25,0.25,4);        
        this.mainbody.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0,0,1.25);       
        this.scene.scale(3,0.30,1);
        this.score.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0,-1.2); 
        this.scene.scale(1.5,0.30,1);    
        this.player1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0,0); 
        this.scene.scale(1.5,0.30,1);    
        this.player2.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.translate(-1.2,0,0); 
        this.scene.scale(1,0.30,1);    
        this.player2ScoreUnit.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.2,0,-1.2); 
        this.scene.scale(1,0.30,1);    
        this.player1ScoreUnit.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        //ready panel

        this.scene.pushMatrix();

        this.scene.translate(-4,0,0);

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.6);       
        this.scene.scale(2.5,0.30,1);
        this.ready.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.6);       
        this.scene.scale(1,0.3,1);
        this.scene.registerForPick(200, this);  
        this.confirm.display();
        this.scene.clearPickRegistration();   
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(3,0.25,2.5);        
        this.mainbody.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }


}
