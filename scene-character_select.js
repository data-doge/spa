// const game = require('./index')

class CharacterSelect extends Phaser.Scene {

    constructor ()
    {
        super('CharacterSelect');
    }

    preload () {

    }

    create () {
        let testText = this.add.text(400, 60, 'Select a Character!', { fontSize: 40 }).setOrigin(0.5);

        // Check for existing skin color selection
        let skinColor = localStorage.getItem('skinColor')

        if (skinColor) {
            this.continue();
        }

        // Define skin color options on screen, make them clickable and run function to set skin color
        let playerOptionDark = this.add.sprite(200, 300, 'player-skin-dark').setInteractive().on('pointerdown', () => { this.setSkinColor('dark') })
        let playerOptionMedium = this.add.sprite(300, 300, 'player-skin-medium').setInteractive().on('pointerdown', () => { this.setSkinColor('medium') })
        let playerOptionTan = this.add.sprite(400, 300, 'player-skin-tan').setInteractive().on('pointerdown', () => { this.setSkinColor('tan') })
        let playerOptionLight = this.add.sprite(500, 300, 'player-skin-light').setInteractive().on('pointerdown', () => { this.setSkinColor('light') })
        let playerOptionPale = this.add.sprite(600, 300, 'player-skin-pale').setInteractive().on('pointerdown', () => { this.setSkinColor('pale') })
    }

    update () {

    }

    setSkinColor (skinColor) {
        localStorage.setItem('skinColor', skinColor)
        this.continue()
    }

    continue () {
        this.scene.start('Gameplay')
    }

}

// Export this class so it can be used when pulled into other files
module.exports = CharacterSelect