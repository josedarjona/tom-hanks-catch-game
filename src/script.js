window.onload = function() {
  var currentGame;
  var canStart = true;
  var obstacles = [];
  // var speedCoco = 0;
  var gameOver = false;
  var addLife = [];
  
  
  // var tomImage = new Image();
  // var imageSource = "./images/tom_hanks.png";
  // tomImage.src = imageSource;



  var Tom = function() {
    this.x = 233;
    this.y = 500;
    this.width = 75;
    this.height = 100;
    this.img = "./images/tom_hanks.png";



  };

 var TomRight = function (){
    this.x= currentGame.tom.x;
    this.y=currentGame.tom.x;
    this.width = 75;
    this.height = 100;
    this.img = "./images/tom_hanks_right.png"
  }

  // Tom.prototype.drawTom = function() {
  //   console.log("s: ", tomImage);
  //   var that = this;
  //   tomImage.src = that.img;

  // tomImage.onload = function(){
  //   console.log("heyy");
  //   ctx.drawImage(tomImage, that.x, that.y, that.width, that.height);
  // }
  
  // tomImage.src = imageSource;

    
  // };

  var tomImage = new Image();
  var tomImageRight = new Image();


  Tom.prototype.drawTom = function() {
    var that = this;


    ctx.drawImage(tomImage, that.x, that.y, that.width, that.height);
  

    tomImage.src = "./images/tom_hanks.png";
  };

  // Tom.prototype.drawTomRight = function() {
  //   var that = this;


  //   ctx.drawImage(tomImageRight, that.x, that.y, that.width, that.height);
  

  //   tomImage.src = "./images/tom_hanks.png";
  // };

  function interval() {
    
    setInterval(updateCanvas, 30);
  }
  
  // Tom.prototype.drawTom = function() {
  //   console.log("s: ", tomImage);
  //   var that = this;
  //   // tomImage.src = that.img;

  // tomImage.onload = function(){
  //   console.log("heyy");
  //   ctx.drawImage(tomImage, that.x, that.y, that.width, that.height);
  // }
  

  //   tomImage.src = imageSource;
  // };

  Tom.prototype.move = function(keyNumber) {
  // imageSource = "./images/tom_hanks.png";
    switch (keyNumber) {
      case 37:
      // currentGame.tom.drawTom();
        this.x -= 45;
        if (this.x < 0) {
          this.x = 0;
        }
        break;
      case 39:
      // currentGame.tomRight.drawTomRight();
      // imageSource = "./images/tom_hanks_right.png";
        this.x += 45;
        if (this.x >= 755) {
          this.x = myCanvas.width - this.width;
        }
        break;
      default:
        // imageSource = "./images/tom_hanks.png";
        console.log("oops");
    }
    currentGame.tom.drawTom();

    
  };

  var myCanvas = document.getElementById("theCanvas");
  var ctx = myCanvas.getContext("2d");

  document.getElementById("start-button").onclick = function() {
    interval();
    startGame();
    var ticker = true;
    var countdown = function() {
      if (board.timer > 0 ) { // so it doesn't go to -1
         board.timer--;
      } 
    }
    if(ticker = true && board.lives > 0) {
      var tickerd = window.setInterval(function() { 
        countdown();
      }, 1000);
    
    }else {
      clearInterval(tickerd);

   }

   var d = document.getElementById("start-button");
    d.className += "blocked";
  };

  document.getElementById('play-again').addEventListener('click', function() {
    document.getElementById('game-result').style.display = 'none';
    document.getElementById('game-result-overlay').style.display = 'none';
    board.lives = 5;
    board.timer = 20;
    currentGame;
    canStart = true;
    obstacles = [];
    obstaclesExist = true;



  });
  

  function startGame() {

    if (canStart) {
      currentGame = new Game();
      var theTomImage = new Tom();
      currentGame.tom = theTomImage;
      currentGame.tom.drawTom();


      canStart = false;
    }
  }


  function checkCollision(obstacle){
    if((obstacle.y + (obstacle.height - 50) >= currentGame.tom.y && obstacle.y <= currentGame.tom.y + currentGame.tom.height)
    &&(obstacle.x + obstacle.width>= currentGame.tom.x &&obstacle.x <= currentGame.tom.x+currentGame.tom.width)){
      console.log("nom");
      if (board.catch <= 4) {
        board.catch += 1;
        // var cocoLife = ctx.fillText("Plus 1 Life!", 375, 70);

      } 
      if(board.catch >= 5){

        board.lives +=1;
        var cocoLife = ctx.fillText("Plus 1 Life!", 375, 70);
        board.catch = 0;
      }

      return true;
      
    }else if(obstacle.y >= 590){
      if (board.lives > 0 ){
        board.lives--;
      }
    } 

  }
    

  var board = {
    lives: 5,
    timer: 60,
    frames: 0,
    catch: 0,
  };



  document.onkeydown = function(event) {
    // console.log('<3');
    if (event.which === 37 || event.which === 38) {
      event.preventDefault();
    }

    var directionCode = event.which;
    // console.log(directionCode);
    currentGame.tom.move(directionCode);
  };

  function Component(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speedCocoX = 0;
    this.speedCocoY = 0;

     function incDiff() {
      if (board.timer <= 60 && board.timer> 45) {
        this.speedCocoY = 1;

      } else if (board.timer <= 44 && board.timer > 30) {
        this.speedCocoY = 5;

      } else if (board.timer <= 29 && board.timer > 15) {
        this.speedCocoY = 8;

    }else if (board.timer <= 14 && board.timer > 0) {
    this.speedCocoY = 13;

}
  
    return this.speedCocoY;
}


    this.img = "./images/coconut1.png";

    this.update = function() {


      var theImage = new Image();
      theImage.src = this.img;
      ctx.drawImage(theImage, this.x, this.y, this.width, this.height);

    }

      this.newPos = function() {
        this.x += this.speedCocoX;

        this.y += incDiff();


    }
}
  var obstaclesExist = true;

  function updateCanvas() {
    ctx.clearRect(0, 0, 830, 700);

    currentGame.tom.drawTom();

    board.frames++;
    

    var fontcolor = ctx.fillStyle="teal";
    var font =  ctx.font="30px Impact";
    var text = ctx.fillText("Lives: " + board.lives, 375, 30);
    var timeText = ctx.fillText("Timer: " + board.timer, 0, 30);
    var cocoCount = ctx.fillText("Nom Count: " + board.catch, 0, 70);

    
   
    if (board.frames % 30 === 1) {
      cocoX = Math.floor(Math.random() * 780);
      cocoWidth = 75;
      cocoHeight = 100;
      obstacles.push(new Component(cocoWidth, cocoHeight, cocoX, 0));
      // board.frames = 2;
    }
    if(obstaclesExist){
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].y += 5;
      obstacles[i].newPos();
      obstacles[i].update();

     if(checkCollision(obstacles[i])){

      obstacles.splice(i,1);

      
      
      // board.catch +=1;

     }
     else if(obstacles[i].y>= 590){
      obstacles.splice(i,1);
     }
   
    }
    if (board.timer === 0 && board.lives > 0){


      obstacles = [];
      obstaclesExist = false;
      document.getElementById('game-result').getElementsByTagName("h1")[0].innerHTML = "YOU SURVIVED!*";
      document.getElementById('game-result').style.display = 'block';
      document.getElementById('game-result-overlay').style.display = 'block';

 
      
    
    } else if(board.lives === 0 && board.timer > 0){

      ticker = false;
      obstacles = [];
      obstaclesExist = false;

      document.getElementById('game-result').getElementsByTagName("h1")[0].innerHTML = "YOU DIED!";
      document.getElementById('game-result').style.display = 'block';
      document.getElementById('game-result-overlay').style.display = 'block';

    }
  }


    
  }
};
