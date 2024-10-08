let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

// Añadir producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        addItemToCart(name, price);
    });
});

function addItemToCart(name, price) {
    cart.push({name, price});
    totalPrice += price;
    updateCart();
    saveCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });

    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    document.getElementById('carrito').style.display = cart.length > 0 ? 'block' : 'none';
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    totalPrice = 0;
    updateCart();
    saveCart();
});

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

// Inicializar el carrito al cargar la página
updateCart();
