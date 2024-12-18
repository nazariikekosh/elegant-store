const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

const daysElement = document.querySelector('#days');
const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');

function updateTimer() {
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    clearInterval(timerInterval);
    daysElement.innerText = '00';
    hoursElement.innerText = '00';
    minutesElement.innerText = '00';
    secondsElement.innerText = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60); // Виправлено обчислення секунд

  daysElement.innerText = String(days).padStart(2, '0');
  hoursElement.innerText = String(hours).padStart(2, '0');
  minutesElement.innerText = String(minutes).padStart(2, '0');
  secondsElement.innerText = String(seconds).padStart(2, '0');
}

updateTimer(); // Запускаємо одразу, щоб не було затримки
const timerInterval = setInterval(updateTimer, 1000); // Оновлення щосекунди

export default updateTimer;
