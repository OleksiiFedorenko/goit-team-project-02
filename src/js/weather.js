import Weather from './fetch-weather';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
const date = new Date();
const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);
export { getLocation, renderForecast };
import { save, load } from './ls-service';

const LOCATION_KEY = 'permissionForLocation';

const weather = new Weather();

// let geolocation = navigator.geolocation;

async function renderForecast() {
  const forecastData = await weather.getWeather();
  return createForecastMarkup(forecastData);
}

function createForecastMarkup(data) {
  return `<li class="weather"><div class="weather_info">
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

// function getLocation() {
//   // Вызов функции геолокации с запросом разрешения на доступ к ней и
//   //  фиксация ответа пользователя в localStorage
//   if (load(LOCATION_KEY) === undefined) {
//     Confirm.show(
//       'Notiflix Confirm',
//       'Please give access to your location to display the weather in your area',
//       'Yes',
//       'No',
//       location,
//       showError,
//       {}
//     );
//   } else {
//     if (load(LOCATION_KEY)) {
//       location();
//     } else {
//       showError();
//     }
//   }
// }

// function location() {
//   save(LOCATION_KEY, true);
//   if (geolocation) {
//     geolocation.getCurrentPosition(showLocation, showError);
//   } else {
//     weather
//       .getWeather()
//       .then(data => {
//         drawWeather(data);
//       })
//       .catch(error => console.log(error));
//   }
// }

// function showLocation(position) {
//   weather.lat = position.coords.latitude;
//   weather.lon = position.coords.longitude;

//   weather
//     .getWeather()
//     .then(data => {
//       drawWeather(data);
//     })
//     .catch(error => console.log(error));
// }

// function showError() {
//   save(LOCATION_KEY, false);
//   weather
//     .getWeather()
//     .then(data => {
//       drawWeather(data);
//     })
//     .catch(error => console.log(error));
// }
