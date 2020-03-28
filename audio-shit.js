module.exports = {
  start: () => {
    window.navigator.mediaDevices.getUserMedia({ audio: true })
  }
}
