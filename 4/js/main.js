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
  let out = `<div class="center">${cities[data.geoip.city] || data.geoip.city}, ${data.weather.currTemp}&#8451;, vējš  ${data.weather.windSpeed} m/s</div>`
  weather.innerHTML = out
}

var majasdObj = [{
    photo: '/WB_majasdarbi/4/bildes/anna.svg',
    name: 'Anna',
    notes: [173, 75, 30]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/liene.svg',
    name: 'Liene',
    notes: [165, 66, 29]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/peteris.svg',
    name: 'Pēteris',
    notes: [182, 77, 22]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/martins.svg',
    name: 'Mārtiņš',
    notes: [190, 85, 40]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/daina.svg',
    name: 'Daina',
    notes: [160, 65, 25]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/karlis.svg',
    name: 'Kārlis',
    notes: [180, 82, 35]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/ieva.svg',
    name: 'Ieva',
    notes: [180, 65, 28]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/andrejs.svg',
    name: 'Andrejs',
    notes: [189, 80, 50]
  },
  {
    photo: '/WB_majasdarbi/4/bildes/konrads.svg',
    name: 'Konrāds',
    notes: [179, 830, 70]
  },
]

var out = ''
majasdObj.forEach(element => {
  out += `<div class="klucis">`
  out += `<img src='${element.photo}' class='photo'>`
  out += `<h2>${element.name}</h2>`
  out += `<ul>`
  out += `<li>Augums: ${element.notes[0]} cm</li>`
  out += `<li>Svars: ${element.notes[1]} kg</li>`
  out += `<li>Vecums: ${element.notes[2]} gadi</li>`

  out += `</ul>`
  out += `</div>`


});


document.getElementById('objects').innerHTML = out