import NytService from './nyt-api';
import testImg from '../images/test-image.jpg';
import iconSprite from '../images/icons.svg';
const nytService = new NytService();

// nytService.fetchMostPopular();

// nytService.fetchCategories();

// nytService.category = 'Home & Garden';
// nytService.fetchByCategory();

// nytService.query = 'Ukraine';
// nytService.fetchByQuery();

/////    //////    ///////
const newsList = document.querySelector('.news__list');

fetchAndAddArticles();

function articleMarkup(article) {
  const { abstract, lead_paragraph, web_url, pub_date } = article;
  return `<li class="news__card-item">
  <div class="article">
    <div class="article__image_wrapper">        
      <img
        src="${testImg}"
        alt="News article"
      />        
      <div class="article__category-label">News category</div>
      <button class="article__btn target" type="button">
         <span class="article__btn-text target">Add to favorite</span>
        <svg class="article__heart-icon target" width="16" height="16">
          <use href="${iconSprite + '#heart-like'}"></use>
        </svg>
      </button>
    </div>

    <div class="article__content">
      <h2 class="article__header">
        8 tips for passing an online interview that will help you
                    get a job
      </h2>
      <p class="article__subheader">
        Before you start looking for a job, it is useful to
                    familiarize yourself with the job prospects offered by
                    these...
      </p>
      <div class="article__footer">
        <p class="article__date">${pub_date}</p>
        <a href="${web_url}" class="article__readmore-link link-unstyled" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
      </div>
    </div>
  </div>
</li>`;
}
function makeNewsFeed(articles) {
  //console.log(articles);
  return articles.map(articleMarkup).join('');
}
function appendArticles(articles) {
  newsList.insertAdjacentHTML('beforeend', makeNewsFeed(articles));
}

function fetchAndAddArticles() {
  nytService.query = 'Ukraine';
  nytService.fetchByQuery().then(response => {
    appendArticles(({ articles } = response.docs));
  });
}
