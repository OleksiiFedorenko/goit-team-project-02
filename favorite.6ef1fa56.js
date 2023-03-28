function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},r.parcelRequired7c6=a),a.register("kyEFX",(function(t,r){var n,o;e(t.exports,"register",(function(){return n}),(function(e){return n=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var a={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)a[t[r]]=e[t[r]]},o=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),a.register("1mN7I",(function(t,r){e(t.exports,"save",(function(){return n})),e(t.exports,"load",(function(){return o}));const n=(e,t)=>{try{const r=JSON.stringify(t);localStorage.setItem(e,r)}catch(e){console.error("Set state error: ",e.message)}},o=e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}})),a.register("6Mcn1",(function(t,r){e(t.exports,"removeItemFromLocalStorage",(function(){return f})),e(t.exports,"default",(function(){return m}));var n=a("3rNSX"),o=a("i6owy"),s=a("1mN7I");const c=document.querySelector(".news__list"),i=document.querySelector(".read-news__accordions");c&&c.addEventListener("click",u),i&&i.addEventListener("click",u);const l="favoriteNews";let d=[];function u(e){if(!e.target.classList.contains("target")&&"use"!==e.target.nodeName)return;const t=e.target.closest(".article");switch(e.target.nodeName){case"SPAN":g(e.target.parentNode,t);break;case"BUTTON":g(e.target,t);break;default:g(e.target.parentNode.parentNode,t)}}function g(e,t){e.classList.contains("article__btn-favorite")?(e.classList.remove("article__btn-favorite"),e.firstElementChild.textContent="Add to favorite",f(t)):(e.classList.add("article__btn-favorite"),e.firstElementChild.textContent="Remove from favorite",function(e){try{const t={articleHeader:e.querySelector(".article__header").textContent,imgSrc:e.querySelector("img").src,imgAlt:e.querySelector("img").alt,description:e.querySelector(".article__subheader").textContent,date:e.querySelector(".article__date").textContent,linkReadMore:e.querySelector(".article__readmore-link").href,newsCategory:e.querySelector(".article__category-label").textContent};for(let t=0;t<d.length;t++)if(d[t].linkReadMore===e.querySelector(".article__readmore-link").href)return;d.push(t);const r=JSON.stringify(d);localStorage.setItem(l,r)}catch(e){console.error("Set state error: ",e.message)}}(t))}function f(e){for(let t=0;t<d.length;t++)d[t].linkReadMore===e.querySelector(".article__readmore-link").href&&(d.splice(t,1),(0,s.save)(l,d))}function m(e,t,r,a,s,c,i,l){for(let u=0;u<d.length;u++)if(d[u].linkReadMore===i)return`<li class="news__card-item">\n       <div class="article ${(0,o.checkPresentArticleInLS)(i)?"read":""}">\n      <div class="article__image_wrapper">        \n        <img\n          src="${e}"\n          alt="${t}"\n        />        \n        <div class="article__category-label">${r}</div>\n        <button class="article__btn target article__btn-favorite" type="button">\n          <span class="article__btn-text target">Remove from favorite</span>\n          <svg class="article__heart-icon target" width="16" height="16">\n            <use href="${a+"#heart-like"}"></use>\n          </svg>\n        </button>\n      </div>\n  \n      <div class="article__content">\n        <h2 class="article__header">${s}</h2>\n        <p class="article__subheader">${c}</p>\n        <div class="article__footer">\n          <p class="article__date">${(0,n.default)(l)}</p>\n          <a \n            class="article__readmore-link link-unstyled"\n            href="${i}"\n            target="_blank"\n            rel="noopener noreferrer nofollow"\n            >Read more</a\n          >\n        </div>\n      </div>\n    </div>\n  </li>`;return`<li class="news__card-item">\n    <div class="article ${(0,o.checkPresentArticleInLS)(i)?"read":""}">\n      <div class="article__image_wrapper">        \n        <img\n          src="${e}"\n          alt="${t}"\n        />        \n        <div class="article__category-label">${r}</div>\n        <button class="article__btn target" type="button">\n          <span class="article__btn-text target">Add to favorite</span>\n          <svg class="article__heart-icon target" width="16" height="16">\n            <use href="${a+"#heart-like"}"></use>\n          </svg>\n        </button>\n      </div>\n  \n      <div class="article__content">\n        <h2 class="article__header">${s}</h2>\n        <p class="article__subheader">${c}</p>\n        <div class="article__footer">\n          <p class="article__date">${(0,n.default)(l)}</p>\n          <a\n            class="article__readmore-link link-unstyled"\n            href="${i}"\n            target="_blank"\n            rel="noopener noreferrer nofollow"\n            >Read more</a\n          >\n        </div>\n      </div>\n    </div>\n  </li>`}(0,s.load)(l)&&(d=(0,s.load)(l))})),a.register("3rNSX",(function(t,r){function n(e){return new Date(e).toLocaleDateString("en-GB")}e(t.exports,"default",(function(){return n}))})),a.register("i6owy",(function(r,n){e(r.exports,"onNewsListClick",(function(){return f})),e(r.exports,"checkPresentArticleInLS",(function(){return m}));var o=a("3rNSX"),s=a("7uzAG"),c=a("bTWnW"),i=a("33k1D"),l=a("jrD5E"),d=a("6Mcn1"),u=a("3dpqR");const g="read-news";function f(e){if(!e.target.classList.contains("article__readmore-link"))return;const t=e.target.closest(".article");t.classList.add("read");const r=t.querySelector("img").src,n=t.querySelector("img").alt,a=t.querySelector(".article__category-label").textContent,s=t.querySelector(".article__header").textContent,c=t.querySelector(".article__subheader").textContent,i=t.querySelector(".article__date").textContent,l=t.querySelector(".article__readmore-link").href,d=new Date,u={imageUrl:r,imageCaption:n,section:a,reductTitle:s,scripture:c,published_date:i,url:l,readDate:(0,o.default)(d)},f=JSON.parse(localStorage.getItem(g))||[],m=f.find((e=>e.url===u.url));if(m){const e=(new Date).toISOString().slice(0,10);return m.readDate=e,void localStorage.setItem(g,JSON.stringify(f))}const _=[...f,{...u}];localStorage.setItem(g,JSON.stringify(_))}function m(e){return(JSON.parse(localStorage.getItem("read-news"))||[]).find((t=>t.url===e))}const _=document.querySelector(".read-news__accordions"),p=document.querySelector(".read-news__not-found");_&&function(){const e=JSON.parse(localStorage.getItem(g))||!1;if(!e)return void(p.innerHTML=`<p class="read-news__text">There are no read articles to display. Keep exploring!</p><picture>\n    <source srcset="${t(i)}" media="(min-width: 1280px)">\n    <source srcset="${t(c)}" media="(min-width: 768px)">\n    <img src="${t(s)}" alt="default picture" class="read-news__image">\n    </picture>`);const r=[...e].sort(((e,t)=>t.readDate.localeCompare(e.readDate))),n={};for(let e=0;e<r.length;e++){const{published_date:t}=r[e];n[t]||(n[t]=[]),n[t].push({...r[e]})}console.log(n);const o=Object.keys(n),a=Object.values(n);let f="";for(let e=0;e<o.length;e++){const r=o[e],n=`<ul class="read-news__list">${a[e].map((({imageUrl:e,imageCaption:r,section:n,reductTitle:o,scripture:a,published_date:s,url:c})=>(0,d.default)(e,r,n,t(l),o,a,c,s).replace("article read","article"))).join("")}</ul>`;f+=(0,u.makeAccordionCard)({date:r,contentMarkup:n})}_.insertAdjacentHTML("beforeend",f)}()})),a.register("7uzAG",(function(e,t){e.exports=new URL(a("kyEFX").resolve("czupn"),import.meta.url).toString()})),a.register("bTWnW",(function(e,t){e.exports=new URL(a("kyEFX").resolve("6OSkZ"),import.meta.url).toString()})),a.register("33k1D",(function(e,t){e.exports=new URL(a("kyEFX").resolve("1zzYy"),import.meta.url).toString()})),a.register("jrD5E",(function(e,t){e.exports=new URL(a("kyEFX").resolve("8OQ7p"),import.meta.url).toString()})),a.register("3dpqR",(function(t,r){function n(e){const{date:t,contentMarkup:r}=e;return`<div class="accordion-card">\n  <button class="accordion-card__head">${t}\n      <svg viewBox="0 0 32 32" class="accordion-card__icon">\n          <path d="m4.576 22.4-3.509-3.247L16 5.334l14.933 13.819-3.509 3.247L16 11.851 4.576 22.4z" />\n      </svg>\n  </button>\n  <div class="accordion-card__body">\n      <div class="accordion-card__content">${r}</div>\n  </div>\n</div>`}e(t.exports,"makeAccordionCard",(function(){return n}))})),a.register("bUb57",(function(e,t){const r={toggleBtn:document.querySelector(".toggle-btn"),pageBody:document.querySelector("body"),burgerBtn:document.querySelector(".burger-btn"),burgerMenu:document.querySelector(".burger-menu"),showFormBtn:document.querySelector(".header-form__btn--outer"),searchInput:document.querySelector(".header-form__field"),searchBtn:document.querySelector(".header-form__btn--inner"),searchForm:document.querySelector(".header-form "),dateWrapper:document.querySelector(".date-container"),dateBtn:document.querySelector(".date-btn"),calendarContainer:document.querySelector(".calendar-container")};function n(){const e=window.matchMedia("(max-width: 767px)").matches;return e?(r.searchInput.disabled=!0,r.searchBtn.disabled=!0):(r.searchForm.classList.add("is-shown"),r.searchForm.addEventListener("submit",o)),e}function o(e){e.preventDefault(),console.log("Form submit..."),n()&&a()}function a(){r.searchForm.classList.remove("is-shown"),r.searchInput.disabled=!0,r.searchBtn.disabled=!0,r.showFormBtn.classList.remove("is-hidden"),r.showFormBtn.disabled=!1,console.log("Search form is hidden...")}!function(){const e=localStorage.getItem("ui-theme");console.log("LOCAL STORAGE: UI-theme mode is ",e),"dark"===e&&r.pageBody.classList.add("dark-mode")}(),n(),r.toggleBtn.addEventListener("click",(function(){r.pageBody.classList.toggle("dark-mode"),r.pageBody.classList.contains("dark-mode")?(console.log("Current UI-theme is dark."),localStorage.setItem("ui-theme","dark")):(console.log("Current UI-theme is light."),localStorage.setItem("ui-theme","light"))})),r.burgerBtn.addEventListener("click",(function(){const e="true"===r.burgerBtn.getAttribute("aria-expanded")||!1;r.burgerBtn.classList.toggle("is-open"),r.burgerBtn.setAttribute("aria-expanded",!e),r.burgerMenu.classList.toggle("is-open"),console.log(r.dateWrapper.classList.contains("is-active")),r.dateWrapper.classList.contains("is-active")&&r.dateWrapper.classList.remove("is-active");r.dateBtn.classList.toggle("is-hidden"),r.calendarContainer.classList.toggle("is-hidden")})),r.showFormBtn.addEventListener("click",(function(){n()&&(r.searchForm.classList.add("is-shown"),r.searchInput.disabled=!1,r.searchBtn.disabled=!1,r.showFormBtn.classList.add("is-hidden"),r.showFormBtn.disabled=!0,console.log("Search form is shown..."),r.searchForm.addEventListener("submit",o),r.searchInput.addEventListener("blur",a,{once:!0}))}))})),a.register("9tydV",(function(e,t){const r=document.querySelector("#scroll-to-top-btn");window.addEventListener("scroll",(function(){window.scrollY>window.innerHeight/3?r.classList.add("show-btn"):r.classList.remove("show-btn")})),r.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}))})),a("kyEFX").register(JSON.parse('{"8pSep":"favorite.6ef1fa56.js","czupn":"def-img_mob.58218a7d.png","6OSkZ":"def-img-tabl.c64e72d1.png","1zzYy":"def-img-desk.4023487f.png","8OQ7p":"icons.c9d529e8.svg"}'));
//# sourceMappingURL=favorite.6ef1fa56.js.map
