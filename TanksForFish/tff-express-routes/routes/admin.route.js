"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const adminController = require("../controllers/admin/admin.controller");

router.get("/all", adminController.getAllProducts);
router.get("/", adminController.getAllByOneAttribute);
router.get("/product/:product_id", adminController.getProductById);
router.delete("/delete/:id", adminController.deleteProduct);
router.get("/edit/:product_id", adminController.showEditForm);
router.post("/update/:product_id", adminController.updateProduct);
router.get("/upload", adminController.showUploadForm);
router.post("/product/add", adminController.createNew);
router.post("/upload/file", upload.single("uploadFile"), adminController.uploadFile);


module.exports = router;


