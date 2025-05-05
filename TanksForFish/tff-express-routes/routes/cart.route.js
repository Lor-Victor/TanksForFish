const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/view", cartController.viewCart);
router.post("/add", cartController.addToCart);
router.post("/update", cartController.updateCartItem);
router.post("/remove", cartController.removeCartItem);
router.post("/clear", cartController.clearCart);

module.exports = router;
