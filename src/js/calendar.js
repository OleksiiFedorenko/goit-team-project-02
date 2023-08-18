import CalendarDates from 'calendar-dates';
import NytService from './nyt-service';
import { Notify } from 'notiflix';

const refs = {
  dateBtn: document.querySelector('.date-btn'),
  dateBtnValue: document.querySelector('.date-btn__value'),
  dateWrapper: document.querySelector('.date-container'),

  monthBox: document.querySelector('.calendar-nav__month'),
  monthValueEl: document.querySelector('.calendar-nav__value--month'),
  yearValueEl: document.querySelector('.calendar-nav__value--year'),
  monthPickerBtn: document.querySelector('.calendar-nav__btn--select-month'),
  monthPicker: document.querySelector('.month-picker'),

  dayList: document.querySelector('.day-list'),
  yearIncrement: document.querySelector('.calendar-nav__btn--year-increment'),
  yearDecrement: document.querySelector('.calendar-nav__btn--year-decrement'),
};

// ***** Ініціалізація та константи для роботи віджета: *****

const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const today = new Date();
//* Створюємо стрічку для запиту на бекенд:
const todayCompareValue = `${today.getFullYear()}-${addLeadingZero(
  today.getMonth() + 1
)}-${addLeadingZero(today.getDate())}`;

//* Ініціалізуємо екземпляр з бібліотеки:
const calendarDates = new CalendarDates();

// !!! ---------------------------------- ініт на пошук
const nytService = new NytService();

//* Дефолтні значення при завантаженні:
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let checkedDate;

const decreaseYear = () => (year -= 1);
const increaseYear = () => (year += 1);

refs.dateBtn.addEventListener('click', onDateBtnClick);
refs.yearDecrement.addEventListener('click', onYearDecrementClick);
refs.yearIncrement.addEventListener('click', onYearIncrementClick);
refs.monthBox.addEventListener('click', onMonthPickerBtnClick);
refs.monthPicker.addEventListener('click', onMonthPickerClick);
refs.dayList.addEventListener('click', onDayElClick);

//* При ініціаізації сторінки текстовий контент кнопки відображає плейсхолдер,
//* календар рендериться відносно поточної дати
if (refs.dateBtnValue.textContent === 'Select date') {
  featchDates();
}

// ***** Службові ф-ї та логіка: *****

function featchDates() {
  //* Збираємо новий рядок для формування дати і запиту на бекенд:
  const string = `${addLeadingZero(year)}-${addLeadingZero(
    month
  )}-${addLeadingZero(day)}`;

  if (year === today.getFullYear()) {
    refs.yearIncrement.classList.add('hidden');
  } else {
    refs.yearIncrement.classList.remove('hidden');
  }

  if (year <= 1981) {
    refs.yearDecrement.classList.add('hidden');
  } else {
    refs.yearDecrement.classList.remove('hidden');
  }

  const searchDate = new Date(string);

  calendarDates
    .getDates(searchDate)
    .then(res => {
      res.map(el => {
        renderMarkup(el);
      });

      refs.monthValueEl.textContent = `${monthArr[month - 1]}`;
      refs.yearValueEl.textContent = `${year}`;
    })
    .catch(error => console.log(error));
}

function renderMarkup({ date, iso, type }) {
  let markup = ``;

  if (iso === checkedDate) {
    markup = `<li class="day-list__item day-list__item--selected ${type}" data-value="${iso}">${date}</li>`;
  } else if (iso === todayCompareValue) {
    markup = `<li class="day-list__item day-list__item--current ${type}" data-value="${iso}">${date}</li>`;
  } else if (iso > todayCompareValue || iso < '1981-01-01') {
    markup = `<li class="day-list__item day-list__item--disabled ${type}" data-value="${iso}">${date}</li>`;
  } else {
    markup = `<li class="day-list__item ${type}" data-value="${iso}">${date}</li>`;
  }

  refs.dayList.insertAdjacentHTML('beforeend', markup);
}

function checkMonthPickerVisibility() {
  //* Коли юзер обирає місяць зі списку, обмежуємо йому кліки
  //* на дні тижня в області видимості:
  if (refs.monthPicker.classList.contains('is-active')) {
    refs.dayList.classList.add('disabled');
    return;
  }
  refs.dayList.classList.remove('disabled');
}

function onDayElClick(e) {
  if (e.target.nodeName === 'LI') {
    //* Отримуємо з елементу рядок типу 2023-04-01
    const date = e.target.dataset.value;
    checkedDate = date; //! для порівняння та візуального відображення ----- [{!!!!!!}]
    console.log('Chosen date: ', date);
    //* витягуємо з рядка числові значення року, мясяця і дня:
    const [dateY, dateM, dateD] = date.split('-');
    year = Number(dateY);
    month = Number(dateM);
    day = Number(dateD);

    refs.dayList.innerHTML = '';
    featchDates();
    //* Формат для відображення в інтерфейсі:
    const displayDateValue = date.split('-').reverse().join('/');
    refs.dateBtnValue.textContent = displayDateValue;

    // !!! ----------------------- формат для пошуку в NY API:
    const searchDateValue = date.replaceAll('-', '');
    console.log('for API: ', searchDateValue);

    nytService.date = searchDateValue;

    Notify.info(
      `Please, enter new search query to watch news for ${displayDateValue}...`
    );

    // console.log(nytService.date);
    // nytService.query = 'Ukraine';
    // nytService.fetchByQuery();

    refs.dateWrapper.classList.remove('is-active');
    if (refs.dateWrapper.classList.contains('is-active')) {
      document.querySelector('body').addEventListener('click', onBodyClick);
    } else {
      document.querySelector('body').removeEventListener('click', onBodyClick);
    }
  }
}

function onDateBtnClick() {
  refs.dateWrapper.classList.toggle('is-active');

  if (refs.dateWrapper.classList.contains('is-active')) {
    document.querySelector('body').addEventListener('click', onBodyClick);
  } else {
    document.querySelector('body').removeEventListener('click', onBodyClick);
  }
}

function onBodyClick(e) {
  // * Щоб закрити календар по кліку за межами контейнеру:
  let string = '';

  if (typeof e.target.className === 'object') {
    if (e.target.nodeName === 'use') {
      return;
    }
    string = e.target.className.baseVal;
  } else {
    string = e.target.className;
  }

  if (
    string.includes('date-btn') ||
    string.includes('calendar') ||
    string.includes('month-picker') ||
    string.includes('day-list')
  ) {
    return;
  }
  // console.log('click!');
  refs.dateWrapper.classList.toggle('is-active');
  document.querySelector('body').removeEventListener('click', onBodyClick);
}

function onMonthPickerBtnClick() {
  refs.monthPickerBtn.classList.toggle('is-active');
  refs.monthPicker.classList.toggle('is-active');

  checkMonthPickerVisibility();
}

function onMonthPickerClick(e) {
  //* Делегування події:
  if (e.target.nodeName === 'LI') {
    month = Number(e.target.dataset.month);
    refs.dayList.innerHTML = '';
    featchDates();
  }
}

function onYearIncrementClick() {
  increaseYear();
  refs.dayList.innerHTML = '';
  featchDates();
}

function onYearDecrementClick() {
  decreaseYear();
  console.log('decr click');
  refs.dayList.innerHTML = '';
  featchDates();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
