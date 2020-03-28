module.exports = {
  start: (cb) => {
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
    navigator.getUserMedia({ audio: true }, (localStream) => {
      cb(null, localStream)
    }, (err) => {
      cb(err)
    })
  }
}
