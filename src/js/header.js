// * ===== Логіка: =====

const refs = {
  toggleBtn: document.querySelector('.toggle-btn'),
  pageBody: document.querySelector('body'),

  burgerBtn: document.querySelector('.burger-btn'),
  burgerMenu: document.querySelector('.burger-menu'),

  showFormBtn: document.querySelector('.header-form__btn--outer'),
  searchInput: document.querySelector('.header-form__field'),
  searchBtn: document.querySelector('.header-form__btn--inner'),
  searchForm: document.querySelector('.header-form '),

  // ! ----------- для вирішення проблеми через костиль в JS:
  dateWrapper: document.querySelector('.date-container'),
  dateBtn: document.querySelector('.date-btn'),
  calendarContainer: document.querySelector('.calendar-container'),
};

initThemeMode();
checkMediaScreen();

refs.toggleBtn.addEventListener('click', onToggleBtnClick);
refs.burgerBtn.addEventListener('click', onBurgerBtnClick);
refs.showFormBtn.addEventListener('click', onShowFormBtnClick);

//* ===== Функції: =====

function checkMediaScreen() {
  //* Перевіряємо ширину екрану, щоб закрити функціонал в межах мобільного медіа:
  const isScreenMobile = window.matchMedia('(max-width: 767px)').matches;

  //* Змінюємо тип кнопки на "сабміт" для НЕ-мобільних екранів
  //* та додаємо слухача події на форму:
  if (!isScreenMobile) {
    // refs.searchForm.classList.add('is-shown');--(через це не приховувалося поле пошуку на моб. версії)
    refs.searchForm.addEventListener('submit', onSearchFormSubmit);
  } else {
    //* для реалізації красивої появи інпуту ці елементи
    //* приховані через opacity та неактивні:
    // refs.searchInput.disabled = true;--(через це не приховувалося поле пошуку на моб. версії)
    refs.searchBtn.disabled = true;
  }

  return isScreenMobile;
}

function initThemeMode() {
  const currentThemeMode = localStorage.getItem('ui-theme');

  console.log('LOCAL STORAGE: UI-theme mode is ', currentThemeMode);

  if (currentThemeMode === 'dark') {
    refs.pageBody.classList.add('dark-mode');
  }
}

function updateThemeMode() {
  const isThemeDark = refs.pageBody.classList.contains('dark-mode');
  //   console.log(isThemeDark);

  if (isThemeDark) {
    console.log('Current UI-theme is dark.');
    localStorage.setItem('ui-theme', 'dark');
  } else {
    console.log('Current UI-theme is light.');
    localStorage.setItem('ui-theme', 'light');
  }
}

function onToggleBtnClick() {
  refs.pageBody.classList.toggle('dark-mode');

  updateThemeMode();
}

function onBurgerBtnClick() {
  const expanded =
    refs.burgerBtn.getAttribute('aria-expanded') === 'true' || false;

  refs.burgerBtn.classList.toggle('is-open');
  refs.burgerBtn.setAttribute('aria-expanded', !expanded);

  refs.burgerMenu.classList.toggle('is-open');

  // ! -----------------   Костиль, щоб вирішити пробему з z-індексами:
  console.log(refs.dateWrapper.classList.contains('is-active'));
  if (refs.dateWrapper.classList.contains('is-active')) {
    refs.dateWrapper.classList.remove('is-active');
  }
  refs.dateBtn.classList.toggle('is-hidden');
  refs.calendarContainer.classList.toggle('is-hidden');
}

function onShowFormBtnClick() {
  //* Функціонал для мобільної версії екрану:
  if (checkMediaScreen()) {
    showSearchForm();

    refs.searchForm.addEventListener('submit', onSearchFormSubmit);
    //* Щоб інпут приховувався при втраті фокусу:
    refs.searchInput.addEventListener('blur', hideSearchForm, { once: true });
  }
}

function onSearchFormSubmit(e) {
  e.preventDefault();
  console.log('Form submit...');

  //* В мобільній версії після сабміту поле інпуту приховується:
  if (checkMediaScreen()) {
    hideSearchForm();
  }

  // todo Подальша логіка сабміту форми...
}

function hideSearchForm() {
  refs.searchForm.classList.remove('is-shown');
  // refs.searchInput.disabled = true;--(через це не приховувалося поле пошуку на моб. версії)
  refs.searchBtn.disabled = true;

  refs.showFormBtn.classList.remove('is-hidden');
  refs.showFormBtn.disabled = false;

  console.log('Search form is hidden...');
}

function showSearchForm() {
  refs.searchForm.classList.add('is-shown');
  refs.searchInput.disabled = false;
  refs.searchBtn.disabled = false;

  refs.showFormBtn.classList.add('is-hidden');
  refs.showFormBtn.disabled = true;

  console.log('Search form is shown...');
}
