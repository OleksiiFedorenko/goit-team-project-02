import Weather from './fetch-weather';
const date = new Date();
const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'short' });
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);
export { getLocation };

const containerCard = document.querySelector('.news__list');

let geolocation = navigator.geolocation;

function getLocation() {
  if (geolocation) {
    geolocation.getCurrentPosition(showLocation, showError);
  } else {
    const weather = new Weather();
    weather
      .getWeather()
      .then(data => {
        drawWeather(data);
      })
      .catch(error => console.log(error));
  }
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  const weather = new Weather(lat, lon);
  weather
    .getWeather()
    .then(data => {
      drawWeather(data);
    })
    .catch(error => console.log(error));
}

function showError() {
  const weather = new Weather();
  weather
    .getWeather()
    .then(data => {
      drawWeather(data);
    })
    .catch(error => console.log(error));
}

function drawWeather(data) {
  const markup = `<li class="weather"><div class="weather_info">
  <span class="weather_degree">${Math.round(data.main.temp)}°</span>
  <div class="weather_navigation"><span class="weather_description">${
    data.weather[0].description
  }</span>
  <div class="weather_location"><span class="weather_city">${
    data.name
  }</span></div></div></div>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
   alt="weather icon" class="weather_img" >
  <p class="weather_dayOfWeek">${dayOfWeek}</p>
  <p class="weather_date">${formattedDate}</p></li>`;

  containerCard.insertAdjacentHTML('beforeend', markup);

  // тут був конфлікт, заюзав рішення Віктора, яке було запушене останнім
  // weatherEl.innerHTML = markup;
}
