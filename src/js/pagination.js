// import NytService from "./nyt-api";

// const api = new NytService();

// api.setPage(0);

const pagination = document.getElementById('pagination');
const isAPIPagination = pagination.dataset.apiPagination === 'true';
const content = document.querySelector('#content');
let itemsPerPage = 9;
// isAPIPagination ? 10 : 8;

let currentPage = 1;

async function showPage(page) {
  if (isAPIPagination) {
    // api.setPage(page);

    // тест (на проді усунути)
    // тут треба подати те, що вписали в інпут пошуку
    // api.query = "Ukraine";

    const responseData = await api.fetchByQuery();
    let pages = Math.ceil(responseData.meta.hits / itemsPerPage);
    if (pages > 100) pages = 100;
    // api.setTotalPages(pages);
    console.log(responseData, pages);
    // тут треба вірендерити картки на основі данних responseData
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
    ? /* api.getTotalPages()*/ null
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
        await showPage(currentPage);
        updatePagination();
      }
    });
  });
}

export async function startPagination() {
  currentPage = 1;
  await showPage(currentPage);

  updatePagination();
}
