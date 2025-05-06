"use strict";

const addButton = document.querySelectorAll('.add-btn');
const minusButton = document.querySelectorAll('.minus-btn');
const checkoutForm = document.querySelector('#checkout-form');
const delivery = document.getElementById('delivery');
const pickUp = document.getElementById('pick-up');

let subtotal = parseFloat(document.querySelector('#total').textContent); 
let deliveryCharge = 0;
const taxRate = 0.0675;



addButton.forEach(button => {
    button.addEventListener('click', addToTotal);
});

minusButton.forEach(button => {
    button.addEventListener('click', subtractFromTotal);
});

function addToTotal(event) {
    const cartItem = event.target.closest('.cart-item');
    const quantityElement = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1;
    quantityElement.textContent = quantity;
}

function subtractFromTotal(event) {
    const cartItem = event.target.closest('.cart-item');
    const quantityElement = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity -= 1;
        quantityElement.textContent = quantity;
    }
}


checkoutForm.addEventListener('change', () => {
    if (delivery.checked) {
        deliveryCharge = 15;
    } else if (pickUp.checked) {
        deliveryCharge = 0;
    }

    updateFinalTotal();
});
function updateFinalTotal() {
    const tax = (subtotal + deliveryCharge) * taxRate;
    const finalTotal = subtotal + deliveryCharge + tax;

    document.querySelector('#total').textContent = finalTotal.toFixed(2);
}

