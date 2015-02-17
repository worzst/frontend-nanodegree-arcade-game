// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.xStart = -100;
    this.xEnd = 550;
    this.speedMin = 150;
    this.speedMax = 500;
    this.sprite = 'images/enemy-bug.png';
    this.reset();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x > this.xEnd) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log(this.x);
    //console.log(this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.drawImage(Resources.get(this.sprite), 300, 300);
}

// Reset the enemy so he doesn't run off the screen and never come back :-)
Enemy.prototype.reset = function() {
    this.x = this.xStart;
    this.speed = this.getRandomMinMax(this.speedMin, this.speedMax);
    //console.log(this.getRandomMinMax(1,3));
    var randNumb = Math.random();
    if (randNumb < 0.333) {
        this.y = 61;
    } else if (randNumb < 0.666) {
        this.y = 144
    } else {
        this.y = 227;
    }
}

Enemy.prototype.getRandomMinMax = function(min, max) {
  var speed = Math.floor(Math.random() * (max - min)) + min;
  console.log(speed);
  return speed;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
}
Player.prototype.update = function() {
    this.checkColision();
}
Player.prototype.checkColision = function() {
    // check if Player is on water
    if (this.y < 0) {
        this.reset();
    }
    else if (this.y === 61 || this.y === 144 || this.y === 227) {
        console.log('check started');
        for (enemy in allEnemies) {
            console.log('check enemies loop started');
            if (this.y === enemy.y) {
                if (this.x === enemy.x) {
                    console.log('should reset');
                    this.reset();
                }
            }
        }
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x = this.x -101;
    }
    else if (key === 'right') {
        this.x = this.x + 101;
    }
    else if (key === 'up') {
        this.y = this.y - 83;
    }
    else if (key === 'down') {
        this.y = this.y + 83;
    }
}
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 310;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
