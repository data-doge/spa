class EnterUsername extends Phaser.Scene {

    constructor ()
    {
        super('EnterUsername')
    }

    preload () {

    }

    create () {
        // Check for existing username
        let username = localStorage.getItem('username')

        if (username) {
            this.continue()
        }

        let testText = this.add.text(400, 60, 'Enter your username', { fontSize: 40 }).setOrigin(0.5)

        // Load a form for entering username
        let usernameForm = this.add.dom(this.cameras.main.centerX, this.cameras.main.centerY).createFromCache('form-username')

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