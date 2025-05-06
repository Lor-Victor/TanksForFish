const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/view", ensureAuth, cartController.viewCart);
router.post("/add", ensureAuth, cartController.addToCart);
router.post("/update", ensureAuth, cartController.updateCartItem);
router.post("/remove", ensureAuth, cartController.removeCartItem);
router.post("/clear", ensureAuth, cartController.clearCart);
router.post("/checkout", ensureAuth, cartController.checkout);

function ensureAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.redirect("/auth/login");
    }
    next();
}


module.exports = router;
