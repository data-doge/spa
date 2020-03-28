// const game = require('./index')

class CharacterSelect extends Phaser.Scene {

    constructor ()
    {
        super('CharacterSelect');
    }

    preload () {

    }

    create () {
        let testText = this.add.text(0,0,'Hello!')
    }

    update () {

    }

}

// Export this class so it can be used when pulled into other files
module.exports = CharacterSelect