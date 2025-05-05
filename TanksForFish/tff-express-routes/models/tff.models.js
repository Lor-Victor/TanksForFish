"use strict";
const db = require("./db-conn");

function getAll() {
  let sql = "SELECT * FROM products;";
  const data = db.all(sql);
  return data;
}

function getAllByOneAttribute(attribute, value) {
  const validColumns = getColumnNames();
  if (validColumns.includes(attribute)) {
    let sql = "SELECT * FROM products WHERE " + attribute + " =? COLLATE NOCASE;";
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
  module.exports = {
    getAll,
    getAllByOneAttribute,
    getProductById
  };