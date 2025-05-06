"use strict";

const cartModel = require("../models/cart.model");
const addressModel = require("../models/address.model");

async function addToCart(req, res, next) {
    const { product_id, quantity } = req.body;
    const qty = parseInt(quantity);

    try {
        if (!req.user) {
            return res.redirect("/auth/login");
        }

        const user_id = req.user.user_id;
        let cart = cartModel.getCartByUserId(user_id);

        if (!cart) {
            cartModel.createCart([user_id, 0]);
            cart = cartModel.getCartByUserId(user_id);
        }

        const existing = cartModel.getCartProduct(cart.cart_id, product_id);

        if (existing) {
            cartModel.updateProductQuantity([existing.quantity + qty, cart.cart_id, product_id]);
        } else {
            cartModel.addProductToCart([cart.cart_id, product_id, qty]);
        }

        const cartItems = cartModel.getCartProducts(cart.cart_id);
        const newTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        cartModel.updateCartTotal(newTotal, cart.cart_id);

        res.redirect("/products/all");
    } catch (err) {
        console.error("Add to cart error:", err.message);
        next(err);
    }
}

function viewCart(req, res, next) {
    try {
        if (!req.user) return res.redirect("/auth/login");

        const user_id = req.user.user_id;
        const cart = cartModel.getCartByUserId(user_id);

        if (!cart) {
            return res.render("cart", { cart: [], total: 0, title: "Your Cart" , user: req.user });
        }

        const cartItems = cartModel.getCartProducts(cart.cart_id);
        const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

        res.render("cart", { cart: cartItems, total, title: "Your Cart", user: req.user });
    } catch (err) {
        console.error("View cart error:", err.message);
        next(err);
    }
}

// Clear the cart
function clearCart(req, res, next) {
    req.session.cart = [];
    res.redirect("/cart/view");
}

// Remove a specific item from the cart
function removeCartItem(req, res, next) {
    try {
        const { product_id } = req.body;
        const user_id = req.user.user_id;

        // Get the cart for this user
        const cart = cartModel.getCartByUserId(user_id);
        if (!cart) return res.redirect("/cart/view");

        // Remove product from the cartProducts table
        cartModel.removeProductFromCart([cart.cart_id, product_id]);

        // Recalculate cart total
        const cartItems = cartModel.getCartProducts(cart.cart_id);
        const newTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        cartModel.updateCartTotal(newTotal, cart.cart_id);

        res.redirect("/cart/view");
    } catch (err) {
        console.error("Remove from cart error:", err.message);
        next(err);
    }
}

// Update quantity of an item in the cart
function updateCartItem(req, res, next) {
    const { product_id, action } = req.body;

    if (!req.user) return res.redirect("/auth/login");

    try {
        const user_id = req.user.user_id;
        const cart = cartModel.getCartByUserId(user_id);
        if (!cart) return res.redirect("/cart/view");

        const item = cartModel.getCartProduct(cart.cart_id, product_id);
        if (!item) return res.redirect("/cart/view");

        let newQty = item.quantity;
        if (action === "increase") {
            newQty += 1;
        } else if (action === "decrease" && newQty > 1) {
            newQty -= 1;
        }

        cartModel.updateProductQuantity([newQty, cart.cart_id, product_id]);

        // Recalculate total
        const cartItems = cartModel.getCartProducts(cart.cart_id);
        const newTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        cartModel.updateCartTotal(newTotal, cart.cart_id);

        res.redirect("/cart/view");
    } catch (err) {
        console.error("Update cart error:", err.message);
        next(err);
    }
}

function checkoutPage(req, res, next) {
    try {
        if (!req.user) return res.redirect("/auth/login");

        const user_id = req.user.user_id;
        const cart = cartModel.getCartByUserId(user_id);

        if (!cart) {
            return res.redirect("/cart/view");
        }

        const cartItems = cartModel.getCartProducts(cart.cart_id);
        const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

        res.render("checkout", { cart: cartItems, total, title: "Checkout", user: req.user });
    } catch (err) {
        console.error("Checkout error:", err.message);
        next(err);
    }
}

async function checkout(req, res, next) {
    const { user_id, name, street, city, state, zip_code, country, deliveryOption
    } = req.body;

    if (!user_id || !street || !city || !state || !zip_code || !country || !deliveryOption) {
        return res.status(400).send("All fields are required.");
    }

    try {
        // 1. Prevent duplicate address
        const exists = await addressModel.addressExists(user_id, street, city, state, country, zip_code);
        if (!exists) {
            await addressModel.addAddress([user_id, street, city, state, country, zip_code]);
        }

        // 2. Get full product info for items in session cart
        const cartRecord = await cartModel.getCartByUserId(user_id);
        let detailedCart = [];

        if (cartRecord) {
            detailedCart = await cartModel.getCartProducts(cartRecord.cart_id);
        }

        // 3. Calculate total + tax + delivery
        let total = detailedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (deliveryOption === "delivery") total += 15;
        total *= 1.0675; // Apply 6.75% tax

        req.session.total = total;
        req.session.deliveryOption = deliveryOption;

        // 4. Update or create user's cart
        if (cartRecord) {
            await cartModel.updateCartTotal(total, cartRecord.cart_id);
        } else {
            await cartModel.createCart([user_id, total]);
        }

        // 5. Render confirmation page
        res.render("confirm", {
            title: "Order Confirmation", user: req.user, cart: detailedCart, total, deliveryOption, name
        });
        cartModel.clearCart(cartRecord.cart_id);
    } catch (err) {
        console.error("Checkout failed:", err.message);
        next(err);
    }
}


module.exports = {
    addToCart,
    viewCart,
    clearCart,
    removeCartItem,
    updateCartItem,
    checkoutPage,
    checkout,
};
