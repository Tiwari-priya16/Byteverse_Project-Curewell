const addToCartButtons = document.querySelectorAll('.shop-now');

addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.medicine-card');
    const medicine = {
      name: card.getAttribute('data-name'),
      use: card.getAttribute('data-use'),
      dosage: card.getAttribute('data-dosage'),
      precautions: card.getAttribute('data-precautions'),
      cost: parseInt(card.getAttribute('data-cost')),
      image: card.getAttribute('data-image'),
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingMedicine = cart.find(item => item.name === medicine.name);

    if (existingMedicine) {
      existingMedicine.quantity++;
    } else {
      cart.push(medicine);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${medicine.name} added to cart`);
  });
});
