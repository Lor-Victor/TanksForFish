"use strict";

const addButton = document.querySelectorAll('.add-btn');
const minusButton = document.querySelectorAll('.minus-btn');
const deliveryForm = document.querySelector('#delivery-pickup-form');
const delivery = document.getElementById('delivery');
const pickUp = document.getElementById('pick-up');

let totalCostMoney = 0;
const salesTax = 0.0675;


addButton.forEach(button => {
    button.addEventListener('click', addToTotal);
});

minusButton.forEach(button => {
    button.addEventListener('click', subtractFromTotal);
});

function addToTotal(event) {
    const cartItem = event.target.closest('.cart-item');
    const textPrice = cartItem.querySelector('.item-price').textContent.replace('$', '');
    const price = parseFloat(textPrice);
    const totalCost = document.querySelector('#total');

    totalCostMoney += price;
    totalCost.textContent = totalCostMoney.toFixed(2);

    finalTotal();

    const quantityElement = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += 1
    quantityElement.textContent = quantity;
}
function subtractFromTotal(event) {
    const cartItem = event.target.closest('.cart-item');
    const textPrice = cartItem.querySelector('.item-price').textContent.replace('$', '');
    const price = parseFloat(textPrice);
    const totalCost = document.querySelector('#total');
    if (totalCostMoney - price >= 0) {
        totalCostMoney -= price;
        totalCost.textContent = totalCostMoney.toFixed(2);

        finalTotal();
    }

    const quantityElement = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity -= 1;
        quantityElement.textContent = quantity;
    }
}
deliveryForm.addEventListener('change', ()=>{
    const totalElement = document.getElementById('total');

    let currentTotal = parseFloat(totalElement.textContent) ;
    const deliveryCharge = 15;

    if (delivery.checked) {
        // if( totalCostMoney !== 0 ) {
        //     totalCostMoney += deliveryCharge;
        // }
        totalCostMoney += deliveryCharge;
    } else if (pickUp.checked) {

        if (totalCostMoney >= deliveryCharge){
            totalCostMoney -= deliveryCharge;
        }
    }

    totalElement.textContent = currentTotal.toFixed(2);
    finalTotal();
}
);
function finalTotal() {
    const totalElement = document.querySelector('#total');
    const tax = totalCostMoney * salesTax;
    const finalTotal = totalCostMoney + tax;
    totalElement.textContent = finalTotal.toFixed(2);
}

