/*
  Файл: js/main.js
  Призначення: поведінка сторінки. Вибір асистента й розгортання картки працюють без скриптів (radio + Tailwind has-checked).
  - після вибору варіанта — плавно показати картку повністю
  - «Отримати асистента»: перевірка, що номер введено, і показ «Дякуємо!» (поки без відправки — макет)
  Статус: макет
*/

// Вибрали варіант → плавно показати розгорнуту картку повністю (без клавіатури)
document.querySelectorAll('input[type="radio"][name="plan"]').forEach((radio) =>
  radio.addEventListener('change', () => {
    radio.closest('.group\\/plan').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));

// «Отримати асистента» → якщо номер є, показати «Дякуємо!»
const thanks = document.getElementById('thanks');
document.querySelectorAll('.order-form').forEach((form) =>
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = form.querySelector('input[name="phone"]');
    if (phone.value.replace(/\D/g, '').length < 9) {
      phone.focus();
      return;
    }
    // TODO: тут буде відправка заявки в кабінет (Next.js)
    document.querySelectorAll('.group\\/plan').forEach((card) => card.classList.add('hidden'));
    document.getElementById('consent').classList.add('hidden');
    thanks.classList.replace('hidden', 'flex');
    thanks.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));