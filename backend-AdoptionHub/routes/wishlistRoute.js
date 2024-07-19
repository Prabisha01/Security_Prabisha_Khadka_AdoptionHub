const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authGuard } = require("../middleware/authGuard");

// Add item to wishlist
router.post("/addToWish", authGuard, wishlistController.addToWishlist);

// // Get user's wishlist
// router.get("/get_wishlist/:id", wishlistController.getWishlist);

// Get user's wishlist
router.get("/get_wishlists/:id", wishlistController.getWishlist);

// Remove item from wishlist
router.delete("/remove/:id", authGuard, wishlistController.removeFromWishlist);

module.exports = router;
