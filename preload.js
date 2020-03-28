// const game = require('./index')

class Preload extends Phaser.Scene {

    constructor ()
    {
        super('Preload');
    }

    preload () {
      this.load.spritesheet('player-skin-dark', 'assets/player/skin-dark/player-default.png', { frameWidth: 36, frameHeight: 64, endFrame: 1 });
      this.load.spritesheet('player-skin-medium', 'assets/player/skin-medium/player-default.png', { frameWidth: 36, frameHeight: 64, endFrame: 1 });
      this.load.spritesheet('player-skin-tan', 'assets/player/skin-tan/player-default.png', { frameWidth: 36, frameHeight: 64, endFrame: 1 });
      this.load.spritesheet('player-skin-light', 'assets/player/skin-light/player-default.png', { frameWidth: 36, frameHeight: 64, endFrame: 1 });
      this.load.spritesheet('player-skin-pale', 'assets/player/skin-pale/player-default.png', { frameWidth: 36, frameHeight: 64, endFrame: 1 });
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