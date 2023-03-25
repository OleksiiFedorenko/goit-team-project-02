import defaultUrl from '../images/default-images/def-img-tabl.png';
import iconSprite from '../images/icons.svg';

function getavorites() {
  const savedFavorites = localStorage.getItem('favorite');
  if (savedFavorites) {
    const { abstract, title, published_date, url, section, media } =
      JSON.parse(savedFavorites);
  }
}
