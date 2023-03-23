
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
 
  const weather = new Weather(lat, lon);
  weather.getWeather()
    .then(data => {
      drawWeather(data);
    })
    .catch(error => console.log(error));
}

function drawWeather(data) {

    const markup = `<div class="weather_info">
  <span class="weather_degree">${Math.round(data.main.temp)}°</span>
  <div class="weather_navigation"><span class="weather_description">${data.weather[0].description}</span>
  <div class="weather_location"><span class="weather_city">${data.name}</span></div></div></div>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
   alt="weather icon" class="weather_img" >
  <p class="weather_dayOfWeek">${dayOfWeek}</p>
  <p class="weather_date">${formattedDate}</p>`;

  weatherEl.innerHTML=markup;
}

getLocation();
