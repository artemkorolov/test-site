/*
  Файл: js/main.js
  Призначення: поведінка сторінки (без бібліотек)
  - крапки під картками асистентів: яка картка зараз перед очима
  - «Обрати» на картці → назва асистента з'являється у формі, сторінка плавно переходить до телефону
  - «Отримати асистента» → перевірка вибору й номера, показ «Дякуємо!» (поки без відправки — макет)
  Статус: макет
*/

const list = document.getElementById('plans-list');
const dots = document.querySelectorAll('#plans-dots span');
const form = document.getElementById('form');
const chosen = document.getElementById('chosen');
const phone = document.getElementById('phone');
const thanks = document.getElementById('thanks');

// Крапки: підсвічуємо картку, яка зараз по центру
list.addEventListener('scroll', () => {
  const mid = list.scrollLeft + list.clientWidth / 2;
  let best = 0, min = Infinity;
  [...list.children].forEach((card, i) => {
    const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
    if (d < min) { min = d; best = i; }
  });
  dots.forEach((dot, i) => dot.classList.toggle('on', i === best));
}, { passive: true });

// «Обрати» → показати назву у формі й перейти до неї (без клавіатури)
document.querySelectorAll('input[name="plan"]').forEach((radio) =>
  radio.addEventListener('change', () => {
    chosen.textContent = radio.dataset.name;
    chosen.classList.replace('text-ink', 'text-green');
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));

// «Отримати асистента»
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!document.querySelector('input[name="plan"]:checked')) {
    list.scrollIntoView({ behavior: 'smooth', block: 'center' });   // спершу оберіть асистента
    return;
  }
  if (phone.value.replace(/\D/g, '').length < 9) {
    phone.focus();
    return;
  }
  // TODO: тут буде відправка заявки в кабінет (Next.js)
  form.classList.add('hidden');
  thanks.classList.replace('hidden', 'flex');
  thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
});