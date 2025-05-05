"use strict";
const db = require("./db-conn");

function deleteProduct(id) {
  let sql = "DELETE FROM products WHERE product_id =?; ";
  const info = db.run(sql, id);
  return info;
}

function createNew(params) {
  let sql = "INSERT INTO products " +
    "(category, model, name, description, price, dimensions, material, color, image_url) " +
    "VALUES(?, ?, ?, ?, ?, ?, ?,?,?); ";
  const info = db.run(sql, params);
  return info;
}

function getColumnNames() {
  let sql = "select name from pragma_table_info('products');";
  const columns = db.all(sql);
  let result = columns.map(a => a.name);
  return result;
}
function getAll() {
  let sql = "SELECT * FROM products;";
  const data = db.all(sql);
  return data;
}

function getAllByOneAttribute(attribute, value) {
  const validColumns = getColumnNames();
  if (validColumns.includes(attribute)) {
    let sql = "SELECT * FROM products WHERE " + attribute + " =? ;";
    const data = db.all(sql, value);
    return data;
  }
}

function getProductById(id) {
  let sql = "SELECT * FROM products WHERE product_id =? ;";
  const item = db.get(sql, id);
  return item;
}
function getColumnNames() {
  let sql = "select name from pragma_table_info('products');";
  const columns = db.all(sql);
  let result = columns.map(a => a.name);
  return result;
}
function updateProduct(params) {
  const sql = `
    UPDATE products
    SET category = ?,
        model = ?,
        name = ?,
        description = ?,
        price = ?,
        dimensions = ?,
        material = ?,
        color = ?,
        image_url = ?
    WHERE product_id = ?;`;
  db.run(sql, params);
}

module.exports = {
  deleteProduct,
  createNew,
  getAll,
  getAllByOneAttribute,
  getProductById,
  updateProduct
};