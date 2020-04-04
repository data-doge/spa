class CharacterSelect extends Phaser.Scene {

    constructor ()
    {
        super('CharacterSelect')
    }

    preload () {

    }

    create () {
        let cam = this.cameras.main;
        cam.setBackgroundColor('#f49ac1')

        let username = localStorage.getItem('username')

        let textPrompt = this.add.dynamicBitmapText(cam.centerX, 60, 'rainyhearts', 'Select a Character,\n' + username + '!', 48).setOrigin(0.5, 0).setCenterAlign();
        textPrompt.tint = 0x000000

        // Check for existing skin color selection
        let skinColor = localStorage.getItem('skinColor')

        if (skinColor) {
            this.continue()
        }

        // Define skin color options on screen, make them clickable and run function to set skin color
        let playerOptionDark = this.add.sprite(this.cameras.main.centerX - 200, this.cameras.main.centerY, 'player-skin-dark').setInteractive().on('pointerdown', () => { this.setSkinColor('dark') })
        let playerOptionMedium = this.add.sprite(this.cameras.main.centerX - 100, this.cameras.main.centerY, 'player-skin-medium').setInteractive().on('pointerdown', () => { this.setSkinColor('medium') })
        let playerOptionTan = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'player-skin-tan').setInteractive().on('pointerdown', () => { this.setSkinColor('tan') })
        let playerOptionLight = this.add.sprite(this.cameras.main.centerX + 100, this.cameras.main.centerY, 'player-skin-light').setInteractive().on('pointerdown', () => { this.setSkinColor('light') })
        let playerOptionPale = this.add.sprite(this.cameras.main.centerX + 200, this.cameras.main.centerY, 'player-skin-pale').setInteractive().on('pointerdown', () => { this.setSkinColor('pale') })

        // Back button
        let backButton = this.add.sprite(30, this.cameras.main.height - 30, 'button-back').setOrigin(0, 1).setScrollFactor(0)
        backButton.setInteractive().on('pointerdown', () => {
            backButton.setFrame(2)
            this.goToEnterUsername()
        })
        backButton.on('pointerover', () => { backButton.setFrame(1) })
        backButton.on('pointerout', () => { backButton.setFrame(0) })
    }

    update () {

    }

    setSkinColor (skinColor) {
        localStorage.setItem('skinColor', skinColor)
        this.continue()
    }

    goToEnterUsername () {
        localStorage.removeItem('username')
        this.scene.start('EnterUsername')
    }

    continue () {
        this.scene.start('Gameplay')
    }

}

// Export this class so it can be used when pulled into other files
module.exports = CharacterSelect