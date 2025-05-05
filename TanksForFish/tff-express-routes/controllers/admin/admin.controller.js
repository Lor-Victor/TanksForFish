"use strict";
const adminModel = require("../../models/admin.model");
const path = require("path");
const fs = require("fs");



function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      let productList = adminModel.getAllByOneAttribute(attribute, value);
      res.render("products", { productList: productList, title: value + "Products" });
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
    let product = adminModel.getProductById(req.params.product_id);
    res.render("product-details", { product: product, title: product.name });
  } catch (err) {
    console.error("Error while getting products: ", err.message);
    next(err);
  }
}
function getAllProducts(req, res, next) {
  try {
    let productList = adminModel.getAll();
    res.render("admin-products", { productList: productList, title: "All Products" });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function createNew(req, res, next) {
  const category = req.body["category-name"] || req.body.category;
  const model = req.body["product-model"] || req.body.model;
  const name = req.body["product-name"] || req.body.name;
  const description = req.body["product-description"] || req.body.description;
  const price = parseFloat(req.body["product-price"] || req.body.price);
  const dimensions = req.body["product-dimensions"] || req.body.dimensions;
  const material = req.body["product-material"] || req.body.material;
  const color = req.body["product-color"] || req.body.color;
  const image_url = req.body["product-image"] || req.body.image_url;

  if (category && model && name && description && price && dimensions && material && color && image_url) {
    let params = [category, model, name, description, price, dimensions, material, color, image_url];
    try {
      adminModel.createNew(params);
      res.redirect("/admin/all");
    } catch (err) {
      console.error("Error while creating product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
}

async function showEditForm(req, res, next) {
  const productId = req.params.product_id;
  try {
    const product = adminModel.getProductById(productId); // Get the product directly

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render("admin-update", { product: product, title: `Edit ${product.name}` });

  } catch (err) {
    console.error('Error fetching product for edit:', err.message);
    next(err);
  }
}
function deleteProduct(req, res, next) {
  try {
    adminModel.deleteProduct(req.params.id);
    res.render("admin-products", { productList: adminModel.getAll(), title: "All Products" });
  } catch (err) {
    console.error("Error while deleting product: ", err.message);
    next(err);
  }
}
function updateProduct(req, res, next) {
  const productId = req.body["product-id"] || req.params.product_id;
  const category = req.body["category-name"] || req.body.category;
  const model = req.body["product-model"] || req.body.model;
  const name = req.body["product-name"] || req.body.name;
  const description = req.body["product-description"] || req.body.description;
  const price = parseFloat(req.body["product-price"] || req.body.price);
  const dimensions = req.body["product-dimensions"] || req.body.dimensions;
  const material = req.body["product-material"] || req.body.material;
  const color = req.body["product-color"] || req.body.color;
  const image_url = req.body["product-image"] || req.body.image_url;
  // console.log("UPDATE BODY:", req.body);

  if (productId && category && model && name && description && !isNaN(price) && dimensions && material && color && image_url) {
    const updatedFields = [category, model, name, description, price, dimensions, material, color, image_url, productId];

    try {
      adminModel.updateProduct(updatedFields);
      res.redirect("/admin/all");
    } catch (err) {
      console.error("Error while updating product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
}
function showUploadForm(req, res, next) {
  try {
    res.render("admin-upload", { title: "Upload New Product" });
  } catch (err) {
    console.error("Error while showing upload form: ", err.message);
    next(err);
  }
}
function uploadFile(req, res, next) {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  const filePath = path.join(__dirname, "../../uploads", req.file.filename);
  const mimeType = req.file.mimetype;

  if (mimeType === "application/json") {
    const data = fs.readFileSync(filePath, "utf-8");
    try {
      const jsonData = JSON.parse(data);

      const products = Array.isArray(jsonData) ? jsonData : [jsonData];

      for (const product of products) {
        const { category, model, name, description, price, dimensions, material, color, image_url} = product;

        if (category && model && name && description && !isNaN(price) && dimensions && material && color && image_url) {
          const params = [category, model, name, description, parseFloat(price), dimensions, material, color, image_url];
          adminModel.createNew(params);
        } else {
          console.warn("Skipping invalid product:", product);
        }
      }

      fs.unlinkSync(filePath);
      res.redirect("/admin/all");
    } catch (err) {
      console.error("Error parsing JSON: ", err.message);
      return res.status(400).send("Invalid JSON file or eror parsing it");
    }
  } else {
    res.status(400).send("Invalid file type");
  }

}

module.exports = {
  getAllProducts,
  getAllByOneAttribute,
  getProductById,
  createNew,
  showEditForm,
  deleteProduct,
  updateProduct,
  showUploadForm,
  uploadFile
};
