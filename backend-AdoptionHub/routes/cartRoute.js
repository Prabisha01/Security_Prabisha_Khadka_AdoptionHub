const cartController = require("../controllers/cartController.js");
const express = require("express");
const { authGuard } = require("../middleware/authGuard.js");
const router = express.Router();

router.post("/add_to_cart",authGuard, cartController.addToCart);

router.delete("/delete_cart/:id",authGuard, cartController.removeFromCart);


// Get user's wishlist
router.get("/get_carts/:id",authGuard, cartController.getCart);

//update
router.put("/update_cart/:id",authGuard, cartController.updateCart);


module.exports = router;
