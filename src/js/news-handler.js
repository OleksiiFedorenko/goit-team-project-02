import NytService from './nyt-api';
import { checkPresentArticleInLS, onNewsListClick } from './read-news';
import alreadyFavorite from './favorite-add-btn';
import { getLocation } from './weather';

import defaultImg from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';

// цей спосіб під питанням, скоріше за все не потрібно.
// контейнер для зберігання новин.
// буде використовуватись для пагінації на нашій стороні
// а також для адаптації під різні ширини екрану
// const news = [];

// сторінка для пагінації (можливо)
let page = 1;

// контейнер для новин і слухач подій на ньому
const newsContainer = document.querySelector('.news__list');
newsContainer.addEventListener('click', onNewsListClick);

// екземпляр класу для роботи з апі новин
const nytService = new NytService();

///////////// РОЗДІЛ ПОПУЛЯРНИХ НОВИН (ЗАВАНТАЖУЄТЬСЯ ЗА ЗАМОВЧУВАННЯМ) /////////////

createStartNews();

/// функція для завантаження стартових новин

async function createStartNews() {
  newsContainer.innerHTML = '';

  const newsArray = await nytService.fetchMostPopular();
  let imageUrl = defaultImg;
  let imageCaption = 'Default picture';

  const markupArray = newsArray.map(e => {
    const { abstract, title, published_date, url, section, media } = e;

    if (media.length >= 1) {
      media.map(e => {
        imageUrl = e['media-metadata'][2].url;
        if (e.caption) imageCaption = e.caption;
      });
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
