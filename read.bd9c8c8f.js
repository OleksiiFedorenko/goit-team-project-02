var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},c={},d=e.parcelRequired7c6;null==d&&((d=function(e){if(e in o)return o[e].exports;if(e in c){var d=c[e];delete c[e];var a={id:e,exports:{}};return o[e]=a,d.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){c[e]=o},e.parcelRequired7c6=d),d("bUb57"),d("i6owy"),d("i6owy");((e,o=!0)=>{const c=(e||document).querySelectorAll(".accordion-card");if(c.length){const d=e=>({head:e.querySelector(".accordion-card__head"),body:e.querySelector(".accordion-card__body")}),a=(e,o)=>{e.classList.remove("accordion-card__head--active"),o.classList.remove("accordion-card__body--active"),o.style.height=0},r=(e,o)=>{e.classList.add("accordion-card__head--active"),o.classList.add("accordion-card__body--active"),o.style.height=o.scrollHeight+"px"},i=()=>{c.forEach((e=>{const{head:o,body:c}=d(e);a(o,c)}))};c.forEach((c=>{const{head:t,body:n}=d(c),s=()=>{const c=t.classList.contains("accordion-card__head--active");e&&!1===o&&i(),c?a(t,n):r(t,n)};s(),t.addEventListener("click",s)}))}})(),d("9tydV");
//# sourceMappingURL=read.bd9c8c8f.js.map
