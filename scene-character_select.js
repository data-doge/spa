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
        let playerOptionDark = this.add.sprite(this.cameras.main.centerX - 200, this.cameras.main.centerY, 'player-skin-dark').setInteractive().on('pointerdown', () => { this.setSkinColor('dark') })
        let playerOptionMedium = this.add.sprite(this.cameras.main.centerX - 100, this.cameras.main.centerY, 'player-skin-medium').setInteractive().on('pointerdown', () => { this.setSkinColor('medium') })
        let playerOptionTan = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'player-skin-tan').setInteractive().on('pointerdown', () => { this.setSkinColor('tan') })
        let playerOptionLight = this.add.sprite(this.cameras.main.centerX + 100, this.cameras.main.centerY, 'player-skin-light').setInteractive().on('pointerdown', () => { this.setSkinColor('light') })
        let playerOptionPale = this.add.sprite(this.cameras.main.centerX + 200, this.cameras.main.centerY, 'player-skin-pale').setInteractive().on('pointerdown', () => { this.setSkinColor('pale') })
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