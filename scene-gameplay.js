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

        // Draw player with selected skin color
        let skinColor = localStorage.getItem('skinColor')

        this.player = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'player-skin-' + skinColor)
        this.player.visible = false

        // Create player standing animation
        this.anims.create({
            key: 'standing-front',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 1, end: 1 })
        })

        // Play standing by default
        this.player.play('standing-front')
        this.player.visible = true

        // Walking and standing animations in all directions
        this.anims.create({
            key: 'walking-front',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'standing-back',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 4, end: 4 })
        })

        this.anims.create({
            key: 'walking-back',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'standing-left',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 7, end: 7 })
        })

        this.anims.create({
            key: 'walking-left',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 6, end: 8 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        this.anims.create({
            key: 'standing-right',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 10, end: 10 })
        })

        this.anims.create({
            key: 'walking-right',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 9, end: 11 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        // Player physics
        this.physics.add.existing(this.player)
        this.player.body.collideWorldBounds = true

        // Follow the player
        cam.startFollow(this.player)

        // Pull in username
        let username = localStorage.getItem('username')

        // Back button
        let backButton = this.add.sprite(30, this.cameras.main.height - 30, 'button-back').setOrigin(0, 1).setScrollFactor(0)
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
            this.player.body.velocity.y = -100

            // Play walking animation
            if (!this.player.anims.isPlaying){
                this.player.play('walking-back')
            }
        })

        this.input.keyboard.on('keydown-DOWN', () => {
            this.player.body.velocity.y = 100

            // Play walking animation
            if (!this.player.anims.isPlaying){
                this.player.play('walking-front')
            }
        })

        this.input.keyboard.on('keydown-LEFT', () => {
            this.player.body.velocity.x = -100

            // Play walking animation
            if (!this.player.anims.isPlaying){
                this.player.play('walking-left')
            }
        })

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.player.body.velocity.x = 100

            // Play walking animation
            if (!this.player.anims.isPlaying){
                this.player.play('walking-right')
            }
        })

        // Stop moving player


        // Move player
        this.input.keyboard.on('keyup-UP', () => {
            this.player.body.velocity.y = 0
            this.player.play('standing-back')
        })

        this.input.keyboard.on('keyup-DOWN', () => {
            this.player.body.velocity.y = 0
            this.player.play('standing-front')
        })

        this.input.keyboard.on('keyup-LEFT', () => {
            this.player.body.velocity.x = 0
            this.player.play('standing-left')
        })

        this.input.keyboard.on('keyup-RIGHT', () => {
            this.player.body.velocity.x = 0
            this.player.play('standing-right')
        })

    }

    goToCharacterSelect () {
        localStorage.removeItem('skinColor')
        this.anims.remove('standing-front')
        this.anims.remove('standing-back')
        this.anims.remove('standing-left')
        this.anims.remove('standing-right')
        this.anims.remove('walking-front')
        this.anims.remove('walking-back')
        this.anims.remove('walking-left')
        this.anims.remove('walking-right')
        this.scene.start('CharacterSelect')
    }

}

// Export this class so it can be used when pulled into other files
module.exports = Gameplay