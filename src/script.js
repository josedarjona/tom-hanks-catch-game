window.onload = function() {
  var currentGame;
  var canStart = true;
  var obstacles = [];
  // var speedCoco = 0;
  var gameOver = false;
  var addLife = [];


  //toms starting point
  var Tom = function() {
    this.x = 233;
    this.y = 500;
    this.width = 75;
    this.height = 100;
    this.img = "./images/tom_hanks.png";
  };

  //tries using a tom looking the other way
  var TomRight = function() {
    this.x = currentGame.tom.x;
    this.y = currentGame.tom.x;
    this.width = 75;
    this.height = 100;
    this.img = "./images/tom_hanks_right.png";
  };
//this will draw tom on the page
  var tomImage = new Image();
  var tomImageRight = new Image(); //<does nothing yet

  Tom.prototype.drawTom = function() {
    var that = this;

    ctx.drawImage(tomImage, that.x, that.y, that.width, that.height);

    tomImage.src = "./images/tom_hanks.png";
  };
//sets how often updateCanvas runs
  function interval() {
    setInterval(updateCanvas, 30);
  }


//will move tom around
  Tom.prototype.move = function(keyNumber) {
    switch (keyNumber) {
      case 37:
        this.x -= 45;
        if (this.x < 0) {
          this.x = 0;
        }
        break;
      case 39:
        this.x += 45;
        if (this.x >= 755) {
          this.x = myCanvas.width - this.width;
        }
        break;
      default:
        console.log("oops"); // tests to see if wrong key is pressed
    }
    currentGame.tom.drawTom();
  };
//sets canvas
  var myCanvas = document.getElementById("theCanvas");
  var ctx = myCanvas.getContext("2d");
//start button that starts game, and timer
  document.getElementById("start-button").onclick = function() {
    interval();
    startGame();
    var ticker = true;
    var countdown = function() {
      if (board.timer > 0) {
        // so it doesn't go to -1
        board.timer--;
      }
    };
    if ((ticker = true && board.lives > 0)) {
      var tickerd = window.setInterval(function() {
        countdown();
      }, 1000);
    } else {
      clearInterval(tickerd);
    }
    //makes it so start button cannot be used after pressing start
    var d = document.getElementById("start-button");
    d.className += "blocked";
  };
//result screen set to not display anything when game is loaded, and when you restart
    document.getElementById("play-again").addEventListener("click", function() {
    document.getElementById("game-result").style.display = "none";
    document.getElementById("game-result-overlay").style.display = "none";
    board.lives = 5;
    board.timer = 60;

    currentGame;
    canStart = true;
    obstacles = [];
    obstaclesExist = true;
  });

  //starts game  / draws images
  function startGame() {
    if (canStart) {
      currentGame = new Game();
      var theTomImage = new Tom();
      currentGame.tom = theTomImage;
      currentGame.tom.drawTom();

      canStart = false;
    }
  }


  //checks collision detection for game
  function checkCollision(obstacle) {
    if (
      obstacle.y + (obstacle.height - 50) >= currentGame.tom.y &&
      obstacle.y <= currentGame.tom.y + currentGame.tom.height &&
      (obstacle.x + obstacle.width >= currentGame.tom.x &&
        obstacle.x <= currentGame.tom.x + currentGame.tom.width)
    ) {
      console.log("nom"); // test to see if collision is occuring
      if (board.catch <= 4) {
        board.catch += 1;
      }
      if (board.catch >= 5) {
        board.lives += 1;

        board.catch = 0;
      }

      return true;
    } else if (obstacle.y >= 590) {
      if (board.lives > 0) {
        board.lives--;
      }
    }
  }
//object with different variables being drawn on board
  var board = {
    lives: 5,
    timer: 60,
    frames: 0,
    catch: 0,
    weeks: 1
  };
//key code for movement
  document.onkeydown = function(event) {
    if (event.which === 37 || event.which === 38) {
      event.preventDefault();
    }

    var directionCode = event.which;

    currentGame.tom.move(directionCode);
  };
  //this is where the component / obstacle (coconut) is being set
  function Component(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speedCocoX = 0;
    this.speedCocoY = 0;

    //sets speed of coconut depending on the week(level) you are on, 
    //and what point of time you are on the level
    function incDiff() {
      if (board.weeks === 1) {
        if (board.timer <= 60 && board.timer > 45) {
          this.speedCocoY = 1;
        } else if (board.timer <= 44 && board.timer > 30) {
          this.speedCocoY = 3;
        } else if (board.timer <= 29 && board.timer > 15) {
          this.speedCocoY = 5;
        } else if (board.timer <= 14 && board.timer > 0) {
          this.speedCocoY = 8;
        }
      } else if (board.weeks === 2) {
        if (board.timer <= 60 && board.timer > 45) {
          this.speedCocoY = 8;
        } else if (board.timer <= 44 && board.timer > 30) {
          this.speedCocoY = 10;
        } else if (board.timer <= 29 && board.timer > 15) {
          this.speedCocoY = 12;
        } else if (board.timer <= 14 && board.timer > 0) {
          this.speedCocoY = 15;
        }
      } else if (board.weeks === 3) {
        if (board.timer <= 60 && board.timer > 45) {
          this.speedCocoY = 18;
        } else if (board.timer <= 44 && board.timer > 30) {
          this.speedCocoY = 20;
        } else if (board.timer <= 29 && board.timer > 15) {
          this.speedCocoY = 22;
        } else if (board.timer <= 14 && board.timer > 0) {
          this.speedCocoY = 25;
        }
      }

      return this.speedCocoY;
    }
    //draws coconut

    this.img = "./images/coconut1.png";

    this.update = function() {
      var theImage = new Image();
      theImage.src = this.img;
      ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
    };

    this.newPos = function() {
      this.x += this.speedCocoX;

      this.y += incDiff();
    };
  }
  //this is to clear coconuts from falling during the game-result screen 
  var obstaclesExist = true;

  //this constantly draws and redraws the canvas, while checking for diferrent things
  function updateCanvas() {
    ctx.clearRect(0, 0, 830, 700);

    currentGame.tom.drawTom();

    board.frames++;

    var fontcolor = (ctx.fillStyle = "teal");
    var font = (ctx.font = "30px Impact");
    var text = ctx.fillText("Lives: " + board.lives, 375, 30);
    var timeText = ctx.fillText("Timer: " + board.timer, 0, 30);
    var cocoCount = ctx.fillText("Nom Count: " + board.catch, 0, 70);
    var weekCount = ctx.fillText("Week: " + board.weeks, 700, 30);
  //sets how often it drawss the coconut
    if (board.frames % 30 === 1) {
      cocoX = Math.floor(Math.random() * 780);
      cocoWidth = 75;
      cocoHeight = 100;
      obstacles.push(new Component(cocoWidth, cocoHeight, cocoX, 0));
    }
    //checks for collission
    if (obstaclesExist) {
      for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 5;
        obstacles[i].newPos();
        obstacles[i].update();

        if (checkCollision(obstacles[i])) {
          obstacles.splice(i, 1);
        } else if (obstacles[i].y >= 590) {
          obstacles.splice(i, 1);
        }
      }

      //win lose 
      if (board.timer === 0 && board.lives > 0) {
        board.weeks += 1;

        console.log("test " + board.weeks);
        obstacles = [];
        obstaclesExist = false;
        document
          .getElementById("game-result")
          .getElementsByTagName("h1")[0].innerHTML =
          "YOU SURVIVED!*";
        document.getElementById("play-again").innerText =
          "Continue to Week " + board.weeks;
        document.getElementById("game-result").style.display = "block";
        document.getElementById("game-result-overlay").style.display = "block";
        console.log("test " + board.weeks);
      } else if (board.lives === 0 && board.timer > 0) {
        ticker = false;
        obstacles = [];
        obstaclesExist = false;
        board.weeks = 1;

        document
          .getElementById("game-result")
          .getElementsByTagName("h1")[0].innerHTML =
          "YOU DIED!";
        document.getElementById("play-again").innerText = "Try Again?";
        document.getElementById("game-result").style.display = "block";
        document.getElementById("game-result-overlay").style.display = "block";
      }
    }
  }
};
