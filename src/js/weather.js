import Weather from './fetch-weather';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
const date = new Date();
const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);
export { drawNewForecast, renderForecast };
import { save, load } from './ls-service';

const LOCATION_KEY = 'permissionForLocation';
const weatherCardEl = document.querySelector('.weather');
const weather = new Weather();

let geolocation = navigator.geolocation;

async function renderForecast() {
  const forecastData = await weather.getWeather();
  return createForecastMarkup(forecastData);
}
getLocation();
function createForecastMarkup(data) {
  return `<li class="weather" id="weather-card" width="395px" heigth="675px"><div  class="weather_info">
  <span class="weather_degree">${Math.round(data.main.temp)}°</span>
  <div class="weather_navigation"><span class="weather_description">${
    data.weather[0].description
  }</span>
  <div class="weather_location"><span class="weather_city">${
    data.name
  }</span></div></div></div>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
   alt="weather icon" class="weather_img" >
  <div class="weather_day">${dayOfWeek}</div>
  <div class="weather_date">${formattedDate}</div></li>`;
}

function getLocation() {
  // Вызов функции геолокации с запросом разрешения на доступ к ней и
  //  фиксация ответа пользователя в localStorage
  if (load(LOCATION_KEY) === undefined) {
    Confirm.show(
      'Notiflix Confirm',
      'Please give access to your location to display the weather in your area',
      'Yes',
      'No',
      location,
      noPermission,
      {}
    );
  } else {
    if (load(LOCATION_KEY)) {
     location();
    } 
  }
}

function location() {
  save(LOCATION_KEY, true);
  if (geolocation) {
    geolocation.getCurrentPosition(showLocation); 

}
}
function showLocation(position) {
  weather.lat = position.coords.latitude;
  weather.lon = position.coords.longitude;
  drawNewForecast();
}
function noPermission() {
  save(LOCATION_KEY, false);
}
async function drawNewForecast(position) {
     // const weatherCard = document.getElementById("weather-card");
  // const weatherCardEl = document.querySelector('.weather');
const data = await weather.getWeather();
  // const forecastMarkup = createForecastMarkup(forecastData);
  // weatherCardEl.innerHTML = forecastMarkup;
  console.log(data);

  const weatherDegree = document.querySelector('.weather_degree').textContent;
  const weatherDescription = document.querySelector('.weather_description').textContent;
  const weatherCity = document.querySelector('.weather_city').textContent;
  const weatherImg = document.querySelector('.weather_img').src;
  const weatherDay = document.querySelector('.weather_day').textContent=dayOfWeek;
  const weatherDate = document.querySelector('.weather_date').textContent=formattedDate;

  data = {
    weatherDegree: `${Math.round(main.temp)}°`,
  weatherDescription:`${ weather[0].description }`,
  weatherCity : name,
  weatherImg : `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`,
  }

}