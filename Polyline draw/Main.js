GameFrame = document.getElementById("Canvas")
Game = new Phaser.Game(640, 360, Phaser.AUTO, "Canvas")
polyline = []
polylines = []
clickCooldown = false

function getDis(x, y, x1, y1) {
	return Math.abs(x - x1) + Math.abs(y - y1)
}

GameState = {
	"preload": function() {
		Game.stage.backgroundColor = "#00AAFF"
		Sprites = {}
		Game.canvas.oncontextmenu = function (e) {
			e.preventDefault() 
		}
    	Game.input.mouse.capture = true // Add mouse input.
    	canvas = Game.make.bitmapData(Game.width, Game.height)
    	ctx = canvas.ctx
    	ctx.lineCap = "round"
    	ctx.lineWidth = 10
    	Game.add.sprite(0, 0, canvas)
    	// From http://www.html5gamedevs.com/topic/1828-how-to-calculate-fps-in-plain-javascript/
    	fps = {	startTime : 0,	frameNumber : 0,	getFPS : function(){		this.frameNumber++;		var d = new Date().getTime(),			currentTime = ( d - this.startTime ) / 1000,			result = Math.floor( ( this.frameNumber / currentTime ) );		if( currentTime > 1 ){			this.startTime = new Date().getTime();			this.frameNumber = 0;		}		return result;	}	};
	},
	"create": function() {
		Sprites.text = Game.add.text(0, -5, "FPS: 0", {"font":"normal 20pt Helvetica"})
    	GameFrame.hidden = false
	},
	"update": function() {
		Sprites.text.setText("FPS: " + fps.getFPS())
		if (! Game.input.activePointer.isDown) {
			clickCooldown = false	
		}
		if (Game.input.activePointer.isDown & (! clickCooldown)) {
			clickCooldown = true
			if (polyline.length > 2 & getDis(polyline[0], polyline[1], Game.input.x, Game.input.y) <= ctx.lineWidth) {
				polylines[polylines.length] = JSON.parse(JSON.stringify(polyline))
				polyline = []
			}
			else {
				polyline[polyline.length] = Game.input.x
				polyline[polyline.length] = Game.input.y
				polyline[polyline.length] = Game.input.x
				polyline[polyline.length] = Game.input.y
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		if (polyline.length > 0) {
			ctx.beginPath()
			ctx.moveTo(polyline[0], polyline[1])
			var c = 2
			while (c < polyline.length) {
				if ((polyline.length - c) / 2 == 1) {
					ctx.lineTo(Game.input.x, Game.input.y)
				}
				else {
					ctx.lineTo(polyline[c], polyline[c + 1])
				}
				c = c + 2
			}
			ctx.stroke()
		}
		
		var a = 0
		while (a < polylines.length) {
			ctx.beginPath()
			ctx.moveTo(polylines[a][0], polylines[a][1])
			var c = 2
			while (c < polylines[a].length) {
				ctx.lineTo(polylines[a][c], polylines[a][c + 1])
				c = c + 2
			}
			ctx.lineTo(polylines[a][0], polylines[a][1])
			ctx.fill()
			a++
		}
		canvas.dirty = true
		canvas.render()
	}
}

Game.state.add("GameState", GameState)
Game.state.start("GameState")