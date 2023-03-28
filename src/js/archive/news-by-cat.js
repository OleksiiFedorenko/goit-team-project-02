import NytService from '../nyt-api';
import formatDate from '../news-date';
import defaultImg from '../images/default-images/def-img-desk.png';
import iconSprite from '../images/icons.svg';
import showDefaultImg from '../showDefaultImg';
import { getLocation } from '../weather';

import { createArticleList } from '../make-article-list';
import { startPagination } from '../pagination';

const nytService = new NytService();
const filtersDiv = document.querySelector('.filter__list');
const newsSection = document.querySelector('.news__list');
const containerForDefimg = document.querySelector('.no-news');
const searchForm = document.querySelector('.header-form ');

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
  nytService.category = categoryName;

  try {
    searchForm.reset();
    containerForDefimg.innerHTML = '';
    const catNewsArray = await nytService.fetchByCategory();
    // новини по категорії тепер фетчаться по іншому
    // const catNewsArray = await nytService.fetchByCategory(categoryName);

    // був конфлікт з кодом Віктора, я переніс функцію Олі нижче
    // newsSection.innerHTML = createArticleList(catNewsArray);

    // newsSection.innerHTML = createCatNewsMarkup(catNewsArray);
    newsSection.innerHTML = '';
    getLocation();
    newsSection.insertAdjacentHTML(
      'beforeend',
      createArticleList(catNewsArray)
    );
    startPagination();
  } catch (error) {
    newsSection.innerHTML = '';
    showDefaultImg();
  }
}
