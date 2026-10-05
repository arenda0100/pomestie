// Прелоадер
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 900);
});
// Шапка при прокрутке
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
// Модальное окно
function openModal() {
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
// =====================================
// ОТПРАВКА ЗАЯВКИ В TELEGRAM
// =====================================
const TELEGRAM_BOT_TOKEN = '8049723887:AAHcyIoJcYB9zx4GY8UDnZ3DDWUS2VauY6E';
const TELEGRAM_CHAT_ID = '751833823';
async function sendToTelegram(event) {
  event.preventDefault();
  const name = document.getElementById('tg-name').value.trim();
  const phone = document.getElementById('tg-phone').value.trim();
  const comment = document.getElementById('tg-comment').value.trim();
  const message = `🏡 НОВАЯ ЗАЯВКА С САЙТА ПОНИЗОВЬЕ
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${comment || '—'}`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    });
    if (response.ok) {
      closeModal();
      document.getElementById('tg-name').value = '';
      document.getElementById('tg-phone').value = '';
      document.getElementById('tg-comment').value = '';
      setTimeout(() => {
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение часа.');
      }, 200);
    } else {
      alert('Ошибка отправки. Пожалуйста, позвоните нам: +375 29 719 5981');
    }
  } catch (error) {
    alert('Ошибка соединения. Позвоните нам: +375 29 719 5981');
  }
}
// Анимация появления карточек
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rule, .price-card, .contact').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});