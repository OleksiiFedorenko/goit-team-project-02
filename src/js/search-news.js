import NytService from './nyt-api';
import defaultImg from '../images/default-images/def-img-desk.png';
import iconSprite from '../images/icons.svg';
import showDefaultImg from './showDefaultImg';

// у нас гумова верстка на мобільних пристроях, тому там може бути потрібне більше зображення
// import imageUrlDesktop from '../images/default-images/def-img-desk.png';
// import imageUrlMobile from '../images/default-images/def-img_mob.png';
// import imageUrlTablet from '../images/default-images/def-img-tabl.png';

// let imageUrlDesktop = imageUrlDesktop;
// let imageUrlMobile = imageUrlMobile;
// let imageUrlTablet = imageUrlTablet;

const nytService = new NytService();

const refs = {
  containerForDefimg: document.querySelector('.container-for-defimg'),
  searchBtn: document.querySelector('.header-form__btn--inner'),
  searchForm: document.querySelector('.header-form '),
  newsList: document.querySelector('.news__list'),
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

async function onSearchFormSubmit(event) {
  event.preventDefault();
  nytService.query = event.currentTarget.elements.query.value.trim();

  if (nytService.query === '') {
    showDefaultImg(); //////////////////////добавив функцію для показу дефолтної картинки
    console.log(
      'потрібно показати відповідний інформативний блок, як показано на макеті'
    );
    clearNewsMarkup();
    return null; // якщо поле вводу пусте
  }

  nytService.resetPage();

  try {
    const data = await nytService.fetchByQuery();

    if (data.meta.hits === 0) {
      refs.newsList.innerHTML = '';
      showDefaultImg(); //////////////////////добавив функцію для показу дефолтної картинки
      console.log(
        'Sorry, there are no news matching your search query. Please try again.'
      );
      return null;
    }

    const news = data.docs;
    // console.log(news);
    refs.containerForDefimg.innerHTML = '';
    clearNewsMarkup();
    appendNewsMarkup(news);
    // У разі успішного відпрацювання запиту,
    //жодна категорія зі списку категорій не повинна бути активною "
  } catch (error) {
    showDefaultImg(); //////////////////////добавив функцію для показу дефолтної картинки
    console.log(error);
  }
}

function appendNewsMarkup(news) {
  const markup = news
    .map(e => {
      const {
        abstract,
        snippet,
        headline: { main: headlineMain },
        pub_date,
        web_url,
        section_name,
        multimedia,
      } = e;
      // Перетворення pub_date у потрібний формат:
      // console.log(multimedia);
      const dateObj = new Date(pub_date);
      const formattedDate = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
      }/${dateObj.getFullYear()}`;

      // console.log(e);
      let scripture = abstract;
      // console.log(scripture.length);
      if (scripture.length > 112) {
        scripture = scripture.slice(0, 112) + '...';
      }

      // пошук зображення з бекенду:

      let imageUrl = defaultImg;

      //нам навпаки часто потрібно більше зображення для мобільної ширини, тому в цьому немає сенсу
      // також не зрозумів чому ти мапаєш весь масив зображень
      //   if (!multimedia || multimedia.length < 1) {
      //     imageUrl = `<picture>
      // <source media="(min-width: 1280px)" srcset="${imageUrlDesktop}">
      // 	<source media="(max-width: 1279px)" srcset="${imageUrlTablet}">
      // 	<source media="(max-width: 767px)" srcset="${imageUrlMobile}">
      // 		<img src="${imageUrlMobile}" alt="default image"/>
      // 		</picture>`;
      //   } else {
      //     multimedia.map(e => {
      //       imageUrl = `<img src="https://static01.nyt.com/${e.url}" alt="${
      //         snippet ? snippet : 'default image'
      //       }/>`;
      //     });
      //   }

      if (multimedia || multimedia.length >= 1) {
        const suitableImg = multimedia.find(e => e.height >= 395);
        if (suitableImg)
          imageUrl = 'https://static01.nyt.com/' + suitableImg.url;
      }

      const imageAlt = snippet ? snippet : 'Default news picture';

      // це потрібно стилізувати глобально, для різної видачі новин, тому закоментував
      // завав фіксовану висоту для article__header, article__subheader:
      // const headerHeight = window.innerWidth >= 768 ? '132px' : '99px';
      // const headerStyles = `height: ${headerHeight}; overflow: hidden;`;
      // const subheaderHeight = window.innerWidth >= 768 ? '66px' : '57px';
      // const subheaderStyles = `height: ${subheaderHeight}; overflow: hidden;`;
      // style="${headerStyles}"
      //style="${subheaderStyles}"

      return `<li class="news__card-item">
    <div class="article">
      <div class="article__image_wrapper">
        <img src="${imageUrl}" alt="${imageAlt}" />
        <div class="article__category-label">${section_name}</div>
        <button class="article__btn" type="button">
          Add to favorite
          <svg class="article__heart-icon" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>
  
      <div class="article__content">
        <h2 class="article__header">${headlineMain}</h2>
        <p class="article__subheader">${scripture}</p>
        <div class="article__footer">
          <p class="article__date">${formattedDate}</p>
          <a
            class="article__readmore-link link-unstyled"
            href="${web_url}"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >Read more</a
          >
        </div>
      </div>
    </div>
  </li>`;
    })
    .join('');

  refs.newsList.insertAdjacentHTML('beforeend', markup);
}

function clearNewsMarkup() {
  refs.newsList.innerHTML = '';
}
