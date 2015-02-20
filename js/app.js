// Enemies our player must avoid
var Enemy = function() {
	this.xStart = -100; // where the enemy starts on X
	this.xEnd = 550; // where the enemy resets on X
	this.speedMin = 150; // minimum speed for the enemies
	this.speedMax = 500; // maximum speed for the enemies
	this.sprite = 'images/enemy-bug.png';
	this.reset();
}

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x = this.x + this.speed * dt;

	// if enemy runs out of screen -> reset
	if (this.x > this.xEnd) {
		this.reset();
	}
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset the enemy
Enemy.prototype.reset = function() {
	this.x = this.xStart;
	// set speed to a random speed between speedMin and speedMax
	this.speed = this.getRandomMinMax(this.speedMin, this.speedMax);
	// if/else statement to choose which lane the enemy will use
	var randNumb = Math.random();
	if (randNumb < 0.333) {
		this.y = 61;
	} else if (randNumb < 0.666) {
		this.y = 144
	} else {
		this.y = 227;
	}
}

// returns a random value between two values
Enemy.prototype.getRandomMinMax = function(min, max) {
	var randVal = Math.floor(Math.random() * (max - min)) + min;
	return randVal;
}

// player class
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.reset();
}

// player update function in which it checks for collision every time
Player.prototype.update = function() {
	this.checkColision();
}

// function to check for collision with an enemy
Player.prototype.checkColision = function() {
	// check if Player is on water
	if (this.y < 0) {
		this.reset();
	}
	// else check if enemy is on a lane
	else if (this.y === 61 || this.y === 144 || this.y === 227) {
		// go through all enemies and check if player and enemy collide
		for (enemy in allEnemies) {
			if (this.y == allEnemies[enemy].y) {
				if (this.x < allEnemies[enemy].x + 35 && this.x > allEnemies[enemy].x - 35) {
					this.reset();
				}
			}
		}
	}
}

// render player image onscreen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// get key inputs and move player
Player.prototype.handleInput = function(key) {
	if (key === 'left' && this.x > 0) {
		this.x = this.x -101;
	}
	else if (key === 'right' && this.x < 400) {
		this.x = this.x + 101;
	}
	else if (key === 'up') {
		this.y = this.y - 83;
	}
	else if (key === 'down' && this.y < 350) {
		this.y = this.y + 83;
	}
}

// function to reset the player
Player.prototype.reset = function() {
	this.x = 202;
	this.y = 393;
}

// allEnemies array to keep enemy objects inside
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// player object
var player = new Player();

// function to reset difficulty - gets the difficulty value from a dropdown, changes the allEnemies array and resets the player.
function changeDifficulty() {
	var difficulty = document.getElementById("difficulty").value;
	if (difficulty === 'easy') {
		allEnemies = [new Enemy(), new Enemy()];
	} else if (difficulty === 'medium') {
		allEnemies = [new Enemy(), new Enemy(), new Enemy()];
	} else if (difficulty === 'hard') {
		allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
	}
	player.reset();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// added support to play with WASD controls
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',		// left-arrow
		65: 'left',		// A
		38: 'up',		// up-arrow
		87: 'up',		// W
		39: 'right',	// right-arrow
		68: 'right',	// D
		40: 'down',		// down-arrow
		83: 'down'		// S
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
