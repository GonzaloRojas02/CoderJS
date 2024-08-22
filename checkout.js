document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
  
    checkoutForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(checkoutForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const address = formData.get('address');
      const cardNumber = formData.get('card-number');
  
      showToast(`Gracias, tu compra ha sido realizada.`);
  
      setTimeout(() => {
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
      }, 5000);
    });
  
    function showToast(message) {
      Toastify({
        text: message,
        duration: 2000,
        gravity: "top",
        position: "center",
        close: true,
        transition: "Slide",
        backgroundColor: "#28a745",
      }).showToast();
    }
  });  