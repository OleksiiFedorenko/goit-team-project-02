const API_KEY = '2e7139c6a4f80c6748f001736e0d42cb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default class Weather {
  constructor(lat=40.7143, lon=-74.006) {
    this.lat = lat;
    this.lon = lon;
  }

  async getWeather() {
    const url = `${BASE_URL}?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}&units=metric`;

    const forecastData = await fetch(url);
    return forecastData.json();
  }
}
