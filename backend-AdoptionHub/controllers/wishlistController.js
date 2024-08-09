const Wishlist = require("../model/wishlistModel");
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' })
    ]
});

const addToWishlist = async (req, res) => {
  const { userId, plantId } = req.body;
  if (!userId || !plantId) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const wishlist = await Wishlist.findOne({
      userId,
      plantId,
    });
    if (wishlist) {
      return res.json({
        success: false,
        message: "You've already added this item to your wishlist",
      });
    }
    const wishlists = new Wishlist({
      userId,
      plantId,
    });
    await wishlists.save();

    logger.info('Added to wishlist successfully', { userId, plantId });

    res.status(200).json({
      success: true,
      message: "Added to wishlist successfully",
      data: wishlists,
    });
  } catch (error) {
    logger.error('Error adding to wishlist', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItemId = req.params.id;

    const deletedWishlistItem = await Wishlist.findByIdAndRemove(wishlistItemId);

    if (!deletedWishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in wishlist",
      });
    }

    logger.info('Removed from wishlist successfully', { wishlistItemId });

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist successfully",
      data: deletedWishlistItem,
    });
  } catch (error) {
    logger.error('Error removing from wishlist', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.params.id;
  const requestedPage = parseInt(req.query._page, 5);
  const limit = parseInt(req.query._limit, 5);
  const skip = (requestedPage - 1) * limit;
  try {
    const wishlists = await Wishlist.find({
      userId,
    })
      .populate("plantId")
      .skip(skip)
      .limit(limit);

    logger.info('Wishlist fetched successfully', { userId, page: requestedPage });

    res.json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlists,
    });
  } catch (error) {
    logger.error('Error fetching wishlist', { error: error.message });
    res.status(500).json("Server error");
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
