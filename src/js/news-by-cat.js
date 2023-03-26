import NytService from './nyt-api';
import showDefaultImg from './showDefaultImg';

import { createArticleList } from './make-article-list';

const nytService = new NytService();
const filtersDiv = document.querySelector('.filter__list');
const newsSection = document.querySelector('.news__list');
const containerForDefimg = document.querySelector('.container-for-defimg');

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
    newsSection.innerHTML = createArticleList(catNewsArray);
  } catch (error) {
    newsSection.innerHTML = '';
    showDefaultImg();
  }
}