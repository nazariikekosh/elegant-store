// Отримуємо елементи
const cartBtn = document.getElementById("cart-btn"); // Кнопка для відкриття popup
const shoppingPopup = document.getElementById("shoppingPopup"); // Popup елемент
const closePopup = document.getElementById("closePopup"); // Кнопка закриття popup
const cartCountSpan = document.querySelector(".nav__btn-count"); // Лічильник у кнопці
const shoppingBagItems = document.getElementById("shoppingBagItems"); // Список товарів
const emptyBagMessage = document.getElementById("emptyBagMessage"); // Повідомлення "кошик порожній"

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
  if (event.target === shoppingPopup) {
    shoppingPopup.style.display = "none"; // Ховаємо popup
  }
});

// Функція для оновлення кількості товарів у кнопці
function updateCartCount() {
  const quantityValues = shoppingBagItems.querySelectorAll(".quantity-value");
  let totalItems = 0;

  quantityValues.forEach((quantitySpan) => {
    totalItems += parseInt(quantitySpan.textContent, 10);
  });

  cartCountSpan.textContent = totalItems;

  // Якщо кількість товарів у кошику = 0, ховаємо лічильник та показуємо повідомлення
  if (totalItems === 0) {
    cartCountSpan.style.display = "none"; // Ховаємо лічильник
    emptyBagMessage.style.display = "block"; // Показуємо повідомлення
  } else {
    cartCountSpan.style.display = "inline-block"; // Показуємо лічильник
    emptyBagMessage.style.display = "none"; // Ховаємо повідомлення
  }
}

// Функція для оновлення ціни
function updatePrice(quantityElement, priceElement, basePrice) {
  const quantity = parseInt(quantityElement.textContent); // Отримуємо кількість
  const newPrice = quantity * basePrice; // Обчислюємо нову ціну
  priceElement.textContent = `$${newPrice}`; // Оновлюємо ціну в DOM
}

// Додавання подій для кнопок
function attachEventListeners() {
  const incrementButtons = shoppingBagItems.querySelectorAll(".increment");
  const decrementButtons = shoppingBagItems.querySelectorAll(".decrement");
  const removeButtons = shoppingBagItems.querySelectorAll(".shopping-bag__remove");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const quantityElement = button.previousElementSibling; // Кількість
      const priceElement = button.parentElement.nextElementSibling; // Ціна
      const basePrice = parseInt(quantityElement.dataset.price); // Базова ціна товару

      // Збільшуємо кількість
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;

      // Оновлюємо ціну та кількість товарів
      updatePrice(quantityElement, priceElement, basePrice);
      updateCartCount();
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

        // Оновлюємо ціну та кількість товарів
        updatePrice(quantityElement, priceElement, basePrice);
        updateCartCount();
      }
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement; // Знаходимо відповідний товар
      item.remove(); // Видаляємо товар з DOM
      updateCartCount(); // Перевіряємо кількість товарів
    });
  });
}

// Додаємо події при завантаженні сторінки
attachEventListeners();
updateCartCount();
