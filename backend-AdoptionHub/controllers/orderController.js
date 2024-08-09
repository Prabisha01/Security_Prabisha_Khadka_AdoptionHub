const Order = require("../model/orderModel");
const Products = require("../model/productModel");
const Users = require("../model/userModels");
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

const createOrder = async (req, res) => {
  const { user, products: rawProducts, price } = req.body;
  logger.info('Create Order request received', { requestBody: req.body });

  let products;
  try {
    products =
      typeof rawProducts === "string" ? JSON.parse(rawProducts) : rawProducts;
  } catch (error) {
    logger.error('Invalid products format', { error: error.message });
    return res.json({ message: "Invalid products format, must be an array" });
  }

  if (!user || !products || !products.length) {
    return res.json({ message: "Missing user or products information" });
  }

  if (products.some((product) => !product || product.quantity == null)) {
    return res.json({
      message: "Each product entry must include a product ID and a quantity",
    });
  }

  try {
    const newOrder = new Order({
      user,
      products,
      price,
      is_payed: true,
    });

    await newOrder.save();

    logger.info('Order placed successfully', { orderId: newOrder._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    logger.error('Error creating order', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

const getMyOrder = async (req, res) => {
  const userId = req.params.id;
  const requestedPage = parseInt(req.query._page, 5);
  const limit = parseInt(req.query._limit, 5);
  const skip = (requestedPage - 1) * limit;

  try {
    const userOrder = await Order.find({ user: userId })
      .populate({
        path: "products.product",
      })
      .populate({
        path: "user",
        select: "fullName email userImageUrl",
      })
      .skip(skip)
      .limit(limit);

    logger.info('User orders retrieved', { userId, orderCount: userOrder.length });

    res.json({
      message: "The product available",
      success: true,
      orders: userOrder,
    });
  } catch (error) {
    logger.error('Error retrieving user orders', { error: error.message });
    res.status(500).json("Server error");
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "products.product",
      })
      .populate({
        path: "user",
        select: "fullName email userImageUrl",
      });

    logger.info('All orders retrieved', { orderCount: orders.length });
    orders.forEach((order) => {
      logger.info('Order products', { orderId: order._id, products: order.products });
    });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    logger.error('Error retrieving all orders', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrder,
  getAllOrder,
};
