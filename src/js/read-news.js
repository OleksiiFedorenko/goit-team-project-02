import formatDate from './news-date';
import defaultUrlMob from '../images/default-images/def-img_mob.png';
import defaultUrlTabl from '../images/default-images/def-img-tabl.png';
import defaultUrlDesk from '../images/default-images/def-img-desk.png';
import iconSprite from '../images/icons.svg';
import alreadyFavorite from './favorite-add-btn';
const LOCAL_KEY = 'read-news';

import { makeAccordionCard } from './make-accordion-card';

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
  const reductTitle = articleRef.querySelector('.article__header').textContent;
  const scripture = articleRef.querySelector('.article__subheader').textContent;
  const published_date = articleRef.querySelector('.article__date').textContent;
  const url = articleRef.querySelector('.article__readmore-link').href;

  const date = new Date();
  const readDate = formatDate(date);

  const article = {
    imageUrl,
    imageCaption,
    section,
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

//js for read-page
const readNewsAccordionsRef = document.querySelector('.read-news__accordions');
const readNewsNotFoundRef = document.querySelector('.read-news__not-found');

function onLoadReadPage() {
  const dataFromLS = JSON.parse(localStorage.getItem(LOCAL_KEY)) || false;
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

  const dataSplittedByDate = {};
  for (let i = 0; i < sortedDataFromLS.length; i++) {
    const { published_date } = sortedDataFromLS[i];

    // якщо в нас немає елементу в обʼєкті з такою датою, то створюємо його, як массив (обʼєкт має виглядати якось так)

    // const exmpl = {
    //   "10/02/2023": [ тут елементи]
    // }
    // і тд якщо будуть інші дати

    if (!dataSplittedByDate[published_date]) {
      dataSplittedByDate[published_date] = [];
    }

    // зберігаємо елемент по потрібній даті в массив
    dataSplittedByDate[published_date].push({ ...sortedDataFromLS[i] });
  }

  console.log(dataSplittedByDate);

  const dataKeys = Object.keys(dataSplittedByDate);
  const dataValues = Object.values(dataSplittedByDate);

  let markup = '';

  for (let i = 0; i < dataKeys.length; i++) {
    const date = dataKeys[i];
    const elementsArray = dataValues[i];
    const contentElemetsMarkup = elementsArray
      .map(
        ({
          imageUrl,
          imageCaption,
          section,
          reductTitle,
          scripture,
          published_date,
          url,
          // readDate,
        }) =>
          alreadyFavorite(
            imageUrl,
            imageCaption,
            section,
            iconSprite,
            reductTitle,
            scripture,
            url,
            published_date
          ).replace('article read', 'article')
      )
      .join('');

    const contentMarkup = `<ul class="read-news__list">${contentElemetsMarkup}</ul>`;

    const accordionCardMarkup = makeAccordionCard({ date, contentMarkup });

    markup += accordionCardMarkup;
  }

  readNewsAccordionsRef.insertAdjacentHTML('beforeend', markup);
}

if (readNewsAccordionsRef) onLoadReadPage();
