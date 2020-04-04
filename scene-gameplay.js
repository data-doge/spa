class Gameplay extends Phaser.Scene {

    constructor ()
    {
        super('Gameplay')
    }

    preload () {

    }

    create () {
        // Set camera
        let cam = this.cameras.main

        // Set bounds of world
        this.physics.world.setBounds(0, 0, 1920, 1080)

        // Tile background
        let floor = this.add.tileSprite(0, 0, 1920, 1080, 'floor-gray').setOrigin(0)

        // Create group for player character
        this.mainPlayer = this.add.container(cam.centerX, cam.centerY)
        this.physics.world.enable(this.mainPlayer)

        // Pull in username and skin color
        this.mainPlayer.username = localStorage.getItem('username')
        this.mainPlayer.skinColor = localStorage.getItem('skinColor')

        // Draw main player character
        this.createPlayerCharacter(this.mainPlayer)
        this.setMainPlayerCharacter(this.mainPlayer)

        // Back button
        let backButton = this.add.sprite(30, cam.height - 30, 'button-back').setOrigin(0, 1).setScrollFactor(0)
        backButton.setInteractive().on('pointerdown', () => {
            backButton.setFrame(2)
            this.goToCharacterSelect()
        })
        backButton.on('pointerover', () => { backButton.setFrame(1) })
        backButton.on('pointerout', () => { backButton.setFrame(0) })

    }

    update () {
        // Move player
        this.input.keyboard.on('keydown-UP', () => {
            this.movePlayer('UP', this.mainPlayer)
        })

        this.input.keyboard.on('keydown-DOWN', () => {
            this.movePlayer('DOWN', this.mainPlayer)
        })

        this.input.keyboard.on('keydown-LEFT', () => {
            this.movePlayer('LEFT', this.mainPlayer)
        })

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.movePlayer('RIGHT', this.mainPlayer)
        })

        // Stop player
        this.input.keyboard.on('keyup-UP', () => {
            this.stopPlayer('UP', this.mainPlayer)
        })

        this.input.keyboard.on('keyup-DOWN', () => {
            this.stopPlayer('DOWN', this.mainPlayer)
        })

        this.input.keyboard.on('keyup-LEFT', () => {
            this.stopPlayer('LEFT', this.mainPlayer)
        })

        this.input.keyboard.on('keyup-RIGHT', () => {
            this.stopPlayer('RIGHT', this.mainPlayer)
        })
    }

    createPlayerCharacter (playerContainer) {

        let player = this.add.sprite(0,0, 'player-skin-' + playerContainer.skinColor)
        playerContainer.add(player);
        player.visible = false

        // Create player standing animation
        this.anims.create({
            key: 'standing-front-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 1, end: 1 })
        })

        // Play standing by default
        player.play('standing-front-' + playerContainer.username)
        player.visible = true

        // Walking and standing animations in all directions
        this.anims.create({
            key: 'walking-front-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'standing-back-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 4, end: 4 })
        })

        this.anims.create({
            key: 'walking-back-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'standing-left-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 7, end: 7 })
        })

        this.anims.create({
            key: 'walking-left-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 6, end: 8 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'standing-right-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 10, end: 10 })
        })

        this.anims.create({
            key: 'walking-right-' + playerContainer.username,
            frames: this.anims.generateFrameNumbers('player-skin-' + playerContainer.skinColor, { start: 9, end: 11 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        // Player physics
        this.physics.world.enable(playerContainer)
        playerContainer.body.collideWorldBounds = true

        // Draw username background
        let usernameFontSize = 16
        let usernameWidth = playerContainer.username.length * usernameFontSize * .5
        let usernameTextBackground = this.add.graphics()
        playerContainer.add(usernameTextBackground)
        usernameTextBackground.fillStyle(0x000000, 0.75)
        usernameTextBackground.fillRoundedRect(usernameWidth/2*-1, -52, usernameWidth, 16, 4)

        // Draw username
        let usernameText = this.add.dynamicBitmapText(0, -45,'rainyhearts', playerContainer.username, usernameFontSize).setOrigin(0.5)
        playerContainer.add(usernameText)
    }

    setMainPlayerCharacter (playerContainer) {
        // Follow the player
        let cam = this.cameras.main
        cam.startFollow(playerContainer)
    }

    movePlayer (direction, playerContainer) {
        let player = playerContainer.list[0]

        switch (direction) {
            case 'UP':
                playerContainer.body.velocity.y = -100

                // Play walking animation
                if (!player.anims.isPlaying){
                    player.play('walking-back-' + playerContainer.username)
                }
            break

            case 'DOWN':
                playerContainer.body.velocity.y = 100

                // Play walking animation
                if (!player.anims.isPlaying){
                    player.play('walking-front-' + playerContainer.username)
                }
            break

            case 'LEFT':
                playerContainer.body.velocity.x = -100

                // Play walking animation
                if (!player.anims.isPlaying){
                    player.play('walking-left-' + playerContainer.username)
                }
            break

            case 'RIGHT':
                playerContainer.body.velocity.x = 100

                // Play walking animation
                if (!player.anims.isPlaying){
                    player.play('walking-right-' + playerContainer.username)
                }
            break
        }
    }

    stopPlayer (direction, playerContainer) {
        let player = playerContainer.list[0]

        switch (direction) {
            case 'UP':
                playerContainer.body.velocity.y = 0
                player.play('standing-back-' + playerContainer.username)
            break

            case 'DOWN':
                playerContainer.body.velocity.y = 0
                player.play('standing-front-' + playerContainer.username)
            break

            case 'LEFT':
                playerContainer.body.velocity.x = 0
                player.play('standing-left-' + playerContainer.username)
            break

            case 'RIGHT':
                playerContainer.body.velocity.x = 0
                player.play('standing-right-' + playerContainer.username)
            break
        }
    }

    goToCharacterSelect () {
        // Remove all animations
        Object.entries(this.anims.anims.entries).forEach(([key]) => this.anims.remove(key))
        localStorage.removeItem('skinColor')
        this.scene.start('CharacterSelect')
    }

}

// Export this class so it can be used when pulled into other files
module.exports = Gameplay