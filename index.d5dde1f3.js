!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},r=e.parcelRequired7c6;null==r&&((r=function(t){if(t in n)return n[t].exports;if(t in a){var e=a[t];delete a[t];var r={id:t,exports:{}};return n[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){a[t]=e},e.parcelRequired7c6=r),r("i8Q71");var i=r("bpxeT"),o=r("2TvXO"),c=r("eoAzJ"),u=document.querySelector(".filter__list"),l=new(0,c.default);function s(){return(s=t(i)(t(o).mark((function e(){var n,a,r,i;return t(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.fetchCategories();case 2:n=t.sent,a=n.map((function(t){return t.display_name})),r=a.slice(1,8).map((function(t,e){return e<6?'<li class="filter__item filter__item--index'.concat(e,'">\n          <button class = "filter__btn" type="button">').concat(t,"</button></li>"):'<li class="filter__item">\n        <button id = "open-sublist-others" class = "filter__btn filter__btn--sublist btn-others" type="button">Others</button>\n        <button id = "open-sublist-categories" class = "filter__btn filter__btn--sublist btn-categories" type="button">Categories</button>\n      <ul class="filter__list--sub visually-hidden"></ul>\n    </li>'})),i=a.slice(1).map((function(t,e){return e<6?'<li class="filter__item--sub filter__item--sub-index'.concat(e,'">\n      <button class="filter__item--sub-btn type="button">').concat(t,"</button>\n    </li>"):'<li class="filter__item--sub">\n    <button class="filter__item--sub-btn type="button">'.concat(t,"</button>\n    </li>")})),u.innerHTML=r.join(""),document.querySelector(".filter__list--sub").insertAdjacentHTML("beforeend",i.join(""));case 9:case"end":return t.stop()}}),e)})))).apply(this,arguments)}u&&function(){s.apply(this,arguments)}(),document.addEventListener("click",(function(t){var e=document.querySelector(".filter__list--sub"),n=document.querySelector("#open-sublist-others"),a=document.querySelector("#open-sublist-categories");"open-sublist-others"===t.target.id?(e.classList.toggle("visually-hidden"),n.classList.toggle("open")):"open-sublist-categories"===t.target.id?(e.classList.toggle("visually-hidden"),a.classList.toggle("open")):e.classList.contains("visually-hidden")||(e.classList.toggle("visually-hidden"),n.classList.remove("open"),a.classList.remove("open"))}));var d;function f(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var m=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"0";return t<10?e+t:t},y=function(t){return"".concat(t.getFullYear(),"-").concat(m(t.getMonth()+1),"-").concat(m(t.getDate()))},p=function(t){return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()},v=function(t){return new Promise((function(e){var n=[],a=_(t).map((function(t){return{date:t.date,iso:t.iso,type:"previous"}})),r=g(t).map((function(t){return{date:t.date,iso:t.iso,type:"current"}}));n=n.concat(a).concat(r);var i=h(t,n.length).map((function(t){return{date:t.date,iso:t.iso,type:"next"}}));e(n.concat(i))}))},b=function(t){return function(e){return Array(t).fill().map(e)}},g=function(t){var e=p(t);return b(e)((function(e,n){var a=n+1;return t.setDate(a),{date:a,iso:y(t)}}))},_=function(t){var e,n,a=t.getMonth(),r=t.getFullYear(),i=Math.min(a-1,11),o=new Date(r,i),c=p(o),u=c-(e=t,n=new Date(e.getFullYear(),e.getMonth(),1).toDateString().substring(0,3),["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(n))+1;return b(c-u+1)((function(t,e){var n=u+e;return o.setDate(n),{date:n,iso:y(o)}}))},h=function(t,e){var n=42-e,a=t.getMonth()+1===12?0:t.getMonth()+1,r=0===a?t.getFullYear()+1:t.getFullYear(),i=new Date(r,a);return b(n)((function(t,e){var n=e+1;return i.setDate(n),{date:n,iso:y(i)}}))};d=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n;return n=[{key:"getDates",value:function(t){return new Promise((function(e){return e(v(t).then((function(t){return t.map((function(t){return t}))})))}))}},{key:"getMatrix",value:function(t){return new Promise((function(e){e(v(t).then((function(t){return t.reduce((function(t,e,n){return(n%7==0?t.push([e]):t[t.length-1].push(e))&&t}),[])})))}))}}],f((e=t).prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();c=r("eoAzJ");var L={dateBtn:document.querySelector(".date-btn"),dateBtnValue:document.querySelector(".date-btn__value"),dateWrapper:document.querySelector(".date-container"),monthBox:document.querySelector(".calendar-nav__month"),monthValueEl:document.querySelector(".calendar-nav__value--month"),yearValueEl:document.querySelector(".calendar-nav__value--year"),monthPickerBtn:document.querySelector(".calendar-nav__btn--select-month"),monthPicker:document.querySelector(".month-picker"),dayList:document.querySelector(".day-list"),yearIncrement:document.querySelector(".calendar-nav__btn--year-increment"),yearDecrement:document.querySelector(".calendar-nav__btn--year-decrement")},w=["January","February","March","April","May","June","July","August","September","October","November","December"],S=new Date,M="".concat(S.getFullYear(),"-").concat(I(S.getMonth()+1),"-").concat(I(S.getDate())),D=new(t(d)),x=new(0,c.default),q=S.getFullYear(),k=S.getMonth()+1,T=S.getDate();function E(t){var e=t.isInit,n="".concat(I(q),"-").concat(I(k),"-").concat(I(T)),a=new Date(n);D.getDates(a).then((function(t){if(t.map((function(t,e){t.date,t.iso,t.type;!function(t,e){var n=t.date,a=t.iso,r=t.type,i="";i=a===e?'<li class="day-list__item day-list__item--selected '.concat(r,'" data-value="').concat(a,'">').concat(n,"</li>"):a===M?'<li class="day-list__item day-list__item--current '.concat(r,'" data-value="').concat(a,'">').concat(n,"</li>"):'<li class="day-list__item '.concat(r,'" data-value="').concat(a,'">').concat(n,"</li>");L.dayList.insertAdjacentHTML("beforeend",i)}(t,n)})),L.monthValueEl.textContent="".concat(w[k-1]),L.yearValueEl.textContent="".concat(q),!e){var a="".concat(I(T),"/").concat(I(k),"/").concat(q);L.dateBtnValue.textContent=a;var r="".concat(n.replaceAll("-",""));x.date=r}})).catch((function(t){return console.log(t)}))}function I(t){return String(t).padStart(2,"0")}L.dateBtn.addEventListener("click",(function(){L.dateWrapper.classList.toggle("is-active")})),L.yearDecrement.addEventListener("click",(function(){q-=1,L.dayList.innerHTML="",E({isInit:!1})})),L.yearIncrement.addEventListener("click",(function(){q+=1,L.dayList.innerHTML="",E({isInit:!1})})),L.monthBox.addEventListener("click",(function(){L.monthPickerBtn.classList.toggle("is-active"),L.monthPicker.classList.toggle("is-active"),function(){if(L.monthPicker.classList.contains("is-active"))return void L.dayList.classList.add("disabled");L.dayList.classList.remove("disabled")}()})),L.monthPicker.addEventListener("click",(function(t){"LI"===t.target.nodeName&&(k=Number(t.target.dataset.month),L.dayList.innerHTML="",E({isInit:!1}))})),L.dayList.addEventListener("click",(function(t){if("LI"===t.target.nodeName){var e=t.target.dataset.value;q=Number(e.slice(0,4)),k=Number(e.slice(5,7)),T=Number(e.slice(8,10)),L.dayList.innerHTML="",E({isInit:!1}),L.dateWrapper.classList.remove("is-active")}})),"Select date"===L.dateBtnValue.textContent&&E({isInit:!0}),r("fMavV"),r("dQo6y"),r("6IdhT");i=r("bpxeT"),o=r("2TvXO");var P=document.getElementById("pagination");P.dataset.apiPagination,document.querySelector("#content")}();
//# sourceMappingURL=index.d5dde1f3.js.map
