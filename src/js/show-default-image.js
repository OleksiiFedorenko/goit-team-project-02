import defImg_mob from '../images/default-images/def-img_mob.png';
import defImg_tabl from '../images/default-images/def-img-tabl.png';
import defaultImg from '../images/default-images/def-img-desk.png';

const newsContainer = document.querySelector('.news__list');
const noNewsContainer = document.querySelector('.no-news');

//функція для рендеру дефолтної картинки якщо якщо немає результатів пошуку
export default function showDefaultImg() {
  if (newsContainer) newsContainer.innerHTML = '';

  const noNewsMarkup = `<h1 class="no-news__title">We haven’t found news from this category</h1>
  <div class="no-news__image-thumb">
<picture>
  <source srcset="${defImg_mob} 1x, ${defImg_mob}@2x" media="(max-width: 320px)"
 />
 <source srcset="${defImg_tabl} 1x, ${defImg_tabl}@2x" media="(max-width: 1199px)"
 />
 <img src="${defaultImg}" alt=""/>
</picture>
</div>`;

  return (noNewsContainer.innerHTML = noNewsMarkup);
}
