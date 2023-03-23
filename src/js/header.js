// * ===== Логіка: =====

const refs = {
  toggleBtn: document.querySelector('.toggle-btn'),
  pageBody: document.querySelector('body'),

  burgerBtn: document.querySelector('.burger-btn'),
  burgerMenu: document.querySelector('.burger-menu'),

  searchBtn: document.querySelector('.header-form__btn'),
  searchInput: document.querySelector('.header-form__field'),
  searchForm: document.querySelector('.header-form '),
};

initThemeMode();
checkMediaScreen();

refs.toggleBtn.addEventListener('click', onToggleBtnClick);
refs.burgerBtn.addEventListener('click', onBurgerBtnClick);
refs.searchBtn.addEventListener('click', onSearchBtnClick);

//* ===== Функції: =====

function checkMediaScreen() {
  //* Перевіряємо ширину екрану, щоб закрити функціонал в межах мобільного медіа:
  const isScreenMobile = window.matchMedia('(max-width: 767px)').matches;

  //* Змінюємо тип кнопки на "сабміт" для НЕ-мобільних екранів
  //* та додаємо слухача події на форму:
  if (!isScreenMobile) {
    refs.searchBtn.setAttribute('type', 'submit');
    refs.searchForm.addEventListener('submit', onSearchFormSubmit);
  } else {
    //* це для реалізації красивої появи інпуту:
    refs.searchInput.classList.add('visually-hidden');
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
}

function onSearchBtnClick() {
  //* Функціонал для мобільної версії екрану:
  if (checkMediaScreen()) {
    refs.searchInput.classList.remove('visually-hidden');
    refs.searchForm.classList.add('is-shown');
    refs.searchForm.addEventListener('submit', onSearchFormSubmit);
  }
}

function onSearchFormSubmit(e) {
  e.preventDefault();
  console.log('Form submit...');

  //* В мобільній версії після сабміту поле інпуту приховується:
  refs.searchForm.classList.remove('is-shown');

  // todo Подальша логіка сабміту форми...
}
