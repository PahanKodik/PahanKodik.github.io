class GameOver extends Phaser.Scene {
	constructor() {
		super("game over");
	}

	preload() {
		this.load.image(
			"background",
			"game_over.png"
		);
	}

	create() {
		this.background = this.add.image(0, 0, "background");
		this.background.x = config.width / 2;
        this.background.y = config.height / 2;
	}
}
