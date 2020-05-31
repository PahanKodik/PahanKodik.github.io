class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }
    preload(){
        this.load.atlas(
            'atlas',
            'atlas.png',
            'atlas.json'
        );
    }
    create() {
        this.scene.start("main");
    }
}