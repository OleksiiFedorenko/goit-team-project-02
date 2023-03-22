import axios from 'axios';

const API_KEY = 'zhpRGAb7NMG4A9zazct4F6ipmiCt75qY';
const BASE_URL = 'https://api.nytimes.com/svc/';
const CAT_URL = BASE_URL + 'news/v3/content/section-list.json';

export default class NytService {
  constructor() {
    this.searchQuery = '';
    // this.pageNumber = 1;
  }

  async fetchMostPopular() {}

  async fetchCategories() {
    const config = {
      url: CAT_URL,
      params: {
        'api-key': API_KEY,
      },
    };

    const fetchedData = await axios(config);
    // можна розкоментувати консоль лог ничже, щоб побачити, що я повертаю
    // console.log(fetchedData.data.results);
    return fetchedData.data.results;
  }

  async fetchByCategory() {}

  //   async fetchImages() {
  //     const config = {
  //       url: BASE_URL,
  //       params: {
  //         key: API_KEY,
  //         q: this.searchQuery,
  //         image_type: 'photo',
  //         orientation: 'horizontal',
  //         safesearch: true,
  //         page: this.pageNumber,
  //         per_page: 40,
  //       },
  //     };

  //     try {
  //       const fetchedData = await axios(config);
  //       this.incrementPage();
  //       this.decrementCapacity();
  //       return fetchedData.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   incrementPage() {
  //     this.pageNumber += 1;
  //   }

  //   resetPage() {
  //     this.pageNumber = 1;
  //   }

  //   decrementCapacity() {
  //     this.imagesCapacity -= 40;
  //   }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
