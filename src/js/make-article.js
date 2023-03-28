import defaultImg from '../images/default-images/def-img-desk.png';
import iconSprite from '../images/icons.svg';
import formatDate from './news-date';

export function createArticle(data) {
  const { title, abstract, multimedia, section, published_date, url } = data;

  let biggestImg = {
    url: defaultImg,
    caption: 'Default news picture',
  };

  if (multimedia) {
    const sortedMultimedia = [...multimedia].sort((a, b) => b.width - a.width);
    biggestImg = sortedMultimedia[0];
  }

  const markup = `
  <div class="article">
    <div class="article__image_wrapper">
      <img src="${biggestImg.url}" alt="${biggestImg.caption}" />
      <div class="article__category-label">${section}</div>
      <button  aria-label="Add Article to Favorite Page" class="article__btn target" type="button">
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
  </div>`;

  return markup;
}
