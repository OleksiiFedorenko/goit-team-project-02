import NytService from './nyt-api';
const nytService = new NytService();

// filterButton.addEventListener('click', onClick);

async function onClick() {
  const catNewsArray = await nytService.fetchByCategory('Home & Garden');
  const catNewsMarkup = catNewsArray
    .map(({ title, abstract, multimedia, section, published_date, url }) => {
      const sortedMultimedia = [...multimedia].sort(
        (a, b) => b.width - a.width
      );
      const biggestImg = sortedMultimedia[0];

      return `<div class="card">
  <img src="${biggestImg.url}" alt="${biggestImg.caption}" class="card__image" />
  <h2 class="card__header">${title}</h2>
  <p class="card__text">${abstract}</p>
  <div class="card__info">
    <span class="card__date">${published_date}</span>
    <a href="${url}" class="card__link">Read more</a>
  </div>
  <span class="card__category">${section}</span>
  <button class="card__favorite" type="button">Add to favorite</button>
</div>`;
    })
    .join('');
}
