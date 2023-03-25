
    const addFavoriteBtn = document.querySelector('.news__list');
    
    addFavoriteBtn.addEventListener('click', onFavoriteBtnClick);

function onFavoriteBtnClick(e) {
    if (!e.target.classList.contains('target')) {
     return;
    }

    console.log(e.target);

    switch (e.target.nodeName) {
        case 'BUTTON':
            addClassToFavoriteBtn(e.target);
        break;

        case 'SPAN':
            addClassToFavoriteBtn(e.target.parentNode);
        break;
        
        default:
            addClassToFavoriteBtn(e.target.parentNode);
        break;
    }
}

function addClassToFavoriteBtn(name) {
  if (name.classList.contains('article__btn-favorite')) {
    name.classList.remove('article__btn-favorite');
    name.firstElementChild.textContent = 'Add to favorite';
  } else {
      name.classList.add('article__btn-favorite');
      name.firstElementChild.textContent = 'Remove from favorite';
  }
}