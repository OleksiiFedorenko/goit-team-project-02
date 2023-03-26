import { createArticle } from "./make-article"

export function createArticleList(newsArray) {
  return newsArray.map(newsItem => {
    const singleArticleMarkup = createArticle(newsItem);

    return `<li class="news__card-item">${singleArticleMarkup}</li>`;
  });
}