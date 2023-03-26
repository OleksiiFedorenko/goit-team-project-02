import NytService from './nyt-api';
import formatDate from './news-date';
import defaultImg from '../images/default-images/def-img-desk.png';
import iconSprite from '../images/icons.svg';
import showDefaultImg from './showDefaultImg';
import { getLocation } from './weather';

const nytService = new NytService();
const filtersDiv = document.querySelector('.filter__list');
const newsSection = document.querySelector('.news__list');
const containerForDefimg = document.querySelector('.no-news');

/////////////
// filtersDiv.addEventListener('click', onClick);
//////////
filtersDiv && newsSection //////////////////////////////////////////
  ? filtersDiv.addEventListener('click', onClick) ///////////////////////////////
  : null; ///////////////////////////////////////

async function onClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.innerHTML;
  if (categoryName === 'Others' || categoryName === 'Categories') return;
  try {
    containerForDefimg.innerHTML = '';
    const catNewsArray = await nytService.fetchByCategory(categoryName);
    // newsSection.innerHTML = createCatNewsMarkup(catNewsArray);
    newsSection.innerHTML = '';
    getLocation();
    newsSection.insertAdjacentHTML(
      'beforeend',
      createCatNewsMarkup(catNewsArray)
    );
  } catch (error) {
    newsSection.innerHTML = '';
    showDefaultImg();
  }
}

function createCatNewsMarkup(newsArray) {
  return newsArray
    .map(({ title, abstract, multimedia, section, published_date, url }) => {
      let biggestImg = {
        url: defaultImg,
        caption: 'Default news picture',
      };

      if (multimedia) {
        const sortedMultimedia = [...multimedia].sort(
          (a, b) => b.width - a.width
        );
        biggestImg = sortedMultimedia[0];
      }

      return `<li class="news__card-item">
          <div class="article">
            <div class="article__image_wrapper">
              <img src="${biggestImg.url}" alt="${biggestImg.caption}" />
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
                <a
                  class="article__readmore-link link-unstyled"
                  href="${url}"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  >Read more</a
                >
              </div>
            </div>
          </div>
        </li>`;
    })
    .join('');
}
