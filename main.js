// Productos disponibles
const products = [
  { id: 1, name: "Camiseta 9z", price: 3000, image: "assets/camiseta.jpg" },
  { id: 2, name: "Hoodie 9z", price: 6000, image: "assets/hoodie.jpg" },
  { id: 3, name: "Mousepad 9z", price: 1200, image: "assets/mousepad.jpg" },
  { id: 4, name: "Gorra 9z", price: 1800, image: "assets/remera.jpg" },
];

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const cartButton = document.getElementById('cart-button');
const cartPanel = document.getElementById('cart-panel');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');

// Función para renderizar productos
function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    container.appendChild(productCard);
  });
}

// Función para agregar productos al carrito
function addToCart(productId) {
  const product = products.find(prod => prod.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  showToast(`${product.name} agregado al carrito`);
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  showToast(`Producto eliminado del carrito`);
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

// Función para renderizar los productos en el carrito
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

// Función para mostrar una notificación
function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#333",
  }).showToast();
}

// Funciones para abrir y cerrar el panel del carrito
cartButton.addEventListener('click', () => {
  cartPanel.classList.add('active');
});

closeCartButton.addEventListener('click', () => {
  cartPanel.classList.remove('active');
});

// Inicializar la página
renderProducts();
updateCartCount();
renderCartItems();