// Отримуємо елементи
const cartBtn = document.getElementById("cart-btn"); // Кнопка для відкриття popup
const shoppingPopup = document.getElementById("shoppingPopup"); // Popup елемент
const closePopup = document.getElementById("closePopup"); // Кнопка закриття popup

// Відкрити popup
cartBtn.addEventListener("click", () => {
  shoppingPopup.style.display = "flex"; // Робимо popup видимим
});

// Закрити popup при кліку на кнопку закриття
closePopup.addEventListener("click", () => {
  shoppingPopup.style.display = "none"; // Ховаємо popup
});

// Закрити popup при кліку поза його вмістом
shoppingPopup.addEventListener("click", (event) => {
  // Перевіряємо, чи натиснули саме на фонову область (не на контент)
  if (event.target === shoppingPopup) {
    shoppingPopup.style.display = "none"; // Ховаємо popup
  }
});

// Отримуємо всі кнопки збільшення та зменшення кількості
const incrementButtons = document.querySelectorAll(".increment");
const decrementButtons = document.querySelectorAll(".decrement");

// Функція для оновлення ціни
function updatePrice(quantityElement, priceElement, basePrice) {
  const quantity = parseInt(quantityElement.textContent); // Отримуємо кількість
  const newPrice = quantity * basePrice; // Обчислюємо нову ціну
  priceElement.textContent = `$${newPrice}`; // Оновлюємо ціну в DOM
}

// Додаємо події на кнопки
incrementButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const quantityElement = button.previousElementSibling; // Кількість
    const priceElement = button.parentElement.nextElementSibling; // Ціна
    const basePrice = parseInt(quantityElement.dataset.price); // Базова ціна товару

    // Збільшуємо кількість
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;

    // Оновлюємо ціну
    updatePrice(quantityElement, priceElement, basePrice);
  });
});

decrementButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const quantityElement = button.nextElementSibling; // Кількість
    const priceElement = button.parentElement.nextElementSibling; // Ціна
    const basePrice = parseInt(quantityElement.dataset.price); // Базова ціна товару

    // Зменшуємо кількість (мінімум 1)
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;

      // Оновлюємо ціну
      updatePrice(quantityElement, priceElement, basePrice);
    }
  });
});

// Отримуємо елементи
const removeButtons = document.querySelectorAll(".shopping-bag__remove");
const shoppingBagItems = document.getElementById("shoppingBagItems");
const emptyBagMessage = document.getElementById("emptyBagMessage");

// Функція для перевірки, чи кошик порожній
function checkIfBagIsEmpty() {
  const items = shoppingBagItems.querySelectorAll(".shopping-bag__item");
  if (items.length === 0) {
    emptyBagMessage.style.display = "block"; // Показати повідомлення
  } else {
    emptyBagMessage.style.display = "none"; // Сховати повідомлення
  }
}

// Додаємо подію на кнопки видалення
removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement; // Знаходимо відповідний товар
    item.remove(); // Видаляємо товар з DOM
    checkIfBagIsEmpty(); // Перевіряємо, чи залишилися товари
  });
});

// Перевіряємо стан кошика при завантаженні сторінки
checkIfBagIsEmpty();



export default cardPopap;