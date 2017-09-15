GameFrame = document.getElementById("Canvas")
Game = new Phaser.Game(640, 360, Phaser.AUTO, "Canvas")

GameState = {
	"preload": function() {
		Game.load.image("Banana", "imgs/banana.png")
		Game.load.image("Dot", "imgs/dot.png")
		Game.stage.backgroundColor = "#00AAFF"
		Sprites = {}
		Game.canvas.oncontextmenu = function (e) {
			e.preventDefault() 
		}
		cursors = Game.input.keyboard.createCursorKeys() // Add arrow key input.
    	Game.input.mouse.capture = true // Add mouse input.
	},
	"create": function() {
		Sprites.sprite = Game.add.sprite(this.game.world.centerX, this.game.world.centerY, "Banana")
		Sprites.sprite.size = 0.05
		Sprites.sprite.scale.setTo(Sprites.sprite.size)
		Sprites.sprite.anchor.setTo(0.5)
		Game.add.text(0, 0, "Hello world!", {"font":"bold 80pt Helvetica"})
		GameFrame.hidden = false
		Sprites.sprite.angle = -20
		Game.physics.startSystem(Phaser.Physics.ARCADE)
		
		Game.physics.arcade.enable(Sprites.sprite)
		Sprites.sprite.body.bounce.x = 0.5
		Sprites.sprite.body.bounce.y = 0.45
    	Sprites.sprite.body.gravity.y = 300
    	Sprites.sprite.body.collideWorldBounds = true
    	
	},
	"update": function() {
		if (Math.abs(Sprites.sprite.body.velocity.x) < 0) {
			Sprites.sprite.body.velocity.x = 0
		}
		Sprites.sprite.body.velocity.x = Sprites.sprite.body.velocity.x * 0.98
		if (Sprites.sprite.y + (Sprites.sprite.height / 2) > 355) {
			if (cursors.left.isDown) {
				Sprites.sprite.body.velocity.x+= -20
				Sprites.sprite.scale.setTo(-Sprites.sprite.size, Sprites.sprite.size)
			}
			if (cursors.right.isDown) {
				Sprites.sprite.body.velocity.x+= 20
				Sprites.sprite.scale.setTo(Sprites.sprite.size)
			}
			if (cursors.up.isDown) {
				Sprites.sprite.body.velocity.y = -500
			}
		}
	}
}

Game.state.add("GameState", GameState)
Game.state.start("GameState")