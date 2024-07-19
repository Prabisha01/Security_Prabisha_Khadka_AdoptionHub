const Order = require("../model/orderModel");
const Products = require("../model/productModel");
const Users = require("../model/userModels");

const createOrder = async (req, res) => {
  const { user, products: rawProducts, price } = req.body;
  console.log(req.body);

  let products;
  try {
    products =
      typeof rawProducts === "string" ? JSON.parse(rawProducts) : rawProducts;
  } catch (error) {
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

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
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

    res.json({
      message: "The product available",
      success: true,
      orders: userOrder,
    });
  } catch (error) {
    console.log(error);
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

    console.log(orders);

    // print all the product array of order
    orders.forEach((order) => {
      console.log(order.products);
    });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
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
