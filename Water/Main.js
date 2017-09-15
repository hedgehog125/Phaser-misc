GameFrame = document.getElementById("Canvas")
Game = new Phaser.Game(640, 360, Phaser.AUTO, "Canvas")
a = 0
numberOfDots = 5000
checkFrameSpread = 3
spread = [10, 20]

GameState = {
	"preload": function() {
		Game.load.image("Dot", "imgs/dot.png")
		Game.stage.backgroundColor = "#00AAFF"
		//Game.stage.backgroundColor = "#FFFFFF"
		Sprites = {}
		Game.canvas.oncontextmenu = function (e) {
			e.preventDefault() 
		}
		cursors = Game.input.keyboard.createCursorKeys() // Add arrow key input.
    	Game.input.mouse.capture = true // Add mouse input.
    	// From http://www.html5gamedevs.com/topic/1828-how-to-calculate-fps-in-plain-javascript/
    	fps = {	startTime : 0,	frameNumber : 0,	getFPS : function(){		this.frameNumber++;		var d = new Date().getTime(),			currentTime = ( d - this.startTime ) / 1000,			result = Math.floor( ( this.frameNumber / currentTime ) );		if( currentTime > 1 ){			this.startTime = new Date().getTime();			this.frameNumber = 0;		}		return result;	}	};
	},
	"create": function() {
		Sprites.sprite = []
		Sprites.text = Game.add.text(0, -5, "FPS: 0", {"font":"normal 20pt Helvetica"})
		var i = 0
		while (i < numberOfDots) {
			newDot(i)
    		i++
    	}
	},
	"update": function() {
		Sprites.text.setText("FPS: " + fps.getFPS())
		var c = 0
		while (c < Math.floor(numberOfDots / checkFrameSpread)) {
			if (! a < numberOfDots) {
				a = 0
			}
			Sprites.sprite[c].body.gravity.y = Game.rnd.integerInRange(250, 350)
			if (Sprites.sprite[c].y > Game.height + 5) {
				Sprites.sprite[c].kill()
				newDot(c)
			}
			c++
			a++
		}
		GameFrame.hidden = false
	}
}

function newDot(i) {
	Sprites.sprite[i] = Game.add.sprite(Game.world.centerX, Game.height, "Dot")
	Sprites.sprite[i].size = Game.rnd.integerInRange(1, 5) / 100
	Sprites.sprite[i].alpha = 1 - (Game.rnd.integerInRange(75, 90) / 100)
	Sprites.sprite[i].scale.setTo(Sprites.sprite[i].size)
	Sprites.sprite[i].anchor.setTo(0.5)
	Sprites.sprite[i].angle = Game.rnd.integerInRange(-180, 180)
	Game.physics.startSystem(Phaser.Physics.ARCADE)
			
	Game.physics.arcade.enable(Sprites.sprite[i])
    Sprites.sprite[i].body.gravity.y = Game.rnd.integerInRange(250, 350)
	Sprites.sprite[i].body.velocity.y = Game.rnd.integerInRange(-150, -300)
	if (Game.rnd.integerInRange(0, 1)) {
		Sprites.sprite[i].body.velocity.x = Game.rnd.integerInRange(spread[0], spread[1])
	}
	else {
		Sprites.sprite[i].body.velocity.x = 0 - Game.rnd.integerInRange(spread[0], spread[1])
	}
}

Game.state.add("GameState", GameState)
Game.state.start("GameState")