

export default class Weather {
  
  constructor(lat=40.7143, lon=-74.006) {
    this.lat = lat;
    this.lon = lon;
    this.API_KEY = "2e7139c6a4f80c6748f001736e0d42cb";
    this.BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeather() {
    const url = `${this.BASE_URL}?lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&units=metric`;

    return await fetch(url)
      .then(response => response.json());    
  }
}

