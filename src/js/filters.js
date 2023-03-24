import NytService from './nyt-api';

const listFilter = document.querySelector('.filter__list');

const nytService = new NytService();

async function creatMarkupFilter(value1, value2) {
  const arrayCategories = await nytService.fetchCategories();

  const nameCategories = arrayCategories.map(
    ({ display_name }) => display_name
  );

  const markupFilterBtn = nameCategories
    .slice(value1, value2)
    .map((el, index) => {
      if (index < value2 - 1) {
        return `<li class="filter__item">
          <button class = "filter__btn" type="button">${el}</button></li>`;
      }
      return `<li class="filter__item">
        <button id = "open-sublist" class = "filter__btn filter__btn--sublist" type="button">Others
        </button>
      <ul class="filter__list--sub visually-hidden"></ul>
    </li>`;
    });
  const markupSubList = nameCategories.slice(value2 - 1).map(el => {
    return `<li class="filter__item--sub">
            ${el}
          </li>`;
  });

  listFilter.innerHTML = markupFilterBtn.join('');
  const subListFilter = document.querySelector('.filter__list--sub');
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
  const subListFilter = document.querySelector('.filter__list--sub');
  const btnFilterSub = document.querySelector('.filter__btn--sublist');

  if (event.target.id === 'open-sublist') {
    subListFilter.classList.toggle('visually-hidden');
    btnFilterSub.classList.toggle('open');
  } else if (!subListFilter.classList.contains('visually-hidden')) {
    btnFilterSub.classList.remove('open');
    subListFilter.classList.add('visually-hidden');
  }
}
