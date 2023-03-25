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
      if (index < value2 - 2) {
        return `<li class="filter__item filter__item--index${index}">
          <button class = "filter__btn" type="button">${el}</button></li>`;
      }
      return `<li class="filter__item">
        <button id = "open-sublist-others" class = "filter__btn filter__btn--sublist btn-others" type="button">Others</button>
        <button id = "open-sublist-categories" class = "filter__btn filter__btn--sublist btn-categories" type="button">Categories</button>
      <ul class="filter__list--sub visually-hidden"></ul>
    </li>`;
    });
  const markupSubList = nameCategories.slice(value1).map((el, index) => {
    if (index < 6) {
      return `<li class="filter__item--sub filter__item--sub-index${index}">
      <button class="filter__item--sub-btn type="button">${el}</button>
    </li>`;
    }
    return `<li class="filter__item--sub">
    <button class="filter__item--sub-btn type="button">${el}</button>
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
    creatMarkupFilter(1, 8);
  } else if (mainElementWidth >= 768) {
    creatMarkupFilter(1, 6);
  } else if (mainElementWidth < 768) {
    creatMarkupFilter(1, 2);
  }
}

renderMarkup();

// //створення випадаючого списку
document.addEventListener('click', showSubList);

function showSubList(event) {
  const subListFilter = document.querySelector('.filter__list--sub');
  const btnOthers = document.querySelector('#open-sublist-others');
  const btnCategories = document.querySelector('#open-sublist-categories');

  if (event.target.id === 'open-sublist-others') {
    subListFilter.classList.toggle('visually-hidden');
    btnOthers.classList.toggle('open');
  } else if (event.target.id === 'open-sublist-categories') {
    subListFilter.classList.toggle('visually-hidden');
    btnCategories.classList.toggle('open');
  } else if (!subListFilter.classList.contains('visually-hidden')) {
    subListFilter.classList.toggle('visually-hidden');
    btnOthers.classList.remove('open');
    btnCategories.classList.remove('open');
  }
}
