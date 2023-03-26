import defaultUrlMob from '../images/default-images/def-img_mob.png';
import defaultUrlTabl from '../images/default-images/def-img-tabl.png';
import defaultUrlDesk from '../images/default-images/def-img-desk.png';

const LOCAL_KEY = 'read-news';

//js for local storage
export function onNewsListClick(event) {
  const targetLink = event.target.classList.contains('article__readmore-link');
  if (!targetLink) {
    return;
  }

  const articleRef = event.target.closest('.article');

  articleRef.classList.add('read');

  const imageUrl = articleRef.querySelector('img').src;
  const imageCaption = articleRef.querySelector('img').alt;
  const section = articleRef.querySelector(
    '.article__category-label'
  ).textContent;
  const iconSprite = articleRef.querySelector('use').href.baseVal;
  const reductTitle = articleRef.querySelector('.article__header').textContent;
  const scripture = articleRef.querySelector('.article__subheader').textContent;
  const published_date = articleRef.querySelector('.article__date').textContent;
  const url = articleRef.querySelector('.article__readmore-link').href;

  const date = new Date();
  const readDate = date.toISOString().slice(0, 10);

  const article = {
    imageUrl,
    imageCaption,
    section,
    iconSprite,
    reductTitle,
    scripture,
    published_date,
    url,
    readDate,
  };

  const dataFromLS = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  const presentArticle = dataFromLS.find(el => el.url === article.url);

  if (presentArticle) {
    const date = new Date();
    const readDate = date.toISOString().slice(0, 10);
    presentArticle.readDate = readDate;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(dataFromLS));
    return;
  }

  const newDataToLS = [...dataFromLS, { ...article }];
  localStorage.setItem(LOCAL_KEY, JSON.stringify(newDataToLS));
}

export function checkPresentArticleInLS(url) {
  const LOCAL_KEY = 'read-news';
  const dataFromLS = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  return dataFromLS.find(el => el.url === url);
}

//Adding read news to Read page
const readNewsListRef = document.querySelector('.read-news__list');
const readNewsNotFoundRef = document.querySelector('.read-news__not-found');

function onLoadReadPage() {
  const dataFromLS = JSON.parse(localStorage.getItem(LOCAL_KEY));
  if (!dataFromLS) {
    readNewsNotFoundRef.innerHTML = `<p class="read-news__text">There are no read articles to display. Keep exploring!</p><picture>
    <source srcset="${defaultUrlDesk}" media="(min-width: 1280px)">
    <source srcset="${defaultUrlTabl}" media="(min-width: 768px)">
    <img src="${defaultUrlMob}" alt="default picture" class="read-news__image">
    </picture>`;
    return;
  }
  const sortedDataFromLS = [...dataFromLS].sort((a, b) =>
    b.readDate.localeCompare(a.readDate)
  );

  const markup = sortedDataFromLS
    .map(
      ({
        imageUrl,
        imageCaption,
        section,
        iconSprite,
        reductTitle,
        scripture,
        published_date,
        url,
        readDate,
      }) => `<li class="news__card-item">
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
        <p class="article__date">${published_date}</p>
        <a href="${url}" class="article__readmore-link link-unstyled" target="_blank">Read more</a>
      </div>
    </div>
  </div>
</li>`
    )
    .join('');
  readNewsListRef.innerHTML = markup;
}

readNewsListRef ? onLoadReadPage() : null;
