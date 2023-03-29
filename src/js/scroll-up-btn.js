const scrollToTopBtn = document.querySelector('#scroll-to-top-btn');

window.addEventListener('scroll', function () {
  if (window.scrollY > window.innerHeight / 3) {
    scrollToTopBtn.classList.add('show-btn');
  } else {
    scrollToTopBtn.classList.remove('show-btn');
  }
});

scrollToTopBtn.addEventListener('click', scrollToTop);

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
