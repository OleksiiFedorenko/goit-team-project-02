import iconSprite from '../images/icons.svg';
import { save, load } from './ls-service';

const STORAGE_KEY = 'favoriteNews';

const favoriteEl = document.querySelector('.favorite__list');

const savedFavorites = load(STORAGE_KEY);

appendArticles();

function appendArticles(articles) {
  favoriteEl.insertAdjacentHTML('beforeend', makeNewsGallery(articles));
}

function makeNewsGallery() {
  return savedFavorites.map(articleMarkup).join('');
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
