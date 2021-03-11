document.querySelector('#orderId').textContent = sessionStorage.getItem('orderId');
document.querySelector('#totalPrice').textContent = sessionStorage.getItem('totalPrice');
localStorage.clear();

