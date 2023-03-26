import CalendarDates from 'calendar-dates';
import NytService from './nyt-api';

const refs = {
  dateBtn: document.querySelector('.date-btn'),
  dateBtnValue: document.querySelector('.date-btn__value'),
  dateWrapper: document.querySelector('.date-container'),

  monthValueEl: document.querySelector('.calendar-nav__value--month'),
  yearValueEl: document.querySelector('.calendar-nav__value--year'),
  monthPickerBtn: document.querySelector('.calendar-nav__btn--select-month'),
  monthPicker: document.querySelector('.month-picker'),

  dayList: document.querySelector('.days-list'),
  yearIncrement: document.querySelector('.calendar-nav__btn--year-increment'),
  yearDecrement: document.querySelector('.calendar-nav__btn--year-decrement'),
};

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
// console.group('Today info:');
// console.log(today);
// console.log('Year: ', today.getFullYear());
// console.log('Month: ', today.getMonth());
// console.log('Day number: ', today.getDate());
// console.groupEnd();

const todayCompareValue = `${today.getFullYear()}-${addLeadingZero(
  today.getMonth() + 1
)}-${addLeadingZero(today.getDate())}`;
// console.log('todayCompareValue = ', todayCompareValue);

const calendarDates = new CalendarDates();
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
refs.monthPickerBtn.addEventListener('click', onMonthPickerBtnClick);
refs.monthPicker.addEventListener('click', onMonthPickerClick);
refs.dayList.addEventListener('click', onDayElClick);

//* При ініціаізації сторінки текстовий контент кнопки відображає плейсхолдер,
//* календар рендериться відносно поточної дати
if (refs.dateBtnValue.textContent === 'Select date') {
  featchDates({ isInit: true });
  //* isInit: true - ініціалізація, плейсхолдер збережено;
  //* isInit: false - плейсхолдер змінюється значенням дати, обраної юзером
}

function onDayElClick(e) {
  if (e.target.nodeName === 'LI') {
    //* Отримуємо рядок типу 2023-04-01
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

function checkMonthPickerVisibility() {
  if (refs.monthPicker.classList.contains('is-active')) {
    refs.dayList.classList.add('disabled');
    return;
  }
  refs.dayList.classList.remove('disabled');
}

function onMonthPickerClick(e) {
  if (e.target.nodeName === 'LI') {
    month = Number(e.target.dataset.month);
    refs.dayList.innerHTML = '';
    featchDates({ isInit: false });

    refs.monthPickerBtn.classList.toggle('is-active');
    refs.monthPicker.classList.toggle('is-active');
    checkMonthPickerVisibility();
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

function featchDates(params) {
  const { isInit } = params;
  const string = `${addLeadingZero(year)}-${addLeadingZero(
    month
  )}-${addLeadingZero(day)}`;

  const searchDate = new Date(string);
  // console.group('searchDate info:');
  // console.log(searchDate);
  // console.log('Year: ', searchDate.getFullYear());
  // console.log('Month: ', searchDate.getMonth());
  // console.log('Day number: ', searchDate.getDate());
  // console.groupEnd();

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

      if (!isInit) {
        const displayDateValue = `${addLeadingZero(day)}/${addLeadingZero(
          month
        )}/${year}`;
        console.log(string);
        const searchDateValue = `${string.replaceAll('-', '')}`;
        console.log('searchDateValu: ', searchDateValue);
        refs.dateBtnValue.textContent = displayDateValue;
        // nytService.date = Instant.parse(searchDateValue);
        nytService.date = searchDateValue;
        console.log(nytService.date);
        // nytService.query = 'Ukraine';
        // nytService.fetchByQuery();
      }
    })
    .catch(error => console.log(error));
}

function renderMarkup({ date, iso, type }, string) {
  let markup = ``;

  if (iso === string) {
    markup = `<li class="day-item day-item--selected ${type}" data-value="${iso}">${date}</li>`;
  } else if (iso === todayCompareValue) {
    markup = `<li class="day-item day-item--current ${type}" data-value="${iso}">${date}</li>`;
  } else {
    markup = `<li class="day-item ${type}" data-value="${iso}">${date}</li>`;
  }

  refs.dayList.insertAdjacentHTML('beforeend', markup);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// console.log(nytService.date);
// nytService.query = 'Ukraine';
// nytService.fetchByQuery();
