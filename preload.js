// const game = require('./index')

class Preload extends Phaser.Scene {

    constructor ()
    {
        super('Preload');
    }

    preload () {
      this.load.spritesheet('player-skin-dark', 'assets/player/skin-dark/player-default.png', { frameWidth: 36, frameHeight: 64, endFrame: 1 });
    }

    create () {
        let testText = this.add.text(0,0,'Loading...')
        this.scene.start('CharacterSelect')
    }

    update () {

    }

}

// Export this class so it can be used when pulled into other files
module.exports = Preload