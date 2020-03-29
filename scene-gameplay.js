class Gameplay extends Phaser.Scene {

    constructor ()
    {
        super('Gameplay');
    }

    preload () {

    }

    create () {
        console.log('Gameplay')

        // Set camera
        let cam = this.cameras.main

        // Set bounds of world
        this.physics.world.setBounds(0, 0, 1920, 1080);

        // Tile background
        let floor = this.add.tileSprite(0, 0, 1920, 1080, 'floor').setOrigin(0)

        // Draw player with selected skin color
        let skinColor = localStorage.getItem('skinColor')
        this.player = this.add.sprite(400, 300, 'player-skin-' + skinColor)
        this.player.visible = false

        // Create player standing animation
        this.anims.create({
            key: 'standing-front',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 1, end: 1 })
        })

        // Play standing by default
        this.player.play('standing-front')
        this.player.visible = true

        this.anims.create({
            key: 'walking-front',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1,
            yoyo: true
        })

        // Additional animations
        this.anims.create({
            key: 'standing-back',
            frames: this.anims.generateFrameNumbers('player-skin-' + skinColor, { start: 3, end: 3 })
        })

        // Player physics
        this.physics.add.existing(this.player)
        this.player.body.collideWorldBounds = true;

        // Follow the player
        cam.startFollow(this.player)

        // Back button
        let backButton = this.add.sprite(30, this.cameras.main.height - 30, 'button-back').setOrigin(0, 1).setScrollFactor(0)
        backButton.setInteractive().on('pointerdown', () => {
            backButton.setFrame(2)
            localStorage.removeItem('skinColor');
            this.scene.start('CharacterSelect')
        })
        backButton.on('pointerover', () => { backButton.setFrame(1) })
        backButton.on('pointerout', () => { backButton.setFrame(0) })

    }

    update () {

        // Move player
        this.input.keyboard.on('keydown-UP', () => {
            this.player.body.velocity.y = -100
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
        })

        this.input.keyboard.on('keydown-RIGHT', () => {
            this.player.body.velocity.x = 100
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
        })

        this.input.keyboard.on('keyup-RIGHT', () => {
            this.player.body.velocity.x = 0
        })

    }

}

// Export this class so it can be used when pulled into other files
module.exports = Gameplay