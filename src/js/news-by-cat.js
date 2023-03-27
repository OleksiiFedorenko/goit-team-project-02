import NytService from './nyt-api';
import showDefaultImg from './showDefaultImg';

// import { createArticleList } from './make-article-list';

import { getLocation } from './weather';
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

  try {
    searchForm.reset();
    containerForDefimg.innerHTML = '';
    const catNewsArray = await nytService.fetchByCategory(categoryName);

    // newsSection.innerHTML = createArticleList(catNewsArray);

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
