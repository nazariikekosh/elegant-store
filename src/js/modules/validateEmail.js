// Функція для перевірки формату email
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проста регулярка для перевірки email
  return emailPattern.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const errorMessage = document.getElementById('errorMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо стандартну поведінку форми

    const email = emailInput.value.trim();
    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
      // Якщо email правильний
      errorMessage.style.display = 'none';
      emailInput.classList.remove('error');
      alert('You have successfully subscribed!');
      emailInput.value = ''; // Очистити поле
    } else {
      // Якщо email некоректний
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('error');
    }
  });
});

// Експорт функції, якщо це потрібно
export default validateEmail;
