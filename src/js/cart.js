import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__controls">
      <button class="decrease">-</button>
      <span class="cart-card__quantity">${item.quantity || 1}</span>
      <button class="increase">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove">Delete Product</button>
  </li>`;
  return newItem;
}

function updateQuantity(id, change) {
  let cart = getLocalStorage("so-cart");
  cart = cart.map((item) => {
    if (item.Id === id) {
      item.quantity = (item.quantity || 1) + change;
      if (item.quantity < 1) item.quantity = 1;
    }
    return item;
  });
  setLocalStorage("so-cart", cart);
  renderCartContents();
}

function removeItem(id) {
  let cart = getLocalStorage("so-cart");
  cart = cart.filter((item) => item.Id !== id);
  setLocalStorage("so-cart", cart);
  renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  const id = e.target.closest("li")?.dataset.id;
  if (!id) return;
  if (e.target.classList.contains("increase")) updateQuantity(id, 1);
  if (e.target.classList.contains("decrease")) updateQuantity(id, -1);
  if (e.target.classList.contains("remove")) removeItem(id);
});

renderCartContents();
