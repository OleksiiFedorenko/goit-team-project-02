import onLoadReadPage from './read-news';

const COMPONENT_NAME = 'accordion-card';
const COMPONENT_HEAD = COMPONENT_NAME + '__head';
const COMPONENT_BODY = COMPONENT_NAME + '__body';
const ACTIVE_MODIFIER = '--active';
const COMPONENT_HEAD_ACTIVE = COMPONENT_HEAD + ACTIVE_MODIFIER;
const COMPONENT_BODY_ACTIVE = COMPONENT_BODY + ACTIVE_MODIFIER;

export const makeAccordions = (parent, isMultiple = true) => {
  const domParent = parent ? parent : document;
  const accordionCards = domParent.querySelectorAll('.' + COMPONENT_NAME);

  if (accordionCards.length) {
    const getHeadAndBody = card => {
      const head = card.querySelector('.' + COMPONENT_HEAD);
      const body = card.querySelector('.' + COMPONENT_BODY);

      return { head, body };
    };

    const closeCard = (head, body) => {
      head.classList.remove(COMPONENT_HEAD_ACTIVE);
      body.classList.remove(COMPONENT_BODY_ACTIVE);
      body.style.height = 0;
    };

    const openCard = (head, body) => {
      head.classList.add(COMPONENT_HEAD_ACTIVE);
      body.classList.add(COMPONENT_BODY_ACTIVE);
      body.style.height = body.scrollHeight + 'px';
    };

    const closeAllCards = () => {
      accordionCards.forEach(card => {
        const { head, body } = getHeadAndBody(card);
        closeCard(head, body);
      });
    };


    accordionCards.forEach(card => {
      const { head, body } = getHeadAndBody(card);

      const onHeadClick = () => {
        const isOpen = head.classList.contains(COMPONENT_HEAD_ACTIVE);

        if (parent && isMultiple === false) closeAllCards();

        isOpen ? closeCard(head, body) : openCard(head, body);
      };

      // відкрити всі аккордіони за замовчуванням (імітуємо перший клік на аккордіон -> він відкриється, тому що був закритий)
      onHeadClick();

      head.addEventListener('click', onHeadClick);
    });
  }
};

makeAccordions();
