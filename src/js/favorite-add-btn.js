
const newsList = document.querySelector('.news__list');

newsList.addEventListener('click', onFavoriteBtnClick);
const STORAGE_KEY = 'favoriteNews';
let idFavoriteCard = 0;
const favoriteNewsData = {};

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
        idFavoriteCard += 1;
        addItemToLocalStorage(name, idFavoriteCard);
    }
}
    
function addItemToLocalStorage(name, id) {
    try {
        favoriteNewsData[id] = {
            articleHeader: name.parentNode.nextElementSibling.firstElementChild.firstElementChild.textContent,
            imgSrc: name.parentNode.firstElementChild.src,
            imgAlt: name.parentNode.firstElementChild.alt,
            description: name.parentNode.nextElementSibling.firstElementChild.nextElementSibling.textContent,
            date: name.parentNode.nextElementSibling.lastElementChild.firstElementChild.textContent,
            linkReadMore: name.parentNode.nextElementSibling.lastElementChild.lastElementChild.href,
        }

        const serializedState = JSON.stringify(favoriteNewsData);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
    console.error("Set state error: ", error.message);
    }
}
