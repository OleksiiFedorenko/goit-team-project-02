export function makeAccordionCard(data) {
  const { date, contentMarkup } = data;
  return `<li class="accordion-card">
  <button  aria-label="Unfold Articles Based on Date" class="accordion-card__head">${date}
      <svg viewBox="0 0 32 32" class="accordion-card__icon">
          <path d="m4.576 22.4-3.509-3.247L16 5.334l14.933 13.819-3.509 3.247L16 11.851 4.576 22.4z" />
      </svg>
  </button>
  <div class="accordion-card__body">
      <div class="accordion-card__content">${contentMarkup}</div>
  </div>
</li>`;
}
