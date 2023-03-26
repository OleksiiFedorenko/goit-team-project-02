import formatDate from './news-date';

const newsList = document.querySelector('.news__list');

newsList.addEventListener('click', onFavoriteBtnClick);
const STORAGE_KEY = 'favoriteNews';
let favoriteNewsData = [];

if (localStorage.getItem(STORAGE_KEY)) {
  favoriteNewsData = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function onFavoriteBtnClick(e) {
  if (!e.target.classList.contains('target') && e.target.nodeName !== 'use') {
    return;
  }

  const favoriteArticleRef = e.target.closest('.article');

  switch (e.target.nodeName) {
    case 'SPAN':
      addClassToFavoriteBtn(e.target.parentNode, favoriteArticleRef);
      break;

    case 'BUTTON':
      addClassToFavoriteBtn(e.target, favoriteArticleRef);
      break;

    default:
      addClassToFavoriteBtn(e.target.parentNode.parentNode, favoriteArticleRef);
      break;
  }
}

function addClassToFavoriteBtn(name, favoriteArticleRef) {
  if (name.classList.contains('article__btn-favorite')) {
    name.classList.remove('article__btn-favorite');
    name.firstElementChild.textContent = 'Add to favorite';
    removeItemFromLocalStorage(favoriteArticleRef);
  } else {
    name.classList.add('article__btn-favorite');
    name.firstElementChild.textContent = 'Remove from favorite';
    addItemToLocalStorage(favoriteArticleRef);
  }
}

function addItemToLocalStorage(favoriteArticleRef) {
  try {
    const data = {
      articleHeader:
        favoriteArticleRef.querySelector('.article__header').textContent,
      imgSrc: favoriteArticleRef.querySelector('img').src,
      imgAlt: favoriteArticleRef.querySelector('img').alt,
      description: favoriteArticleRef.querySelector('.article__subheader')
        .textContent,
      date: favoriteArticleRef.querySelector('.article__date').textContent,
      linkReadMore: favoriteArticleRef.querySelector('.article__readmore-link')
        .href,
      newsCategory: favoriteArticleRef.querySelector('.article__category-label')
        .textContent,
    };

    for (let i = 0; i < favoriteNewsData.length; i++) {
      if (
        favoriteNewsData[i].linkReadMore ===
        favoriteArticleRef.querySelector('.article__readmore-link').href
      ) {
        return;
      }
    }

    favoriteNewsData.push(data);

    const serializedState = JSON.stringify(favoriteNewsData);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function removeItemFromLocalStorage(favoriteArticleRef) {
  for (let i = 0; i < favoriteNewsData.length; i++) {
    if (
      favoriteNewsData[i].linkReadMore ===
      favoriteArticleRef.querySelector('.article__readmore-link').href
    ) {
      favoriteNewsData.splice(i, 1);
      const serializedState = JSON.stringify(favoriteNewsData);
      localStorage.setItem(STORAGE_KEY, serializedState);
    }
  }
}

export default function alreadyFavorite(
  imageUrl,
  imageCaption,
  section,
  iconSprite,
  title,
  abstract,
  url,
  published_date
) {
  for (let i = 0; i < favoriteNewsData.length; i++) {
    if (favoriteNewsData[i].linkReadMore === url) {
      return `<li class="news__card-item">
       <div class="article">
      <div class="article__image_wrapper">        
        <img
          src="${imageUrl}"
          alt="${imageCaption}"
        />        
        <div class="article__category-label">${section}</div>
        <button class="article__btn target article__btn-favorite" type="button">
          <span class="article__btn-text target">Remove from favorite</span>
          <svg class="article__heart-icon target" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>
  
      <div class="article__content">
        <h2 class="article__header">${title}</h2>
        <p class="article__subheader">${abstract}</p>
        <div class="article__footer">
          <p class="article__date">${formatDate(published_date)}</p>
          <a href="${url}" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
    }
  }

  return `<li class="news__card-item">
    <div class="article">
      <div class="article__image_wrapper">        
        <img
          src="${imageUrl}"
          alt="${imageCaption}"
        />        
        <div class="article__category-label">${section}</div>
        <button class="article__btn target" type="button">
          <span class="article__btn-text target">Add to favorite</span>
          <svg class="article__heart-icon target" width="16" height="16">
            <use href="${iconSprite + '#heart-like'}"></use>
          </svg>
        </button>
      </div>
  
      <div class="article__content">
        <h2 class="article__header">${title}</h2>
        <p class="article__subheader">${abstract}</p>
        <div class="article__footer">
          <p class="article__date">${formatDate(published_date)}</p>
          <a href="${url}" class="article__readmore-link link-unstyled">Read more</a>
        </div>
      </div>
    </div>
  </li>`;
}
