import NytService from './nyt-api';
const listFilter = document.querySelector('.list-filter');

const responsServerData = new NytService();

async function creatMarkupFilter(value1, value2) {
  const arrayCategories = await responsServerData.fetchCategories();

  const nameCategories = arrayCategories.map(
    ({ display_name }) => display_name
  );
  const markupFilterBtn = nameCategories
    .slice(value1, value2)
    .map((el, index) => {
      if (index < value2 - 1) {
        return `<li class="item-filter">
          <button class = "btn-filter" type="button">${el}</button></li>`;
      }
      return `<li class="item-filter">
        <button id = "open-sublist" class = "btn-filter btn-filter__sublist" type="button">Others
        </button>
      <ul class="sub-list-filter is-hiden"></ul>
    </li>`;
    });
  const markupSubList = nameCategories.slice(value2 - 1).map(el => {
    return `<li class="sub-item-filter">
            ${el}
          </li>`;
  });

  listFilter.innerHTML = markupFilterBtn.join('');
  const subListFilter = document.querySelector('.sub-list-filter');
  subListFilter.insertAdjacentHTML('beforeend', markupSubList.join(''));
}
// рендер розмітки фыльтрів в index.html
async function renderMarkup() {
  const minElement = document.documentElement;
  const mainElementWidth = minElement.clientWidth;
  if (mainElementWidth >= 1280) {
    creatMarkupFilter(0, 7);
  } else if (mainElementWidth >= 768) {
    creatMarkupFilter(0, 5);
  } else if (mainElementWidth < 768) {
    creatMarkupFilter(0, 1);
  }
}

renderMarkup();

// //створення випадаючого списку
listFilter.addEventListener('click', showSubList);

function showSubList(event) {
  const subListFilter = document.querySelector('.sub-list-filter');
  const btnFilterSub = document.querySelector('.btn-filter__sublist');

  if (event.target.id === 'open-sublist') {
    subListFilter.classList.toggle('is-hiden');
    btnFilterSub.classList.toggle('open');
  } else if (!subListFilter.classList.contains('is-hiden')) {
    btnFilterSub.classList.remove('open');
    subListFilter.classList.add('is-hiden');
  }
}
