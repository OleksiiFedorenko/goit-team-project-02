import CalendarDates from 'calendar-dates';
import NytService from './nyt-service';

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

const increaseYear = () => (year += 1);
const decreaseYear = () => (year -= 1);

refs.dateBtn.addEventListener('click', onDateBtnClick);
refs.yearDecrement.addEventListener('click', onYearDecrementClick);
refs.yearIncrement.addEventListener('click', onYearIncrementClick);
refs.monthBox.addEventListener('click', onMonthPickerBtnClick);
refs.monthPicker.addEventListener('click', onMonthPickerClick);
refs.dayList.addEventListener('click', onDayElClick);

//* При ініціаізації сторінки текстовий контент кнопки відображає плейсхолдер,
//* календар рендериться відносно поточної дати
if (refs.dateBtnValue.textContent === 'Select date') {
  featchDates({ isInit: true });
  //* isInit: true - ініціалізація, плейсхолдер збережено;
  //* isInit: false - плейсхолдер змінюється значенням дати, обраної юзером
}

// ***** Службові ф-ї та логіка: *****

function featchDates(params) {
  const { isInit } = params;
  //* Збираємо новий рядок для формування дати і запиту на бекенд:
  const string = `${addLeadingZero(year)}-${addLeadingZero(
    month
  )}-${addLeadingZero(day)}`;

  const searchDate = new Date(string);

  calendarDates
    .getDates(searchDate)
    .then(res => {
      res.map((el, index) => {
        const { date, iso, type } = el;
        // console.group(`${index} element info:`);
        // console.log(iso);
        // console.log(`Date number value: ${date}`);
        // console.log(`Type: ${type}`);
        // console.groupEnd();

        renderMarkup(el, string);
      });

      refs.monthValueEl.textContent = `${monthArr[month - 1]}`;
      refs.yearValueEl.textContent = `${year}`;

      //* Логіка, коли юзер обрав дату в календарі:
      if (!isInit) {
        //* Формат для відображення в інтерфейсі:
        const displayDateValue = `${addLeadingZero(day)}/${addLeadingZero(
          month
        )}/${year}`;
        refs.dateBtnValue.textContent = displayDateValue;

        // !!! ----------------------- формат для пошуку в NY API:
        const searchDateValue = `${string.replaceAll('-', '')}`;
        // console.log('searchDateValu: ', searchDateValue);

        // !!! -------------------- передаємо дату в конструктор API для пошуку
        nytService.date = searchDateValue;
        // console.log(nytService.date);
        // nytService.query = 'Ukraine';
        // nytService.fetchByQuery();
      }
    })
    .catch(error => console.log(error));
}

function renderMarkup({ date, iso, type }, string) {
  let markup = ``;

  if (iso === string) {
    markup = `<li class="day-list__item day-list__item--selected ${type}" data-value="${iso}">${date}</li>`;
  } else if (iso === todayCompareValue) {
    markup = `<li class="day-list__item day-list__item--current ${type}" data-value="${iso}">${date}</li>`;
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
    //* витягуємо з рядка числові значення року, мясяця і дня:
    year = Number(date.slice(0, 4));
    month = Number(date.slice(5, 7));
    day = Number(date.slice(8, 10));

    refs.dayList.innerHTML = '';
    featchDates({ isInit: false });
    refs.dateWrapper.classList.remove('is-active');
  }
}

function onDateBtnClick() {
  refs.dateWrapper.classList.toggle('is-active');
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
    featchDates({ isInit: false });

    // !  ------------ з'явилась бага, закоментував
    // refs.monthPickerBtn.classList.toggle('is-active');
    // refs.monthPicker.classList.toggle('is-active');
  }
}

function onYearIncrementClick() {
  increaseYear();
  refs.dayList.innerHTML = '';
  featchDates({ isInit: false });
}

function onYearDecrementClick() {
  decreaseYear();
  refs.dayList.innerHTML = '';
  featchDates({ isInit: false });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// console.log(nytService.date);
// nytService.query = 'Ukraine';
// nytService.fetchByQuery();
