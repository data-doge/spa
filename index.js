const Phaser = require('phaser')
const Preload = require('./preload')
const CharacterSelect = require('./scene-character_select')
const Gameplay = require('./scene-gameplay')
const Credits = require('./scene-credits')

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [ Preload, CharacterSelect, Gameplay, Credits ]
}

let game = new Phaser.Game(config);