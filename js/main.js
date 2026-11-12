/*
  Файл: js/main.js
  Призначення: невелика поведінка сторінки без бібліотек. Вигляд станів задано класами Tailwind у index.html:
  - бургер-меню: клас .open на #header (group-[.open]:…)
  - «Обрати» на картці асистента → прокрутка до форми з уже обраним варіантом
  - крапки під картками при свайпі: клас .on на активній крапці ([&.on]:…)
  - віджет зв'язку: клас .open на #fab
  Статус: макет
*/

// Бургер-меню на телефоні: відкрити/закрити; після вибору пункту — закрити
const header = document.getElementById('header');
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  burger.setAttribute('aria-expanded', header.classList.toggle('open'));
});
header.querySelectorAll('#mobile-menu a').forEach((a) =>
  a.addEventListener('click', () => {
    header.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

// «Обрати» на картці асистента → форма замовлення з уже обраним варіантом (один клік)
const form = document.getElementById('form');
document.querySelectorAll('[data-plan]').forEach((button) =>
  button.addEventListener('click', () => {
    document.getElementById('p-' + button.dataset.plan).checked = true;
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Коротко підсвітити форму зеленим
    form.animate(
      [{ boxShadow: '0 0 0 4px rgb(31 122 58 / .35)' }, { boxShadow: '0 10px 30px rgb(20 38 27 / .08)' }],
      { duration: 1000 },
    );
    setTimeout(() => document.getElementById('phone').focus({ preventScroll: true }), 600);
  }));

// Поки без відправки: форма лише макет
form.addEventListener('submit', (e) => e.preventDefault());

// Крапки під картками при свайпі (телефон): підсвічуємо картку, яка зараз по центру
const list = document.getElementById('plans-list');
const dots = document.querySelectorAll('#plans-dots span');
list.addEventListener('scroll', () => {
  let best = 0, min = Infinity;
  const mid = list.scrollLeft + list.clientWidth / 2;
  [...list.children].forEach((card, i) => {
    const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
    if (d < min) { min = d; best = i; }
  });
  dots.forEach((dot, i) => dot.classList.toggle('on', i === best));
}, { passive: true });

// Віджет зв'язку в куті: відкрити/закрити список (Viber, Telegram, дзвінок)
const fab = document.getElementById('fab');
document.getElementById('fabBtn').addEventListener('click', (e) => {
  e.currentTarget.setAttribute('aria-expanded', fab.classList.toggle('open'));
});
