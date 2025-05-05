"use strict";
const express = require("express");
const router = express.Router();

const tffController = require("../controllers/tff.controller");

router.get("/all", tffController.getAll);

router.get("/", tffController.getAllByOneAttribute);

router.get("/:product_id", tffController.getProductById);


module.exports = router;
