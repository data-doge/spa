class Preload extends Phaser.Scene {

    constructor ()
    {
        super('Preload')
    }

    preload () {
      let testText = this.add.text(300,300,'Loading...')

      // Forms
      this.load.html('form-username', 'assets/text/usernameform.html')

      // Player sprites
      this.load.spritesheet('player-skin-dark', 'assets/player/skin-dark/player-default.png', { frameWidth: 36, frameHeight: 64 })
      this.load.spritesheet('player-skin-medium', 'assets/player/skin-medium/player-default.png', { frameWidth: 36, frameHeight: 64 })
      this.load.spritesheet('player-skin-tan', 'assets/player/skin-tan/player-default.png', { frameWidth: 36, frameHeight: 64 })
      this.load.spritesheet('player-skin-light', 'assets/player/skin-light/player-default.png', { frameWidth: 36, frameHeight: 64 })
      this.load.spritesheet('player-skin-pale', 'assets/player/skin-pale/player-default.png', { frameWidth: 36, frameHeight: 64 })

      // Scenery
      this.load.image('floor-blue', 'assets/scenery/background-tile-blue.png')
      this.load.image('floor-gray', 'assets/scenery/background-tile-gray.png')

      // Buttons
      this.load.spritesheet('button-back', 'assets/buttons/button-back.png', { frameWidth: 96, frameHeight: 64, endFrame: 3 })
    }

    create () {
        this.scene.start('EnterUsername')
    }

    update () {

    }

}

// Export this class so it can be used when pulled into other files
module.exports = Preload