"use strict";
const express = require("express");
const router = express.Router();

const tffController = require("../controllers/tff.controller");

router.get("/all", tffController.getAll);

router.get("/", tffController.getAllByOneAttribute);

router.get("/:product_id", ensureAuth, tffController.getProductById);
function ensureAuth(req, res, next) {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login');
    }
    next();
  }


module.exports = router;
