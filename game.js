var config = {
	physics: { default: "arcade" },
	parent: "one_tap",
	width: 360,
	height: 480,
	backgroundColor: 0x000000,
	scene: [Load, Main, Main2, GameOver],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
};

new Phaser.Game(config);