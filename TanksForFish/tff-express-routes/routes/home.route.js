const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.home);
router.get("/home", homeController.home);
router.get("/search", homeController.searchFish);


module.exports = router;