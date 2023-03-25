
const newsList = document.querySelector('.news__list');

newsList.addEventListener('click', onFavoriteBtnClick);

function onFavoriteBtnClick(e) {
        if (!e.target.classList.contains('target') && e.target.nodeName !== 'YA-TR-SPAN' && e.target.nodeName !== 'use') {
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
    } else {
        name.classList.add('article__btn-favorite');
        name.firstElementChild.textContent = 'Remove from favorite';
    }
}
    
