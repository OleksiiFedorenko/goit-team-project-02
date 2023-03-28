import iconSprite from '../images/icons.svg';
import { save, load } from './ls-service';
import { removeItemFromLocalStorage } from './favorite-add-btn';
import defaultUrlMob from '../images/default-images/def-img_mob.png';
import defaultUrlTabl from '../images/default-images/def-img-tabl.png';
import defaultUrlDesk from '../images/default-images/def-img-desk.png';
import alreadyFavorite from './favorite-add-btn';
import iconSprite from '../images/icons.svg';

const STORAGE_KEY = 'favoriteNews';

const favoriteEl = document.querySelector('.favorite__list');
const newsNotFoundEl = document.querySelector('.read-news__not-found');

let favoriteNewsData = [];

if (load(STORAGE_KEY)) {
  favoriteNewsData = load(STORAGE_KEY);
  if (favoriteNewsData.length === 0) {
    appendDummyMessage();
  }
  appendArticles();
} else {
  appendDummyMessage();
}

function appendArticles() {
  favoriteEl.insertAdjacentHTML('beforeend', makeNewsGallery());
}
function appendDummyMessage() {
  newsNotFoundEl.insertAdjacentHTML('beforeend', noFavoriteNewsMarkup());
}

function makeNewsGallery() {
  return favoriteNewsData.map(articleMarkup).join('');
}
function articleMarkup(articles) {
  const {
    articleHeader,
    date,
    imgSrc,
    imgAlt,
    description,
    linkReadMore,
    newsCategory,
  } = articles;

  return alreadyFavorite(
    imgSrc,
    imgAlt,
    newsCategory,
    iconSprite,
    articleHeader,
    description,
    linkReadMore,
    0,
    date
  );
}

favoriteEl.addEventListener('click', onFavoriteBtnClick);

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
  if (favoriteNewsData.length === 1) {
    appendDummyMessage();
  }
  if (load(STORAGE_KEY)) {
    favoriteNewsData = load(STORAGE_KEY);
    appendArticles();
  }
}

function noFavoriteNewsMarkup() {
  return `<p class="read-news__text">There are no favorite articles to display. Keep exploring!</p><picture>
    <source srcset="${defaultUrlDesk}" media="(min-width: 1280px)">
    <source srcset="${defaultUrlTabl}" media="(min-width: 768px)">
    <img src="${defaultUrlMob}" alt="default picture" class="read-news__image">
    </picture>`;
}
