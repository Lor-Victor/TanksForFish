"use strict";

const cartModel = require("../models/cart.model");

// Add a product to the user's session cart
function addToCart(req, res, next) {
  const { product_id, quantity } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.product_id == product_id);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    req.session.cart.push({ product_id, quantity: parseInt(quantity) });
  }

  res.redirect("/cart");
}

// Show the cart contents
function viewCart(req, res, next) {
  const cart = req.session.cart || [];

  try {
    const detailedCart = cart.map(item => {
      const product = cartModel.getProductById(item.product_id);
      return {
        ...product,
        quantity: item.quantity,
        subtotal: item.quantity * product.price
      };
    });

    const total = detailedCart.reduce((sum, item) => sum + item.subtotal, 0);

    res.render("cart", { cart: detailedCart, total , title: "Your Cart" });
  } catch (err) {
    console.error("Error loading cart:", err.message);
    next(err);
  }
}

// Clear the cart
function clearCart(req, res, next) {
  req.session.cart = [];
  res.redirect("/cart");
}

// Remove a specific item from the cart
function removeCartItem(req, res, next) {
  const { product_id } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart = req.session.cart.filter(item => item.product_id != product_id);
  res.redirect("/cart");
}

// Update quantity of an item in the cart
function updateCartItem(req, res, next) {
  const { product_id, quantity } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const item = req.session.cart.find(item => item.product_id == product_id);
  if (item) {
    item.quantity = parseInt(quantity);
  }

  res.redirect("/cart");
}

module.exports = {
  addToCart,
  viewCart,
  clearCart,
  removeCartItem,
  updateCartItem
};
