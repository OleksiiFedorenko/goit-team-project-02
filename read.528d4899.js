!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in r){var n=r[e];delete r[e];var c={id:e,exports:{}};return o[e]=c,n.call(c.exports,c,c.exports),c.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){r[e]=o},e.parcelRequired7c6=n),n("i8Q71"),n("gUYrH"),n("gUYrH");var c="accordion-card__head--active",i="accordion-card__body--active";!function(e){var o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=e||document,n=r.querySelectorAll(".accordion-card");if(n.length){var t=function(e){return{head:e.querySelector(".accordion-card__head"),body:e.querySelector(".accordion-card__body")}},a=function(e,o){e.classList.remove(c),o.classList.remove(i),o.style.height=0},d=function(e,o){e.classList.add(c),o.classList.add(i),o.style.height=o.scrollHeight+"px"},l=function(){n.forEach((function(e){var o=t(e),r=o.head,n=o.body;a(r,n)}))};n.forEach((function(r){var n=t(r),i=n.head,s=n.body,f=function(){var r=i.classList.contains(c);e&&!1===o&&l(),r?a(i,s):d(i,s)};f(),i.addEventListener("click",f)}))}}(),n("6IdhT")}();
//# sourceMappingURL=read.528d4899.js.map
