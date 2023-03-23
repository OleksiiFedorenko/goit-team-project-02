import axios from 'axios';

const API_KEY = 'zhpRGAb7NMG4A9zazct4F6ipmiCt75qY';
const BASE_URL = 'https://api.nytimes.com/svc/';

export default class NytService {
  constructor() {
    this.categoryName = '';
    this.searchQuery = '';
    this.page = 0;
    // для реалізації календаря
    // this.date = '';
  }

  // стягуємо популярні статті (для початкової загрузки)
  async fetchMostPopular() {
    const MOSTPOP_URL = BASE_URL + 'mostpopular/v2/viewed/1.json';
    const config = {
      url: MOSTPOP_URL,
      params: {
        'api-key': API_KEY,
      },
    };

    const fetchedData = await axios(config);
    // повертається масив об'єктів
    // можна розкоментувати консоль лог ничже, щоб побачити
    // console.log(fetchedData.data.results);
    return fetchedData.data.results;
  }

  // стягуємо список категорій (для фільтрів)
  async fetchCategories() {
    const CAT_URL = BASE_URL + 'news/v3/content/section-list.json';
    const config = {
      url: CAT_URL,
      params: {
        'api-key': API_KEY,
      },
    };

    const fetchedData = await axios(config);
    // повертається масив об'єктів
    // можна розкоментувати консоль лог ничже, щоб побачити
    // console.log(fetchedData.data.results);
    return fetchedData.data.results;
  }

  // стягуємо статті за обраною категорією
  async fetchByCategory() {
    const encodedCategory = encodeURIComponent(this.categoryName);
    const BYCAT_URL = `${BASE_URL}news/v3/content/all/${encodedCategory}.json`;
    const config = {
      url: BYCAT_URL,
      params: {
        'api-key': API_KEY,
      },
    };

    const fetchedData = await axios(config);
    // повертається масив об'єктів
    // можна розкоментувати консоль лог ничже, щоб побачити
    // console.log(fetchedData.data.results);
    return fetchedData.data.results;
  }

  // стягуємо статті за пошуковими словами
  async fetchByQuery() {
    const encodedQuery = encodeURIComponent(this.searchQuery);
    const BYCAT_URL = BASE_URL + 'search/v2/articlesearch.json';
    const config = {
      url: BYCAT_URL,
      params: {
        'api-key': API_KEY,
        fq: encodedQuery,
        page: this.page,
        // параметри для реалізації календаря: begin_date=20221125&end_date=20221125
        // begin_date: this.date,
        // end_date: this.date,
      },
    };

    const fetchedData = await axios(config);
    // для реалізації пагінації потрібно буде розкоментувати рядок нижче
     this.incrementPage();
    // повертається об'єкт з двома ключами:
    // docs - масив об'єктів зі статтями (10 за раз)
    // meta - об'єкт з кількістю результатів (hits) та offset
    // максимальна видача 1000 результатів (100 сторінок)
    // можна розкоментувати консоль лог ничже, щоб побачити
     console.log(fetchedData.data.response);
    return fetchedData.data.response;
  }

  // збільшення сторінки для пагінації
  incrementPage() {
    this.page += 1;
  }

  // при новому пошуку не забуваємо обнулити сторінку
  resetPage() {
    this.page = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery.toLowerCase();
  }

  get category() {
    return this.categoryName;
  }

  set category(newCategory) {
    this.categoryName = newCategory.toLowerCase();
  }
}
