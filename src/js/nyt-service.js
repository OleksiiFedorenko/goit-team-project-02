import axios from 'axios';

const API_KEY = 'zhpRGAb7NMG4A9zazct4F6ipmiCt75qY';
const BASE_URL = 'https://api.nytimes.com/svc/';

export default class NytService {
  constructor() {
    this.searchQuery = '';
    this.categoryQuery = '';
    this.dateQuery = '';
    //тип новин, за замовчуванням найбільш популярні
    this.newsType = 'mp';
    //кількість новин (службова інформація)
    this.newsNumber = 0;
    // для пагінації
    this.apiPagination = false;
    this.page = 0;
    this.totalPages = 0;
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
    // записуємо кількість новин
    this.getNewsNumber(fetchedData.data);
    // повертається масив об'єктів, кожен елемент - новина
    // можна розкоментувати консоль лог ничже, щоб побачити, що повертаэться
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
    // повертається масив об'єктів, кожен елемент - категорія
    // можна розкоментувати консоль лог ничже, щоб побачити, що повертаэться
    // console.log(fetchedData.data.results);
    return fetchedData.data.results;
  }

  // стягуємо статті за обраною категорією
  async fetchByCategory() {
    const BYCAT_URL = `${BASE_URL}news/v3/content/all/${this.categoryQuery}.json`;
    const config = {
      url: BYCAT_URL,
      params: {
        'api-key': API_KEY,
      },
    };

    const fetchedData = await axios(config);
    // обнуляємо поточну сторінку (потрібно для роботи пагінації)
    this.resetPage();
    //записуємо службову інформацію
    this.newsType = 'cat';
    this.apiPagination = false;
    this.getNewsNumber(fetchedData.data);
    // повертається масив об'єктів
    // можна розкоментувати консоль лог ничже, щоб побачити
    // console.log(fetchedData.data.results);
    return fetchedData.data.results;
  }

  // стягуємо статті за пошуковими словами
  async fetchByQuery() {
    const BYCAT_URL = BASE_URL + 'search/v2/articlesearch.json';
    const config = {
      url: BYCAT_URL,
      params: {
        'api-key': API_KEY,
        fq: this.searchQuery,
        page: this.page,
        sort: 'newest',
      },
    };

    if (this.dateQuery) {
      // параметри для реалізації календаря: begin_date=20221125&end_date=20221125
      config.params.begin_date = this.dateQuery;
      config.params.end_date = this.dateQuery;
    }

    const fetchedData = await axios(config);
    //записуємо службову інформацію
    this.newsType = 'word';
    this.apiPagination = true;
    this.getNewsNumber(fetchedData.data);
    // повертається об'єкт з двома ключами:
    // docs - масив об'єктів зі статтями (10 за раз)
    // meta - об'єкт з кількістю результатів (hits) та offset
    // максимальна видача 1000 результатів (100 сторінок)
    // можна розкоментувати консоль лог ничже, щоб побачити
    // console.log(fetchedData.data.response);
    return fetchedData.data.response;
  }

  // записуємо кількість новин
  getNewsNumber(data) {
    if (this.newsType === 'mp' || this.newsType === 'cat')
      this.newsNumber = data ? data.results.length : 0;

    if (this.newsType === 'word')
      this.newsNumber = data ? data.response.meta.hits : 0;
  }

  // set the number of page for pagination
  setPage(pageNumber) {
    this.page = pageNumber;
  }

  // при новому пошуку не забуваємо обнулити сторінку
  resetPage() {
    this.page = 0;
  }

  setTotalPages(pages) {
    this.totalPages = pages;
  }

  getTotalPages() {
    return this.totalPages;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = encodeURIComponent(newQuery.toLowerCase());
  }

  get date() {
    return this.searchQuery;
  }

  set date(newDate) {
    this.dateQuery = newDate;
  }

  get category() {
    return this.categoryQuery;
  }

  set category(newCategory) {
    this.categoryQuery = encodeURIComponent(
      newCategory.replace('&amp;', '&').toLowerCase()
    );
  }
}
