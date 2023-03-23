const weatherEl = document.querySelector('.weather');

let geolocation = navigator.geolocation;

const date = new Date();
const dayOfWeek = date.toLocaleDateString('en-GB',{ weekday: 'short' });
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);


function getLocation() {
  geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(`Местоположение: lat:${lat}, long:${lon}`);
  getWeather(lat, lon); // вызов функции для получения погоды
}

function getWeather(lat=50.4333, lon=30.5167) {
    const API_KEY = "2e7139c6a4f80c6748f001736e0d42cb";
    const BASE_URL="https://api.openweathermap.org/data/2.5/weather"
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => { drawWeather(data); })
        .catch(error => console.log(error));
   
}

getLocation();

function drawWeather(data) {
      console.log(data);
    const markup = `<div class="info"><span class="degree">${Math.round(data.main.temp)}°</span><div class="navigation"><span class="description">|${data.weather[0].description}</span>
<span class="location">${data.name}</span></div></div>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="weatherImg" width="365px" height="356px">
<p class="dayOfWeek">${dayOfWeek}</p>
<p class="date">${formattedDate}</p>`;
{/* <a class="weekWeather" href="https://openweathermap.org/city/${data.id}">weather for week</a> */}
    weatherEl.innerHTML=markup;  
}



// Для погоды на неделю
// http://api.openweathermap.org/data/2.5/forecast/
// daily ? q = London & cnt=7 & appid={ YOUR_API_KEY }