import iconSprite from '../images/icons.svg';
import { save, load } from './ls-service';
import { removeItemFromLocalStorage } from './favorite-add-btn';
import defaultUrlMob from '../images/default-images/def-img_mob.png';
import defaultUrlTabl from '../images/default-images/def-img-tabl.png';
import defaultUrlDesk from '../images/default-images/def-img-desk.png';

const STORAGE_KEY = 'favoriteNews';

const favoriteEl = document.querySelector('.favorite__list');
const newsNotFoundEl = document.querySelector('.read-news__not-found');

let favoriteNewsData = [];

// if (isNoFavoritesInLS()) {
//   favoriteNewsData = load(STORAGE_KEY);
//   appendArticles();
// }

if (load(STORAGE_KEY)) {
  favoriteNewsData = load(STORAGE_KEY);
  appendArticles();
  else {
    
  }
}

function appendArticles() {
  if (!load(STORAGE_KEY) || favoriteNewsData.length === 0) {
    newsNotFoundEl.insertAdjacentHTML('beforeend', noFavoriteNewsMarkup());
  }
  favoriteEl.insertAdjacentHTML('beforeend', makeNewsGallery());
}

function makeNewsGallery() {
  return favoriteNewsData.map(articleMarkup).join('');
}
function articleMarkup(articles) {
  const {
    articleHeader: title,
    date: published_date,
    imgSrc: imageUrl,
    imgAlt: imageCaption,
    description: scripture,
    linkReadMore: url,
    newsCategory: section,
  } = articles;
  return `<li class="news__card-item">
    <div class="article">
      <div class="article__image_wrapper">
        <img
          src="${imageUrl}"
          alt="${imageCaption}"
        />
        <div class="article__category-label">${section}</div>
        <button class="article__btn target article__btn-favorite" type="button">
          <span class="article__btn-text target">Remove from favorite</span>
          <svg class="article__heart-icon target" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>

      <div class="article__content">
        <h2 class="article__header">${title}</h2>
        <p class="article__subheader">${scripture}</p>
        <div class="article__footer">
          <p class="article__date">${published_date}</p>
          <a href="${url}" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
}

favoriteEl.addEventListener('click', onFavoriteBtnClick);

if (load(STORAGE_KEY)) {
  favoriteNewsData = load(STORAGE_KEY);
}

function onFavoriteBtnClick(e) {
  if (!e.target.classList.contains('target') && e.target.nodeName !== 'use') {
    return;
  }
  const favoriteArticleRef = e.target.closest('.article');
  removeItemFromLocalStorage(favoriteArticleRef);
  updateScreen();
}

function updateScreen() {
  favoriteEl.innerHTML = '';
  if (load(STORAGE_KEY)) {
    favoriteNewsData = load(STORAGE_KEY);
    appendArticles();
  }
}

function isNoFavoritesInLS() {
  return !!load(STORAGE_KEY) || favoriteNewsData.length === 0;
}

function noFavoriteNewsMarkup() {
  return `<li><p class="read-news__text">There are no favorites articles to display. Keep exploring!</p><picture>
    <source srcset="${defaultUrlDesk}" media="(min-width: 1280px)">
    <source srcset="${defaultUrlTabl}" media="(min-width: 768px)">
    <img src="${defaultUrlMob}" alt="default picture" class="read-news__image">
    </picture></li>`;
}
