const products = [
    { id: 1, name: "Camiseta 9z", price: 3000, image: "camiseta.jpg" },
    { id: 2, name: "Hoodie 9z", price: 6000, image: "hoodie.jpg" },
    { id: 3, name: "Mousepad 9z", price: 1200, image: "mousepad.jpg" },
    { id: 4, name: "Gorra 9z", price: 1800, image: "gorra.jpg" },
  ];

  // Carrito
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const cartButton = document.getElementById('cart-button');
  const cartPanel = document.getElementById('cart-panel');
  const closeCartButton = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');

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

  // Agregar Productos
  function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    showToast(`${product.name} agregado al carrito`);
  }
  
  function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
  }

  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name}</span>
        <span>$${item.price}</span>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  // Notificación
  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#333",
    }).showToast();
  }

  // Panel Carrito
  cartButton.addEventListener('click', () => {
    cartPanel.classList.add('active');
  });
  
  closeCartButton.addEventListener('click', () => {
    cartPanel.classList.remove('active');
  });

  renderProducts();
  updateCartCount();
  renderCartItems();  