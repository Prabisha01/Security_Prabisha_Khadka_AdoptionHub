const cartController = require("../controllers/cartController.js");
const express = require("express");
const router = express.Router();

router.post("/add_to_cart", cartController.addToCart);

router.delete("/delete_cart/:id", cartController.removeFromCart);


// Get user's wishlist
router.get("/get_carts/:id", cartController.getCart);

//update
router.put("/update_cart/:id", cartController.updateCart);


module.exports = router;
