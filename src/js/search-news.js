import NytService from './nyt-api';
<<<<<<< Updated upstream

const nytService = new NytService();

refs = {
		searchBtn: document.querySelector('.header-form__btn--inner'),
		searchForm: document.querySelector('.header-form '),
	
		newsList: document.querySelector('.news__list'),
=======
import defaultUrl from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';


const nytService = new NytService();

const refs = {
	searchBtn: document.querySelector('.header-form__btn--inner'),
	searchForm: document.querySelector('.header-form '),
	newsList: document.querySelector('.news__list'),
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
		console.log("Sorry, there are no news matching your search query. Please try again.");
		};

		const news = data.docs;
		console.log(data);
		clearNewsMarkup();
		appendNewsMarkup(news);
// У разі успішного відпрацювання запиту, 
//жодна категорія зі списку категорій не повинна бути активною "
} catch (error) {
console.log(error)
=======
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
>>>>>>> Stashed changes
	};
};

function appendNewsMarkup(news) {
<<<<<<< Updated upstream
	
	const markup = news.map((article) => `<li class="news__card-item">
 	<div class="article">
 		<a class="article__link link-unstyled" href="#">
 			<div class="article__image_wrapper">
 				<picture>
 					<source srcset="./images/dt.jpg, ./images/dt.jpg, 2x" width="395" height="395" />
 					<img src="#" alt="${article.news_desk}" width="395" height="395" />
 				</picture>
 				<div class="article__category-label">${article.section_name}</div>
 				<button class="article__btn" type="button">
 					Add to favorite
 					<svg class="article__heart-icon" width="16" height="16">
 						<use href="./images/icons.svg#heart-like"></use>
 					</svg>
 				</button>
 			</div>

 			<div class="article__content">
 				<h2 class="article__header">${article.headline.main}</h2>
 				<p class="article__subheader">${article.lead_paragraph}</p>
 				<div class="article__footer">
 					<p class="article__date">${article.pub_date}</p>
 					<a href="${article.web_url}" class="article__readmore-link link-unstyled">Read more</a>
 				</div>
 			</div>
 		</a>
 	</div>
 </li>`).join("");
=======

	const markup = news.map(e => {

		const { abstract, headline: { main: headlineMain }, pub_date, web_url, section_name, media } = e;
		console.log(e);
		let scripture = abstract;
		if (scripture.length > 112) {
			scripture = scripture.slice(0, 112) + '...';
		}

		let imageUrl = '';
		let imageCaption = '';
		if (!media || media.length < 1) {
			imageUrl = defaultUrl;
		} else {
			media.map(e => {
				imageUrl = e['media-metadata'][2].url;
				if (e.caption === '') {
					imageCaption = 'default picture';
				} else {
					imageCaption = e.caption;
				}
			});
		}

		return `<li class="news__card-item">
    <div class="article">
      <div class="article__image_wrapper">        
        <img
          src="${imageUrl}"
          alt="${imageCaption}"
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
        <h2 class="article__header">${headlineMain}</h2>
        <p class="article__subheader">${scripture}</p>
        <div class="article__footer">
          <p class="article__date">${pub_date}</p>
          <a href="${web_url}" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
	}).join("");
>>>>>>> Stashed changes

	refs.newsList.insertAdjacentHTML('beforeend', markup);
};

function clearNewsMarkup() {
<<<<<<< Updated upstream
refs.newsList.innerHTML = "";
};

=======
	refs.newsList.innerHTML = "";
};
>>>>>>> Stashed changes
