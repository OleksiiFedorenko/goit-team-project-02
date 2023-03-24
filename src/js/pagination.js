const pagination = document.getElementById('pagination');
const content = document.getElementById('content');
const itemsPerPage = 8;
const totalPages = Math.ceil(content.children.length / itemsPerPage);

let currentPage = 1;

function showPage(page) {
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

function updatePagination() {
  let pagesHtml = '';

  if (totalPages >= 3 && currentPage > 2) {
    pagesHtml += `<li><button class="pagination__btn pagination__btn--number" data-page="1">1</button></li>`;
    if (currentPage > 3) {
      pagesHtml += `<li><button class="pagination__btn pagination__dots">...</button></li>`;
    }
  }

  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    if (i === currentPage) {
      pagesHtml += `<li><button class="pagination__btn pagination__btn--number pagination__btn--current">${i}</button></li>`;
    } else {
      pagesHtml += `<li><button class="pagination__btn pagination__btn--number" data-page="${i}">${i}</button></li>`;
    }
  }

  if (totalPages > 3 && currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pagesHtml += `<li><button class="pagination__btn  pagination__dots">...</button></li>`;
    }
    pagesHtml += `<li><button class="pagination__btn pagination__btn--number" data-page="${totalPages}">${totalPages}</button></li>`;
  }

  pagination.innerHTML = `
    <li><button class="pagination__btn pagination__btn-active prev ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">
    <svg viewBox="0 0 32 32" class="pagination__icon">
    <path d="m4.576 22.4-3.509-3.247L16 5.334l14.933 13.819-3.509 3.247L16 11.851 4.576 22.4z"/>
        </svg>Prev</button></li>
    ${pagesHtml}
    <li><button class="pagination__btn pagination__btn-active next ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">Next
        <svg viewBox="0 0 32 32" class="pagination__icon pagination__icon--first">
        <path d="m4.576 22.4-3.509-3.247L16 5.334l14.933 13.819-3.509 3.247L16 11.851 4.576 22.4z"/>
        </svg></button></li>
  `;

  const pageButtons = document.querySelectorAll('#pagination .pagination__btn');

  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextPage = Number(button.dataset.page);
      if (nextPage >= 1 && nextPage <= totalPages) {
        currentPage = nextPage;
        showPage(currentPage);
        updatePagination();
      }
    });
  });
}

showPage(currentPage);

updatePagination();
