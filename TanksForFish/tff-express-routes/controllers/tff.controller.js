"use strict";
const model = require("../models/tff.models");

function home(req, res, next) {
  res.render("home", { title: "Home" });
}


function getAll(req, res, next) {
  try {
    let productList = model.getAll();
    //const role = req.user?.role || null;
    res.render("products", { productList: productList, title: "All Products",user: req.user});
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      let productList = model.getAllByOneAttribute(attribute, value); 
      res.render("products", { productList: productList, title: value+"Products",user: req.user });
    } catch (err) {
      console.error("Error while getting products: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

function getProductById(req, res, next) {
  try {
    let product = model.getProductById(req.params.product_id);
    res.render("product-details", { product: product, title: product.name,user: req.user });
  } catch (err) {
    console.error("Error while getting products: ", err.message);
    next(err);
  }
}

module.exports = {
  home,
  getAll,
  getAllByOneAttribute,
  getProductById
};