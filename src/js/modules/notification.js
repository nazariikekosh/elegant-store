document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const notification = document.getElementById('notification');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Показати сповіщення
      notification.classList.add('show');

      // Сховати сповіщення через 2 секунди
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);
    });
  });
});

export default notification;
