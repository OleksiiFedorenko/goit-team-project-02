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

  const markupArray = startNewsArray.map(e => {
    const { abstract, title, published_date, url, section, media } = e;

    let imageUrl = defaultImg;
    let imageCaption = 'Default picture';

    if (media.length >= 1) {
      imageUrl = media[0]['media-metadata'][2].url;
      if (media[0].caption) imageCaption = media[0].caption;
    }

    return alreadyFavorite(
      imageUrl,
      imageCaption,
      section,
      iconSprite,
      title,
      abstract,
      url,
      published_date
    );
  });

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

    const markupArray = createCatNewsMarkup(catNewsArray);

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

function createCatNewsMarkup(newsArray) {
  return newsArray.map(
    ({ title, abstract, multimedia, section, published_date, url }) => {
      let biggestImg = {
        url: defaultImg,
        caption: 'Default picture',
      };

      if (multimedia) {
        const sortedMultimedia = [...multimedia].sort(
          (a, b) => b.width - a.width
        );
        biggestImg = sortedMultimedia[0];
      }

      return alreadyFavorite(
        biggestImg.url,
        biggestImg.caption,
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
