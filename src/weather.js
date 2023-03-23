
import Weather from './fetchWeather';

const weatherEl = document.querySelector('.weather');
const date = new Date();
const dayOfWeek = date.toLocaleDateString('en-GB',{ weekday: 'short' });
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);

let geolocation = navigator.geolocation;

function getLocation() {
  geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(`Местоположение: lat:${lat}, long:${lon}`);

  const weather = new Weather(lat, lon);
  weather.getWeather()
    .then(data => {
      drawWeather(data);
    })
    .catch(error => console.log(error));
}

function drawWeather(data) {
  console.log(data);
  const markup = `<div class="info"><span class="degree">${Math.round(data.main.temp)}°</span><div class="navigation"><span class="description">${data.weather[0].description}</span>
  <span class="location">${data.name}</span></div></div>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="weatherImg" width="365px" height="356px">
  <p class="dayOfWeek">${dayOfWeek}</p>
  <p class="date">${formattedDate}</p>`;

  weatherEl.innerHTML=markup;
}

getLocation();


