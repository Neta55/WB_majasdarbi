let cities = {
  Riga: 'Rīga'
}

var obj = {}
var weather = document.getElementById('weather')


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

// fetch('http://127.0.0.1/api/inboxWeather/')
fetch('/WB_majasdarbi/4/inboxWeather/inboxWeather.json')
  .then(res => res.json())
  .then(data => callback(data))
  .catch(e => console.log(e))

function callback(data) {
  obj = data
  var out = `<div class="center">${cities[data.geoip.city] || data.geoip.city}, ${data.weather.currTemp}&#8451;, vējš  ${data.weather.windSpeed} m/s</div>`
  weather.innerHTML = out
}

var majasdObj = [{
    name: 'Anna',
    notes: [173, 75, 30]
  },
  {
    name: 'Liene',
    notes: [165, 66, 29]
  },
  {
    name: 'Pēteris',
    notes: [182, 97, 22]
  },
  {
    name: 'Mārtiņš',
    notes: [190, 85, 40]
  },
]

var out = ''
majasdObj.forEach(element => {
  out += `<div class="klucis">`
  out += `<h2>${element.name}</h2>`
  out += `<ul>`
  out += `<li>Augums: ${element.notes[0]} cm</li>`
  out += `<li>Svars: ${element.notes[1]} kg</li>`
  out += `<li>Vecums: ${element.notes[2]} gadi</li>`

  out += `</ul>`
  out += `</div>`


});


document.getElementById('objects').innerHTML = out