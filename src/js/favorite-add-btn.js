function initAddFavoriteBtn() {
    const addFavoriteBtn = document.querySelector('.article__btn');
    
    addFavoriteBtn.addEventListener('click', onFavoriteBtnClick);
}

function onFavoriteBtnClick(e) {
    if (e.currentTarget.classList.contains('article__btn-favorite')) {
      e.currentTarget.classList.remove('article__btn-favorite');
      e.currentTarget.firstElementChild.textContent = 'Add to favorite';
    } else {
        e.currentTarget.classList.add('article__btn-favorite');
        e.currentTarget.firstElementChild.textContent = 'Remove from favorite';
    }
}