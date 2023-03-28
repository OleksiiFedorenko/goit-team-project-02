import NytService from './nyt-api';
// import formatDate from './news-date';
import { checkPresentArticleInLS, onNewsListClick } from './read-news';
import alreadyFavorite from './favorite-add-btn';
import { getLocation } from './weather';
import showDefaultImg from './show-default-image';

import defaultImg from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';

// цей спосіб під питанням, скоріше за все не потрібно.
// контейнер для зберігання новин.
// буде використовуватись для пагінації на нашій стороні
// а також для адаптації під різні ширини екрану
// const news = [];

// сторінка для пагінації (можливо)
let page = 1;

// рефи і слухачі
const searchForm = document.querySelector('.header-form ');
const categoriesContainer = document.querySelector('.filter__list');
const newsContainer = document.querySelector('.news__list');
const noNewsContainer = document.querySelector('.no-news');
const calendar = document.querySelector('.calendar-container');
const selectedDate = document.querySelector('.date-btn__value');

if (searchForm) searchForm.addEventListener('submit', onSearchFormSubmit);
if (categoriesContainer)
  categoriesContainer.addEventListener('click', onCategoryClick);
if (newsContainer) newsContainer.addEventListener('click', onNewsListClick);
if (calendar) calendar.addEventListener('click', onCalendarClick);

// екземпляр класу для роботи з апі новин
const nytService = new NytService();

// змінна для покушу за словом з local Storage (при пошуку на іншій сторінці)
const searchText = localStorage.getItem('searchText');

///////////// РОЗДІЛ ПОПУЛЯРНИХ НОВИН (ЗАВАНТАЖУЄТЬСЯ ЗА ЗАМОВЧУВАННЯМ) /////////////

if (newsContainer && !searchText) createStartNews();

/// функція для завантаження стартових новин

async function createStartNews() {
  const startNewsArray = await nytService.fetchMostPopular();

  const markupArray = createNewsMarkupArray(startNewsArray);

  drawMarkup(markupArray);
}

///////////// РОЗДІЛ НОВИН ЗА КАТЕГОРІЄЮ /////////////

async function onCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.innerHTML;
  if (categoryName === 'Others' || categoryName === 'Categories') return;
  nytService.category = categoryName;

  clearNewsMarkup();
  searchForm.reset();

  try {
    const catNewsArray = await nytService.fetchByCategory(categoryName);

    const markupArray = createNewsMarkupArray(catNewsArray);

    drawMarkup(markupArray);
  } catch (error) {
    showDefaultImg();
  }
}

///////////// РОЗДІЛ НОВИН ЗА ПОШУКОМ /////////////

async function onSearchFormSubmit(e) {
  if (e) {
    e.preventDefault();
    nytService.query = e.currentTarget.elements.query.value.trim();
  }

  //// ПЕРЕВІРЯЄМО ЧИ МИ НА ГОЛОВНІЙ СТОРІНЦІ ////
  if (newsContainer) {
    //// НА ГОЛОВНІЙ ////
    if (nytService.query.trim() === '') return showDefaultImg();

    clearNewsMarkup();
    nytService.resetPage();
  } else {
    //// НЕ НА ГОЛОВНІЙ ////
    const searchText = nytService.query;

    if (searchText.length === 0 || /^\s*$/.test(searchText)) {
      // Перевіряємо, що рядок не порожній і не містить лише пробіли
      console.log('Search query is empty or contains only spaces');
      return;
    }

    localStorage.setItem('searchText', searchText);

    window.location.href = 'index.html';
    return;
  }

  try {
    const searchNewsData = await nytService.fetchByQuery();

    if (!searchNewsData.meta.hits) return showDefaultImg();

    const markupArray = createSearchMarkupArray(searchNewsData.docs);

    drawMarkup(markupArray);
  } catch (error) {
    showDefaultImg();
  }
}

///////////// ЛОГІКА НОВИН ЗА ПОШУКОМ ПІСЛЯ ПЕРЕХОДУ З ІНШОЇ СТОРІНКИ /////////////

if (searchText) {
  searchFromOtherPages();
  localStorage.removeItem('searchText');
}

async function searchFromOtherPages() {
  nytService.query = searchText;

  if (nytService.query === '') return showDefaultImg();

  clearNewsMarkup();
  nytService.resetPage();

  try {
    const searchNewsData = await nytService.fetchByQuery();

    if (!searchNewsData.meta.hits) return showDefaultImg();
    const markupArray = createSearchMarkupArray(searchNewsData.docs);

    drawMarkup(markupArray);
  } catch (error) {
    showDefaultImg();
  }
}

///////////// КАЛЕНДАР /////////////

function onCalendarClick() {
  const calendarDate = selectedDate.textContent;
  nytService.date =
    calendarDate.slice(6) + calendarDate.slice(3, 5) + calendarDate.slice(0, 2);
}

///////////// ДОДАТКОВІ ФУНКЦІЇ /////////////

function drawMarkup(markupArray) {
  if (page === 1) {
    ///////////// потрібно буде відслідковувати ширину екрану
    ///////////// і рендерити відповідну кількість новин
    getLocation();
    if (markupArray.length < 8)
      newsContainer.insertAdjacentHTML('beforeend', markupArray.join(''));
    else
      newsContainer.insertAdjacentHTML(
        'beforeend',
        markupArray.slice(0, 8).join('')
      );
  } else {
    ///////////!!!!!!!!!! тут потрібно буде прописати логіку для сторінки 2 і далі
    // newsContainer.insertAdjacentHTML('beforeend', markupArray.join(''));
  }
}

function createNewsMarkupArray(newsArray) {
  return newsArray.map(
    ({ title, abstract, section, published_date, url, media, multimedia }) => {
      let image = {
        url: defaultImg,
        caption: 'Default picture',
      };

      if (nytService.newsType === 'mp') {
        if (media.length >= 1) {
          image.url = media[0]['media-metadata'][2].url;
          if (media[0].caption) image.caption = media[0].caption;
        }
      }

      if (nytService.newsType === 'cat') {
        if (multimedia) {
          const sortedMultimedia = [...multimedia].sort(
            (a, b) => b.width - a.width
          );
          image = sortedMultimedia[0];
        }
      }

      return alreadyFavorite(
        image.url,
        image.caption,
        section,
        iconSprite,
        title,
        abstract,
        url,
        published_date
      );
    }
  );
}

function createSearchMarkupArray(newsArray) {
  return (markup = newsArray.map(
    ({
      abstract,
      snippet,
      headline,
      pub_date,
      web_url,
      section_name,
      multimedia,
    }) => {
      let imageUrl = defaultImg;

      if (multimedia || multimedia.length >= 1) {
        const suitableImg = multimedia.find(el => el.height >= 395);
        if (suitableImg)
          imageUrl = 'https://static01.nyt.com/' + suitableImg.url;
      }

      const imageAlt = snippet ? snippet : 'Default news picture';

      return alreadyFavorite(
        imageUrl,
        imageAlt,
        section_name,
        iconSprite,
        headline.main,
        abstract,
        web_url,
        pub_date
      );
    }
  ));
}

function clearNewsMarkup() {
  noNewsContainer.innerHTML = '';
  newsContainer.innerHTML = '';
}