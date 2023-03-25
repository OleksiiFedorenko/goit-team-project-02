import iconSprite from '../images/icons.svg';
import { save, load } from './localStorageService';

const FAVORITES_KEY = 'favotiteNews';

// Код нижче тільки для тестів (запису тестового масиву в localstorage)

function testLocalStorage() {
  const testArticle = [
    {
      articleHeader: 'For Sale: Mansions in Los Angeles at Bargain Prices',
      date: '1985',
      description:
        'With an emphasis on solutions to the environmental crisis, Ecologues creates a much-needed space to debate and educate.',
      imgSrc:
        'https://static01.nyt.com/images/2023/03/24/multimedia/24trump-rhetoric-01-bflw/24trump-rhetoric-01-bflw-mediumThreeByTwo440.jpg',
      imgAlt: 'Some text',
      linkReadMore: '#',
      newsCategory: 'Job research',
    },
    {
      articleHeader:
        'Trump, Escalating Attacks, Raises Specter of Violence if He Is Charged',
      date: '2001',
      description:
        'With an emphasis on solutions to the environmental crisis, Ecologues creates a much-needed space to debate and educate.',
      imgSrc:
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/22DC/production/_129142980_c34727dc9528ad3e21061d4cb12b948471561908178_213_3312_18631000x563.jpg.webp',
      imgAlt: 'Some text',
      linkReadMore: '#',
      newsCategory: 'Job research',
    },
    {
      articleHeader:
        'Expelling Rahul Gandhi From Parliament, Modi Allies Thwart a Top Rival',
      date: '2023',
      description:
        'With an emphasis on solutions to the environmental crisis, Ecologues creates a much-needed space to debate and educate.',
      imgSrc:
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/FCD7/production/_102672746_mediaitem92725505.jpg.webp',
      imgAlt: 'Some text',
      linkReadMore: '#',
      newsCategory: 'Job research',
    },
  ];
  save(FAVORITES_KEY, testArticle);
  // localStorage.setItem(FAVORITES_KEY, JSON.stringify(testArticle));
}
testLocalStorage();

// Код для рендерінгу сторінки favorites

const favoriteEl = document.querySelector('.favorite__list');

const savedFavorites = load(FAVORITES_KEY);

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
        <button class="article__btn" type="button">
          Add to favorite
          <svg class="article__heart-icon" width="16" height="16">
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
