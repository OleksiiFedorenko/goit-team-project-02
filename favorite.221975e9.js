function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a),a("kyEFX").register(JSON.parse('{"kHKil":"favorite.221975e9.js","8OQ7p":"icons.c9d529e8.svg","czupn":"def-img_mob.58218a7d.png","6OSkZ":"def-img-tabl.c64e72d1.png","1zzYy":"def-img-desk.4023487f.png","8pSep":"favorite.6ef1fa56.js"}'));var i;i=new URL(a("kyEFX").resolve("8OQ7p"),import.meta.url).toString();var o,s=a("1mN7I"),l=a("6Mcn1");o=new URL(a("kyEFX").resolve("czupn"),import.meta.url).toString();var c;c=new URL(a("kyEFX").resolve("6OSkZ"),import.meta.url).toString();var d;d=new URL(a("kyEFX").resolve("1zzYy"),import.meta.url).toString();const f=document.querySelector(".favorite__list"),_=document.querySelector(".read-news__not-found");let u=[];function p(){f.insertAdjacentHTML("beforeend",u.map(v).join(""))}function g(){_.insertAdjacentHTML("beforeend",`<p class="read-news__text">There are no favorite articles to display. Keep exploring!</p><picture>\n    <source srcset="${e(d)}" media="(min-width: 1280px)">\n    <source srcset="${e(c)}" media="(min-width: 768px)">\n    <img src="${e(o)}" alt="default picture" class="read-news__image">\n    </picture>`)}function v(t){const{articleHeader:r,date:n,imgSrc:a,imgAlt:o,description:s,linkReadMore:l,newsCategory:c}=t;return`<li class="news__card-item">\n    <div class="article">\n      <div class="article__image_wrapper">\n        <img\n          src="${a}"\n          alt="${o}"\n        />\n        <div class="article__category-label">${c}</div>\n        <button class="article__btn target article__btn-favorite" type="button">\n          <span class="article__btn-text target">Remove from favorite</span>\n          <svg class="article__heart-icon target" width="16" height="16">\n            <use href="${e(i)+"#heart-like"}"></use>\n          </svg>\n        </button>\n      </div>\n\n      <div class="article__content">\n        <h2 class="article__header">${r}</h2>\n        <p class="article__subheader">${s}</p>\n        <div class="article__footer">\n          <p class="article__date">${n}</p>\n          <a href="${l}" class="article__readmore-link link-unstyled">Read more</a>\n        </div>\n      </div>\n    </div>\n  </li>`}(0,s.load)("favoriteNews")?(u=(0,s.load)("favoriteNews"),0===u.length&&g(),p()):g(),f.addEventListener("click",(function(e){if(!e.target.classList.contains("target")&&"use"!==e.target.nodeName)return;const t=e.target.closest(".article");(0,l.removeItemFromLocalStorage)(t),function(){f.innerHTML="",1===u.length&&g();(0,s.load)("favoriteNews")&&(u=(0,s.load)("favoriteNews"),p())}()})),a("bUb57"),a("9tydV");
//# sourceMappingURL=favorite.221975e9.js.map
