// const game = require('./index')

class CharacterSelect extends Phaser.Scene {

    constructor ()
    {
        super('CharacterSelect');
    }

    preload () {

    }

    create () {
        let testText = this.add.text(0,0,'Select a Character!')
        let skinColor = localStorage.getItem('skinColor')

        if (!skinColor) {
        localStorage.setItem('skinColor', 'dark')
        }

        this.scene.start('Gameplay')
    }

    update () {

    }

}

// Export this class so it can be used when pulled into other files
module.exports = CharacterSelect