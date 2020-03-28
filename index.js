const Phaser = require('phaser')
const uuid = require('uuid')
const $ = require('jquery')
const Preload = require('./preload')
const CharacterSelect = require('./scene-character_select')
const Gameplay = require('./scene-gameplay')
const Credits = require('./scene-credits')

const audioShit = require('./audio-shit')

const config = {
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

const game = new Phaser.Game(config)

/// //////////////////////////////////

window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription

const id = uuid.v4()
let $peerConnection = null
let $localStream = null
const $serverConnection = new WebSocket('ws://spa-server.ngrok.io')
$serverConnection.onmessage = gotMessageFromServer

audioShit.start((err, stream) => {
  if (err) throw err
  $localStream = stream
  console.log(`set $localStream: ${$localStream}`)
})

$('#make-the-call').on('click', (e) => {
  startPeerConnection(true)
})

// ///////////////////////////////////////////////////////////////

function startPeerConnection (isCaller) {
  $peerConnection = new window.RTCPeerConnection({
    iceServers: [
      { url: 'stun:stun.services.mozilla.com' },
      { url: 'stun:stun.l.google.com:19302' }
    ]
  })
  $peerConnection.onicecandidate = (event) => {
    if (event.candidate !== null) {
      console.log('sending ice candidate')
      $serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: id }))
    }
  }
  $peerConnection.ontrack = (event) => {
    console.log('got remote stream')
    const speakerEl = document.getElementById('speaker')
    speakerEl.srcObject = event.streams[0]
  }
  $peerConnection.addStream($localStream)

  if (isCaller) {
    $peerConnection.createOffer().then(createdDescription).catch(console.error)
  }
}

function gotMessageFromServer (message) {
  if (!$peerConnection) startPeerConnection(false)

  var signal = JSON.parse(message.data)
  console.log({ signal })

  // Ignore messages from ourself
  if (signal.uuid === id) return

  if (signal.sdp) {
    $peerConnection.setRemoteDescription(new window.RTCSessionDescription(signal.sdp)).then(function () {
      // Only create answers in response to offers
      if (signal.sdp.type === 'offer') {
        $peerConnection.createAnswer().then(createdDescription).catch(console.error)
      }
    }).catch(console.error)
  } else if (signal.ice) {
    $peerConnection.addIceCandidate(new window.RTCIceCandidate(signal.ice)).catch(console.error)
  }
}

function createdDescription (description) {
  $peerConnection.setLocalDescription(description).then(() => {
    $serverConnection.send(JSON.stringify({ sdp: $peerConnection.localDescription, uuid: id }))
  }).catch(console.error)
}
