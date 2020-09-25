setInterval(() => {
  let d = new Date()
  let hours = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  let out = `${a(hours)}:${a(minutes)}:${a(seconds)}`
  const el = document.getElementById('clock')
  el.innerHTML = out

}, 1000);

function a(b) {
  return b < 10 ? `0${b}` : b
}