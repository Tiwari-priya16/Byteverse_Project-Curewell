function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartContainer');
  let totalCost = 0;
  let totalItems = 0;

  const cartHtmlArray = [];

  cart.forEach((item, index) => {
    const itemCost = Number(item.cost) || 0;
    const itemQuantity = Number(item.quantity) || 0;
    const subtotal = itemCost * itemQuantity;

    const card = `
      <div class="cart-item-card" data-name="${item.name}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-content">
          <h3>${item.name}</h3>
          ${item.use ? `<p><strong>Use:</strong> ${item.use}</p>` : ''}
          ${item.dosage ? `<p><strong>Dosage:</strong> ${item.dosage}</p>` : ''}
          ${item.precautions ? `<p><strong>Precautions:</strong> ${item.precautions}</p>` : ''}
          <p class="quantity-controls">
            <strong>Quantity:</strong>
            <button class="quantity-btn quantity-decrease" onclick="updateQuantity(${index}, -1)">➖</button>
            <span class="item-quantity">${itemQuantity}</span>
            <button class="quantity-btn quantity-increase" onclick="updateQuantity(${index}, 1)">➕</button>
          </p>
          <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
          <button class="cart-item-remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartHtmlArray.push(card);

    totalCost += subtotal;
    totalItems += itemQuantity;
  });

  cartContainer.innerHTML = cartHtmlArray.join('');

  document.getElementById('totalCost').textContent = totalCost.toFixed(2);
  document.getElementById('totalItems').textContent = totalItems;
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart[index] && typeof cart[index].quantity !== 'undefined') {
    let currentQuantity = Number(cart[index].quantity) || 0;
    currentQuantity += change;

    if (currentQuantity < 1) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = currentQuantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  } else {
    console.error("Error updating quantity: Item or quantity not found at index", index);
  }
}


function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  } else {
    console.error("Error removing item: Invalid index", index);
  }
}

function resetCart() {
  if (confirm("Are you sure you want to empty your cart?")) {
    localStorage.removeItem('cart');
    renderCart();
  }
}

const checkoutButton = document.getElementById('checkoutBtn');
const resetButton = document.getElementById('resetBtn');

if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
       alert('Proceeding to Checkout...');
    } else {
       alert('Your cart is empty!');
    }
  });
} else {
  console.error("Checkout button not found");
}

if (resetButton) {
  resetButton.addEventListener('click', resetCart);
} else {
  console.error("Reset button not found");
}

renderCart();

window.addEventListener('storage', (event) => {
  if (event.key === 'cart' && event.oldValue !== event.newValue) {
    renderCart();
  }
});