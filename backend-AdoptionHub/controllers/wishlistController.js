const Wishlist = require("../model/wishlistModel");

// Create a new wishlist item
const addToWishlist = async (req, res) => {
  const { userId, plantId } = req.body;
  if (!userId || !plantId) {
    return res.json({
      success: false,
      message: "All field are required ",
    });
  }
  try {
    const wishlist = await Wishlist.findOne({
      userId: userId,
      plantId: plantId,
    });
    if (wishlist) {
      return res.json({
        success: false,
        message: "You've already added",
      });
    }
    const wishlists = new Wishlist({
      userId: userId,
      plantId: plantId,
    });
    await wishlists.save();
    res.status(200).json({
      success: true,
      message: "Added Favorite Successfully",
      data: wishlists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};



// Remove item from wishlist
// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItemId = req.params.id; // Corrected parameter name

    const deletedWishlistItem = await Wishlist.findByIdAndRemove(
      wishlistItemId
    );

    if (!deletedWishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in wishlist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist successfully",
      data: deletedWishlistItem,
    });
  } catch (error) {
    console.error(error);
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
      userId: userId,
    })
      .populate("plantId")
      .skip(skip)
      .limit(limit);
    res.json({
      success: true,
      message: "Whislist fetched successfully",
      wishlists: wishlists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};


module.exports = {
  addToWishlist,
 
  removeFromWishlist,
  getWishlist,
};
