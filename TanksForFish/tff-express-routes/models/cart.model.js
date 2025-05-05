"use strict";

const db = require("./db-conn");

function getProductById(product_id) {
  const sql = "SELECT * FROM products WHERE product_id = ?;";
  return db.get(sql, product_id);
}

function createCart(params) {
  const sql = "INSERT INTO carts (user_id, date_created, total) VALUES (?, DATE('now'), ?);";
  return db.run(sql, params);
}

function addProductToCart(params) {
  const sql = "INSERT INTO cartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?);";
  return db.run(sql, params);
}

function getCartProducts(cart_id) {
  const sql = `
    SELECT p.*, cp.quantity, (p.price * cp.quantity) AS subtotal
    FROM cartProducts cp
    JOIN products p ON p.product_id = cp.product_id
    WHERE cp.cart_id = ?;
  `;
  return db.all(sql, [cart_id]);
}

function clearCart(cart_id) {
  const sql = "DELETE FROM cartProducts WHERE cart_id = ?;";
  return db.run(sql, [cart_id]);
}

function removeProductFromCart(params) {
  const sql = "DELETE FROM cartProducts WHERE cart_id = ? AND product_id = ?;";
  return db.run(sql, params);
}

function updateProductQuantity(params) {
  const sql = "UPDATE cartProducts SET quantity = ? WHERE cart_id = ? AND product_id = ?;";
  return db.run(sql, params);
}

module.exports = {
  getProductById,
  createCart,
  addProductToCart,
  getCartProducts,
  clearCart,
  removeProductFromCart,
  updateProductQuantity
};
