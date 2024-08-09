const Cart = require("../model/cartModel");
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

const addToCart = async (req, res) => {
logger.info('Add to Cart request received', { requestBody: req.body }); // Log the request body
const { user, quantity, products } = req.body;

if (!user || !quantity || !products) {
  return res.json({
    success: false,
    message: "Please fill required fields",
  });
}

try {
  const cart = await Cart.findOne({
    user: user,
    products: products,
  });

  if (cart) {
    return res.json({
      success: false,
      message: "This item is already in your cart",
    });
  }

  const carts = new Cart({
    user: user,
    products: products,
    quantity: quantity,
  });

  await carts.save();
  res.status(200).json({
    success: true,
    message: "Added to Cart Successfully",
    data: carts,
  });
} catch (error) {
  logger.error('Error in addToCart', { error: error.message });
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

const getCart = async (req, res) => {
const user = req.params.id;

if (!user) {
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
    user: user,
  }).populate("products");

  res.json({
    success: true,
    message: "Cart fetched successfully",
    carts: carts,
  });
} catch (error) {
  logger.error('Error in getCart', { error: error.message });
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
  logger.error('Error in removeFromCart', { error: error.message });
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
  logger.error('Error in updateCartItemQuantity', { error: error.message });
  res.status(500).json({
    success: false,
    message: "Failed to update quantity",
  });
}
};

const updateCart = async (req, res) => {
logger.info('Update Cart request received', { requestBody: req.body }); // Log the request body

const products = req.body.products;
const user = req.params.id;

if (!products || !Array.isArray(products)) {
  return res.json({
    success: false,
    message: "Invalid payload format!",
  });
}

try {
  for (const product of products) {
    const { products, quantity } = product;

    const numericQuantity = parseInt(quantity, 10);

    if (isNaN(numericQuantity)) {
      return res.json({
        success: false,
        message: "Invalid quantity format!",
      });
    }

    const updatedCartItem = {
      quantity: numericQuantity,
      user: user,
      products: products,
    };

    const query = { user: user, products: products };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updatedItem = await Cart.findOneAndUpdate(
      query,
      updatedCartItem,
      options
    );

    logger.info(`Cart item updated successfully`, { userID: user, productID: products, updatedItem });
  }

  const updatedCartItems = await Cart.find({ user: user });

  res.json({
    success: true,
    message: "Cart items updated successfully",
    cartItems: updatedCartItems,
  });
} catch (error) {
  logger.error('Error in updateCart', { error: error.message });
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