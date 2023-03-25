import NytService from './nyt-api';
import defaultUrl from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';


const nytService = new NytService();

const refs = {
	searchBtn: document.querySelector('.header-form__btn--inner'),
	searchForm: document.querySelector('.header-form '),
	newsList: document.querySelector('.news__list'),
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

async function onSearchFormSubmit(event) {
	event.preventDefault();
	nytService.query = event.currentTarget.elements.query.value.trim();

	if (nytService.query === '') {
		console.log("потрібно показати відповідний інформативний блок, як показано на макеті");
		clearNewsMarkup()
		return null; // якщо поле вводу пусте
	};

	nytService.resetPage();

	try {
		const data = await nytService.fetchByQuery();

		if (data.meta.hits === 0) {
			console.log("Sorry, there are no news matching your search query. Please try again.");
			return null;
		};

		const news = data.docs;
		// console.log(news);
		clearNewsMarkup();
		appendNewsMarkup(news);
		// У разі успішного відпрацювання запиту, 
		//жодна категорія зі списку категорій не повинна бути активною "
	} catch (error) {
		console.log(error)
	};
};

function appendNewsMarkup(news) {

	const markup = news.map(e => {

		const { abstract, snippet, headline: { main: headlineMain }, pub_date, web_url, section_name, multimedia } = e;
		// Перетворення pub_date у потрібний формат:
		// console.log(multimedia);
		const dateObj = new Date(pub_date);
		const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

		// console.log(e);
		let scripture = abstract;
		// console.log(scripture.length);
		if (scripture.length > 112) {
			scripture = scripture.slice(0, 112) + '...';
		};

		// пошук зображення з бекенду:

		let imageUrl = '';

		if (!multimedia || multimedia.length < 1) {
			imageUrl = defaultUrl;
		} else {
			multimedia.map(e => {
				imageUrl = `https://static01.nyt.com/${e.url}`;
			});
		};

		// завав фіксовану висоту для article__header, article__subheader:

		const headerHeight = window.innerWidth >= 768 ? '132px' : '99px';
		const headerStyles = `height: ${headerHeight}; overflow: hidden;`;

		const subheaderHeight = window.innerWidth >= 768 ? '66px' : '57px';
		const subheaderStyles = `height: ${subheaderHeight}; overflow: hidden;`;

		return `<li class="news__card-item">
    <div class="article">
      <div class="article__image_wrapper">
        <img
          src="${imageUrl}"
          alt="${snippet ? snippet : 'default image'}"
        />        
        <div class="article__category-label">${section_name}</div>
        <button class="article__btn" type="button">
          Add to favorite
          <svg class="article__heart-icon" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>
  
      <div class="article__content">
        <h2 class="article__header" style="${headerStyles}">${headlineMain}</h2>
        <p class="article__subheader" style="${subheaderStyles}">${scripture}</p>
        <div class="article__footer">
          <p class="article__date">${formattedDate}</p>
          <a href="${web_url}" target="_blank" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
	}).join("");

	refs.newsList.insertAdjacentHTML('beforeend', markup);
};

function clearNewsMarkup() {
	refs.newsList.innerHTML = "";
};