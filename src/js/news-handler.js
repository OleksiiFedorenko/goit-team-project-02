import NytService from './nyt-api';
import formatDate from './news-date';
import { checkPresentArticleInLS, onNewsListClick } from './read-news';
import alreadyFavorite from './favorite-add-btn';
import { getLocation } from './weather';
import showDefaultImg from './showDefaultImg';

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
const newsContainer = document.querySelector('.news__list');
const categoriesContainer = document.querySelector('.filter__list');
const noNewsContainer = document.querySelector('.no-news');
const searchForm = document.querySelector('.header-form ');

newsContainer.addEventListener('click', onNewsListClick);
categoriesContainer.addEventListener('click', onCategoryClick);

// екземпляр класу для роботи з апі новин
const nytService = new NytService();

///////////// РОЗДІЛ ПОПУЛЯРНИХ НОВИН (ЗАВАНТАЖУЄТЬСЯ ЗА ЗАМОВЧУВАННЯМ) /////////////

createStartNews();

/// функція для завантаження стартових новин

async function createStartNews() {
  newsContainer.innerHTML = '';

  const startNewsArray = await nytService.fetchMostPopular();

  const markupArray = createNewsMarkupArray(startNewsArray);

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

///////////// РОЗДІЛ НОВИН ЗА КАТЕГОРІЄЮ /////////////

async function onCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.innerHTML;
  if (categoryName === 'Others' || categoryName === 'Categories') return;
  nytService.category = categoryName;

  noNewsContainer.innerHTML = '';
  newsContainer.innerHTML = '';
  searchForm.reset();

  try {
    const catNewsArray = await nytService.fetchByCategory(categoryName);

    const markupArray = createNewsMarkupArray(catNewsArray);

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
  } catch (error) {
    newsContainer.innerHTML = '';
    showDefaultImg();
  }
}

///////////// СПІЛЬНІ ФУНКЦІЇ /////////////

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

///////////// РОЗДІЛ НОВИН ЗА ПОШУКОМ /////////////