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

  switch (e.target.nodeName) {
    case 'SPAN':
      addClassToFavoriteBtn(e.target.parentNode);
      break;

    case 'BUTTON':
      addClassToFavoriteBtn(e.target);
      break;

    default:
      addClassToFavoriteBtn(e.target.parentNode.parentNode);
      break;
  }
}

function addClassToFavoriteBtn(name) {
  if (name.classList.contains('article__btn-favorite')) {
    name.classList.remove('article__btn-favorite');
    name.firstElementChild.textContent = 'Add to favorite';
    removeItemFromLocalStorage(name);
  } else {
    name.classList.add('article__btn-favorite');
    name.firstElementChild.textContent = 'Remove from favorite';
    addItemToLocalStorage(name);
  }
}

function addItemToLocalStorage(name) {
  try {
    const data = {
      articleHeader:
        name.parentNode.nextElementSibling.firstElementChild.textContent,
      imgSrc: name.parentNode.firstElementChild.src,
      imgAlt: name.parentNode.firstElementChild.alt,
      description:
        name.parentNode.nextElementSibling.firstElementChild.nextElementSibling
          .textContent,
      date: name.parentNode.nextElementSibling.lastElementChild
        .firstElementChild.textContent,
      linkReadMore:
        name.parentNode.nextElementSibling.lastElementChild.lastElementChild
          .href,
      newsCategory:
        name.parentNode.firstElementChild.nextElementSibling.textContent,
    };

    for (let i = 0; i < favoriteNewsData.length; i++) {
      if (
        favoriteNewsData[i].linkReadMore ===
        name.parentNode.nextElementSibling.lastElementChild.lastElementChild
          .href
      ) {
        return;
      }
    }

    favoriteNewsData.push(data);

    console.log(favoriteNewsData);

    const serializedState = JSON.stringify(favoriteNewsData);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function removeItemFromLocalStorage(name) {
  for (let i = 0; i < favoriteNewsData.length; i++) {
    if (
      favoriteNewsData[i].linkReadMore ===
      name.parentNode.nextElementSibling.lastElementChild.lastElementChild.href
    ) {
      favoriteNewsData.splice(i, 1);
      const serializedState = JSON.stringify(favoriteNewsData);
      localStorage.setItem(STORAGE_KEY, serializedState);
    }
  }
}
