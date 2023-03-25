import NytService from './nyt-api';
import testImg from '../images/test-image.jpg';
import iconSprite from '../images/icons.svg';

const nytService = new NytService();
const filtersDiv = document.querySelector('.filter__list');
const newsSection = document.querySelector('.news__list');

filtersDiv.addEventListener('click', onClick);

async function onClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.innerHTML;
  if (categoryName === 'Others' || categoryName === 'Categories') return;

  const catNewsArray = await nytService.fetchByCategory(categoryName);

  newsSection.innerHTML = createCatNewsMarkup(catNewsArray);
}

function createCatNewsMarkup(newsArray) {
  return newsArray
    .map(({ title, abstract, multimedia, section, published_date, url }) => {
      let biggestImg = {
        url: testImg,
        caption: 'No news picture',
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
              <button class="article__btn" type="button">
                Add to favorite
                <svg class="article__heart-icon" width="16" height="16">
                  <use href="${iconSprite + '#heart-like'}"></use>
                </svg>
              </button>
            </div>

            <div class="article__content">
              <h2 class="article__header">${title}</h2>
              <p class="article__subheader">${abstract}</p>
              <div class="article__footer">
                <p class="article__date">${published_date}</p>
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