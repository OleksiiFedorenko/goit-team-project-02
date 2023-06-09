import throttle from 'lodash.throttle';
import { nytService, createSearchMarkupArray } from './news-handler';
import { renderForecast } from './weather-handler';
import { scrollToTop } from './scroll-up-btn';
import showDefaultImg from './show-default-image';

const pagination = document.getElementById('pagination');
const newsContainer = document.querySelector('.news__list');
const content = document.querySelector('#content');

let isAPIPagination = false;
let itemsPerPage = 9;
let currentPage = 1;

async function showPage(page) {
  if (isAPIPagination) {
    nytService.setPage(page - 1);

    // робимо запит на апі і стягуємо дані
    const responseData = await nytService.fetchByQuery();
    if (!responseData.meta.hits) return showDefaultImg();

    // вираховуємо кількість сторінок і записуємо
    let pages = Math.ceil(responseData.meta.hits / itemsPerPage);
    if (pages > 100) pages = 100;
    nytService.setTotalPages(pages);

    // тут треба вірендерити картки на основі данних responseData
    const markupArray = createSearchMarkupArray(responseData.docs);

    /// Якщо сторінка 2 і більше, погоду рендерити не потрібно
    if (currentPage > 1)
      return (newsContainer.innerHTML = markupArray
        .slice(0, itemsPerPage)
        .join(''));
    /// Якщо сторінка 1 - потрібно рендерити погоду
    const forecastMarkup = await renderForecast();
    newsContainer.innerHTML = forecastMarkup;
    newsContainer.insertAdjacentHTML(
      'beforeend',
      markupArray.slice(0, itemsPerPage - 1).join('')
    );
  } else {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (let i = 0; i < content.children.length; i++) {
      const child = content.children[i];
      if (i >= startIndex && i < endIndex) {
        child.style.display = 'block';
      } else {
        child.style.display = 'none';
      }
    }
  }
}

function updatePagination() {
  let pagesHtml = '';

  const totalPages = isAPIPagination
    ? nytService.getTotalPages()
    : Math.ceil(content.children.length / itemsPerPage);

  if (totalPages >= 3 && currentPage > 2) {
    pagesHtml += `<li><button  aria-label="Open News Articles on Selected Page" class="pagination__btn pagination__btn--number" data-page="1">1</button></li>`;
    if (currentPage > 3) {
      pagesHtml += `<li><button aria-label="Open News Articles on Selected Page" class="pagination__btn pagination__dots">...</button></li>`;
    }
  }

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    if (i === currentPage) {
      pagesHtml += `<li><button aria-label="Open News Articles on Selected Page" class="pagination__btn pagination__btn--number pagination__btn--current">${i}</button></li>`;
    } else {
      pagesHtml += `<li><button aria-label="Open News Articles on Selected Page" class="pagination__btn pagination__btn--number" data-page="${i}">${i}</button></li>`;
    }
  }

  if (totalPages > 3 && currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pagesHtml += `<li><button aria-label="Open News Articles on Selected Page" class="pagination__btn  pagination__dots">...</button></li>`;
    }
    pagesHtml += `<li><button aria-label="Open News Articles on Selected Page" class="pagination__btn pagination__btn--number" data-page="${totalPages}">${totalPages}</button></li>`;
  }

  pagination.innerHTML = `
    <li><button aria-label="Open News Articles on Previous Page" class="pagination__btn pagination__btn-active prev ${
      currentPage === 1 ? 'disabled' : ''
    }" data-page="${currentPage - 1}">
    <svg viewBox="0 0 32 32" class="pagination__icon">
    <path d="m4.576 22.4-3.509-3.247L16 5.334l14.933 13.819-3.509 3.247L16 11.851 4.576 22.4z"/>
        </svg>Prev</button></li>
    ${pagesHtml}
    <li><button aria-label="Open News Articles on Next Page" class="pagination__btn pagination__btn-active next ${
      currentPage === totalPages ? 'disabled' : ''
    }" data-page="${currentPage + 1}">Next
        <svg viewBox="0 0 32 32" class="pagination__icon pagination__icon--first">
        <path d="m4.576 22.4-3.509-3.247L16 5.334l14.933 13.819-3.509 3.247L16 11.851 4.576 22.4z"/>
        </svg></button></li>
  `;

  const pageButtons = document.querySelectorAll('#pagination .pagination__btn');

  pageButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const nextPage = Number(button.dataset.page);
      if (nextPage >= 1 && nextPage <= totalPages) {
        currentPage = nextPage;
        scrollToTop();
        await showPage(currentPage);
        updatePagination();
      }
    });
  });
}

export async function startPagination(paginationType) {
  window.addEventListener('resize', throttle(onResize, 300));
  if (window.screen.width >= 1280) itemsPerPage = 9;
  else if (window.screen.width >= 768) itemsPerPage = 8;
  else itemsPerPage = 5;

  isAPIPagination = paginationType;
  currentPage = nytService.page + 1;

  scrollToTop();
  await showPage(currentPage);

  updatePagination();
}

function onResize() {
  if (window.screen.width >= 1280) {
    if (itemsPerPage === 9) return;
    itemsPerPage = 9;
  } else if (window.screen.width >= 768) {
    if (itemsPerPage === 8) return;
    itemsPerPage = 8;
  } else {
    if (itemsPerPage === 5) return;
    itemsPerPage = 5;
  }

  nytService.page = currentPage - 1;

  startPagination(isAPIPagination);
}
