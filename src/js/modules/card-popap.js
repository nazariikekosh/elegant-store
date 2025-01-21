// Отримуємо елементи
const cartBtn = document.getElementById("cart-btn"); // Кнопка для відкриття popup
const shoppingPopup = document.getElementById("shoppingPopup"); // Popup елемент
const closePopup = document.getElementById("closePopup"); // Кнопка закриття popup
const cartCountSpan = document.querySelector(".nav__btn-count"); // Лічильник у кнопці
const shoppingBagItems = document.getElementById("shoppingBagItems"); // Список товарів
const emptyBagMessage = document.getElementById("emptyBagMessage"); // Повідомлення "кошик порожній"
const totalPriceSpan = document.getElementById("totalPrice"); // Загальна сума
const totalItemsSpan = document.getElementById("totalItems"); // Загальна кількість товарів
const placeOrderBtn = document.getElementById("placeOrderBtn"); // Кнопка для оформлення замовлення
const continueShoppingBtn = document.getElementById("continueShoppingBtn"); // Кнопка для продовження покупок

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
    placeOrderBtn.style.display = "none"; // Ховаємо кнопку оформлення замовлення
  } else {
    cartCountSpan.style.display = "inline-block"; // Показуємо лічильник
    emptyBagMessage.style.display = "none"; // Ховаємо повідомлення
    placeOrderBtn.style.display = "inline-block"; // Показуємо кнопку оформлення замовлення
  }

  // Оновлюємо загальну кількість та суму
  updateTotalPriceAndItems();
}

// Функція для оновлення загальної ціни та кількості товарів
function updateTotalPriceAndItems() {
  let totalItems = 0;
  let totalPrice = 0;

  const quantityValues = shoppingBagItems.querySelectorAll(".quantity-value");
  quantityValues.forEach((quantitySpan) => {
    const quantity = parseInt(quantitySpan.textContent, 10);
    const price = parseFloat(quantitySpan.dataset.price);
    totalItems += quantity;
    totalPrice += quantity * price;
  });

  totalItemsSpan.textContent = totalItems;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Функція для оновлення ціни
function updatePrice(quantityElement, priceElement, basePrice) {
  const quantity = parseInt(quantityElement.textContent); // Отримуємо кількість
  const newPrice = quantity * basePrice; // Обчислюємо нову ціну
  priceElement.textContent = `$${newPrice.toFixed(2)}`; // Оновлюємо ціну в DOM
}

// Збереження даних кошика в Local Storage
function saveCartToLocalStorage() {
  const cartItems = Array.from(shoppingBagItems.children).map((item) => {
    const name = item.querySelector(".shopping-bag__name").textContent;
    const price = item.querySelector(".quantity-value").dataset.price;
    const quantity = item.querySelector(".quantity-value").textContent;
    const imgSrc = item.querySelector(".shopping-bag__image").src;
    return { name, price, quantity, imgSrc };
  });

  localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
}

// Завантаження даних із Local Storage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    const cartItems = JSON.parse(savedCart);

    cartItems.forEach((item) => {
      const cartItemHTML = `
        <div class="shopping-bag__item">
          <button class="shopping-bag__remove">✕</button>
          <img src="${item.imgSrc}" alt="${item.name}" class="shopping-bag__image" />
          <div class="shopping-bag__details">
            <h3 class="shopping-bag__name">${item.name}</h3>
            <p class="shopping-bag__color">White</p>
          </div>
          <div class="shopping-bag__quantity">
            <button class="quantity-btn decrement">−</button>
            <span class="quantity-value" data-price="${item.price}">${item.quantity}</span>
            <button class="quantity-btn increment">+</button>
          </div>
          <p class="shopping-bag__price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;

      shoppingBagItems.insertAdjacentHTML("beforeend", cartItemHTML);
    });

    // Додаємо обробники подій для завантажених елементів
    attachEventListeners();
    updateCartCount();
  }
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
      const basePrice = parseFloat(quantityElement.dataset.price); // Базова ціна товару

      // Збільшуємо кількість
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;

      // Оновлюємо ціну, кількість та Local Storage
      updatePrice(quantityElement, priceElement, basePrice);
      updateCartCount();
      saveCartToLocalStorage();
    });
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const quantityElement = button.nextElementSibling; // Кількість
      const priceElement = button.parentElement.nextElementSibling; // Ціна
      const basePrice = parseFloat(quantityElement.dataset.price); // Базова ціна товару

      // Зменшуємо кількість (мінімум 1)
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;

        // Оновлюємо ціну, кількість та Local Storage
        updatePrice(quantityElement, priceElement, basePrice);
        updateCartCount();
        saveCartToLocalStorage();
      }
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement; // Знаходимо відповідний товар
      item.remove(); // Видаляємо товар з DOM
      updateCartCount(); // Оновлюємо стан кошика
      saveCartToLocalStorage(); // Оновлюємо Local Storage
    });
  });
}

// Додаємо обробник подій для кнопок "Add to cart"
const addToCartButtons = document.querySelectorAll(".btn--small");

function addToCart(event) {
  const card = event.target.closest(".card"); // Знаходимо картку товару
  const title = card.querySelector(".card__title").textContent; // Назва товару
  const price = parseFloat(card.querySelector(".card__price").textContent.replace('$', '')); // Ціна товару
  const imgSrc = card.querySelector(".card__picture img").src; // Зображення товару

  // Перевіряємо, чи товар вже є в кошику
  const existingItem = Array.from(shoppingBagItems.children).find((item) =>
    item.querySelector(".shopping-bag__name").textContent === title
  );

  if (existingItem) {
    // Якщо товар вже є, збільшуємо кількість
    const quantityElement = existingItem.querySelector(".quantity-value");
    const incrementButton = existingItem.querySelector(".increment");
    incrementButton.click(); // Викликаємо подію збільшення кількості
  } else {
    // Якщо товару немає, створюємо новий елемент у кошику
    const cartItemHTML = `
      <div class="shopping-bag__item">
        <button class="shopping-bag__remove">✕</button>
        <img src="${imgSrc}" alt="${title}" class="shopping-bag__image" />
        <div class="shopping-bag__details">
          <h3 class="shopping-bag__name">${title}</h3>
          <p class="shopping-bag__color">White</p>
        </div>
        <div class="shopping-bag__quantity">
          <button class="quantity-btn decrement">−</button>
          <span class="quantity-value" data-price="${price}">1</span>
          <button class="quantity-btn increment">+</button>
        </div>
        <p class="shopping-bag__price">$${price.toFixed(2)}</p>
      </div>
    `;

    shoppingBagItems.insertAdjacentHTML("beforeend", cartItemHTML);

    // Оновлюємо кількість товарів у кошику
    updateCartCount();
    saveCartToLocalStorage();

    // Додаємо події до кнопок у новому елементі
    attachEventListeners();
  }
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Завантажуємо кошик із Local Storage при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
});

// Оформлення замовлення
placeOrderBtn.addEventListener("click", () => {
  alert("Ваше замовлення оформлене! Дякуємо за покупку!");
  shoppingBagItems.innerHTML = ''; // Очищаємо кошик
  updateCartCount();
  saveCartToLocalStorage();
});

// Продовження покупок
continueShoppingBtn.addEventListener("click", () => {
  shoppingPopup.style.display = "none"; // Закриваємо popup
});
