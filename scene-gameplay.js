class Gameplay extends Phaser.Scene {

    constructor ()
    {
        super('Gameplay');
    }

    preload () {

    }

    create () {
        console.log('Gameplay')

        let skinColor = localStorage.getItem('skinColor')

        let player = this.add.sprite(400, 300, 'player-skin-' + skinColor)
    }

    update () {

    }

}

// Export this class so it can be used when pulled into other files
module.exports = Gameplay