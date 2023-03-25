import NytService from './nyt-api';
import formatDate from './news-date';
import defaultUrl from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';
const containerCard = document.querySelector('.news__list');
createMarkupNews();

async function createMarkupNews() {
  const nytService = new NytService();
  const arrayRespons = await nytService.fetchMostPopular();
  let imageUrl = null;
  let imageCaption = null;
  const htmlMarkup = arrayRespons.map(e => {
    const { abstract, title, published_date, url, section, media } = e;
    let scripture = abstract;
    if (scripture.length > 112) {
      scripture = scripture.slice(0, 112) + '...';
    }
    let reductTitle = title;
    if (reductTitle.length > 50) {
      reductTitle = reductTitle.slice(0, 50) + '...';
    }

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

    return `<li class="news__card-item">
    <div class="article">
      <div class="article__image_wrapper">        
        <img
          src="${imageUrl}"
          alt="${imageCaption}"
        />        
        <div class="article__category-label">${section}</div>
        <button class="article__btn" type="button">
          Add to favorite
          <svg class="article__heart-icon" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>
  
      <div class="article__content">
        <h2 class="article__header">${reductTitle}</h2>
        <p class="article__subheader">${scripture}</p>
        <div class="article__footer">
          <p class="article__date">${formatDate(published_date)}</p>
          <a href="${url}" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
  });
  containerCard.innerHTML = htmlMarkup.join('');
}