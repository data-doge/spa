class EnterUsername extends Phaser.Scene {

    constructor ()
    {
        super('EnterUsername')
    }

    preload () {

    }

    create () {
        let cam = this.cameras.main;
        cam.setBackgroundColor('#f49ac1')

        // Check for existing username
        let username = localStorage.getItem('username')

        if (username) {
            this.continue()
        }

        let textPrompt = this.add.dynamicBitmapText(cam.centerX, 60, 'rainyhearts', 'Enter your username', 48).setOrigin(0.5)
        textPrompt.tint = 0x000000

        // Load a form for entering username
        let usernameForm = this.add.dom(550, cam.centerY).createFromCache('form-username')

        // On click check username
        usernameForm.addListener('click')
        usernameForm.on('click',  (event) => {

            if (event.target.name === 'username-submit') {
                var usernameInput = usernameForm.getChildByName('username-input')

                //  Have they entered anything?
                if (usernameInput.value !== '') {
                    //  Turn off the click events
                    usernameForm.removeListener('click')
                    this.saveUsername(usernameInput.value)
                }
            }
        })
    }

    update () {

    }

    saveUsername (username) {
        localStorage.setItem('username', username)
        this.continue()
    }

    continue () {
        this.scene.start('CharacterSelect')
    }

}

// Export this class so it can be used when pulled into other files
module.exports = EnterUsername