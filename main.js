let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartButton = document.getElementById('cart-button');
const cartPanel = document.getElementById('cart-panel');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');

// Agregar productos al carrito
function addToCart(productId) {
  const productElement = document.querySelector(`.product-card button[onclick="addToCart(${productId})"]`).parentElement;
  const product = {
    id: productId,
    name: productElement.querySelector('h3').innerText,
    price: parseFloat(productElement.querySelector('p').innerText.replace('Precio: $', '')),
    image: productElement.querySelector('img').src
  };
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  showToast(`${product.name} agregado al carrito`);
}

// Eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  showToast(`Producto eliminado del carrito`);
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// Notificación
function showToast(message) {
  Toastify({
    text: message,
    duration: 1500,
    gravity: "top",
    position: "center",
    close: true,
    transition: "Slide",
    backgroundColor: "#333",
  }).showToast();
}

// Panel del carrito
cartButton.addEventListener('click', () => {
  cartPanel.classList.add('active');
});

closeCartButton.addEventListener('click', () => {
  cartPanel.classList.remove('active');
});

updateCartCount();
renderCartItems();