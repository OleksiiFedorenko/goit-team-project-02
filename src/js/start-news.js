import NytService from './nyt-api';
import formatDate from './news-date';
import defaultUrl from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';
import { checkPresentArticleInLS, onNewsListClick } from './read-news'; /////

const containerCard = document.querySelector('.news__list');
// /////////
// createMarkupNews();
/////////////
const newsListRef = document.querySelector('.news__list'); /////////////////////////
newsListRef ? newsListRef.addEventListener('click', onNewsListClick) : null; /////////////////////
containerCard ? createMarkupNews() : null; ////////////////////////////////

async function createMarkupNews() {
  const nytService = new NytService();
  const arrayRespons = await nytService.fetchMostPopular();
  let imageUrl = null;
  let imageCaption = null;
  const htmlMarkup = arrayRespons.map(e => {
    const { abstract, title, published_date, url, section, media } = e;

    if (media.length < 1) {
      imageUrl = defaultUrl;
    } else {
      media.map(e => {
        imageUrl = e['media-metadata'][2].url;
        if (e.caption === '') {
          imageCaption = 'default picture';
        } else {
          imageCaption = e.caption;
        }
      });
    }
    ////////////////////////////////////////////////////////////////////////
    // changed <div class="article"> to div class="article ${checkPresentArticleInLS(url) ? 'read' : ''}"> and target="_blank to article"
    return `<li class="news__card-item">
        <div class="article ${checkPresentArticleInLS(url) ? 'read' : ''}">
      <div class="article__image_wrapper">        
        <img
          src="${imageUrl}"
          alt="${imageCaption}"
        />        
        <div class="article__category-label">${section}</div>
        <button class="article__btn target" type="button">
          <span class="article__btn-text target">Add to favorite</span>
          <svg class="article__heart-icon target" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>
  
      <div class="article__content">
        <h2 class="article__header">${title}</h2>
        <p class="article__subheader">${abstract}</p>
        <div class="article__footer">
          <p class="article__date">${formatDate(published_date)}</p>
          <a href="${url}" target="_blank" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
  });
  containerCard.innerHTML = htmlMarkup.join('');
}
