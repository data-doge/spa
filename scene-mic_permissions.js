class MicPermissions extends Phaser.Scene {

    constructor ()
    {
        super('MicPermissions')
    }

    preload () {

    }

    create () {
        let cam = this.cameras.main;
        cam.setBackgroundColor('#f49ac1')

        // Check for existing permissions
        // let givenMicPermission = localStorage.getItem('givenMicPermission')

        // if (givenMicPermission) {
        //     this.continue()
        // }

        let textPrompt = this.add.dynamicBitmapText(cam.centerX, 60, 'rainyhearts', 'Please accept mic permissions to continue.', 36).setOrigin(0.5)
        textPrompt.tint = 0x000000

        // Load mic permission button
        let micPermissionContainer = this.add.dom(550, cam.centerY).createFromCache('mic-permission-container')

        // On click check username
        micPermissionContainer.addListener('click')
        micPermissionContainer.on('click',  (event) => {

            if (event.target.name === 'mic-permission-button') {
                micPermissionContainer.removeListener('click')
                localStorage.setItem('givenMicPermission', true)
                this.continue()
            }
        })
    }

    update () {

    }

    continue () {
        this.scene.start('Gameplay')
    }

}

// Export this class so it can be used when pulled into other files
module.exports = MicPermissions