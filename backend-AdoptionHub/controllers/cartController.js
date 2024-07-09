const Cart = require("../model/cartModel");

const addToCart = async (req, res) => {
  const { userId, quantity, plantId } = req.body;

  if (!userId || !quantity || !plantId) {
    return res.json({
      success: false,
      message: "User ID, quantity, and plant ID are required fields",
    });
  }

  try {
    const cart = await Cart.findOne({
      userId: userId,
      plantId: plantId,
    });

    if (cart) {
      return res.json({
        success: false,
        message: "This item is already in your cart",
      });
    }

    const carts = new Cart({
      userId: userId,
      plantId: plantId,
      quantity: quantity,
    });

    await carts.save();
    res.status(200).json({
      success: true,
      message: "Added to Cart Successfully",
      data: carts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.json({
      success: false,
      message: "User ID is required",
    });
  }

  const requestedPage = parseInt(req.query._page, 5);
  const limit = parseInt(req.query._limit, 5);
  const skip = (requestedPage - 1) * limit;

  try {
    const carts = await Cart.find({
      userId: userId,
    })
      .populate("plantId")
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      message: "Cart fetched successfully",
      carts: carts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const cartId = req.params.id;

    const deletedCartItem = await Cart.findByIdAndRemove(cartId);

    if (!deletedCartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      data: deletedCartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { itemId, newQuantity } = req.body;

  try {
    const cartItem = await Cart.findById(itemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update quantity",
    });
  }
};

const updateCart = async (req, res) => {
  console.log(req.body);

  const products = req.body.products;
  const userId = req.params.id;

  if (!products || !Array.isArray(products)) {
    return res.json({
      success: false,
      message: "Invalid payload format!",
    });
  }

  try {
    for (const product of products) {
      const { plantId, quantity } = product;

      const numericQuantity = parseInt(quantity, 10);

      if (isNaN(numericQuantity)) {
        return res.json({
          success: false,
          message: "Invalid quantity format!",
        });
      }

      const updatedCartItem = {
        quantity: numericQuantity,
        userId: userId,
        plantId: plantId,
      };

      const query = { userId: userId, plantId: plantId };
      const options = { new: true, upsert: true, setDefaultsOnInsert: true };
      const updatedItem = await Cart.findOneAndUpdate(
        query,
        updatedCartItem,
        options
      );

      console.log(
        `Cart item with userID ${userId} and plantID ${plantId} updated successfully:`,
        updatedItem
      );
    }

    const updatedCartItems = await Cart.find({ userId: userId });

    res.json({
      success: true,
      message: "Cart items updated successfully",
      cartItems: updatedCartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCart,
  updateCart,
};
