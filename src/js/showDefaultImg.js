import defImg_mob from '../images/default-images/def-img_mob.png';
import defImg_tabl from '../images/default-images/def-img-tabl.png';
import defaultImg from '../images/default-images/def-img-desk.png';

//функція для рендеру дефолтної картинки якщо якщо немає результатів пошуку
export default function showDefaultImg() {
  const containerForDefimg = document.querySelector('.container-for-defimg');
  const html = `<h1 class = "noNameTitle">We haven’t found news from this category</h1>
<picture>
  <source srcset="${defImg_mob} 1x, ${defImg_mob}@2x" media="(max-width: 767px)"
 />
 <source srcset="${defImg_tabl} 1x, ${defImg_tabl}@2x" media="(max-width: 1199px)"
 />
 <img src="${defaultImg}" alt=""/>
</picture>`;

  return (containerForDefimg.innerHTML = html);
}
