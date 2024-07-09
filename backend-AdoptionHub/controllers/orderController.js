const Order = require("../model/orderModel");
const Products = require("../model/productModel");
const Users = require("../model/userModels")

const createOrder = async (req, res) => {
  const id = req.user.id;

  const { userId, productIds, cartIds, quantities, totalPrices } = req.body;

  if (!userId || !productIds || !cartIds || !quantities || !totalPrices) {
    const missingFields = [
      'userId',
      'productIds',
      'cartIds',
      'quantities',
      'totalPrices',
    ].filter((field) => !req.body[field]);

    return res.json({
      success: false,
      message: `Please provide all the details, including quantities,  and total prices. Missing fields: ${missingFields.join(
        ', '
      )}`,
    });
  }

  const uniqueIdentifier = Math.floor(Math.random() * 10000000000); 
  const orderId = `ORDER-NO${uniqueIdentifier}`;

  try {
    const newOrders = await Promise.all(
      cartIds.map(async (cartId, index) => {
        const plantDetails = await Products.findById(productIds[index]);

        const quantity = quantities[index] || 1;
        const subtotal = quantity * plantDetails.plantPrice;

        const newOrder = new Order({
          userId: id,
          orderId: orderId, // Use the generated orderId
          orderDate: new Date().toISOString(),
          items: [
            {
              plantId: productIds[index],
              quantity: quantity,
              subtotal: subtotal,
              totalPrices: totalPrices[index] || 0,
            },
          ],
          totalPrice: subtotal,
        });

        await newOrder.save();
        return newOrder;
      })
    );

    res.status(200).json({
      success: true,
      message: 'Order Successful',
      data: newOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};


const getOrder = async (req, res) => {
  const userId = req.user.id;
  const requestedPage = parseInt(req.query._page, 5);
  const limit = parseInt(req.query._limit, 5);
  const skip = (requestedPage - 1) * limit;

  try {
    const userOrder = await Order.find({ userId: userId })
      .populate('items.plantId', 'plantPrice plantName plantImageUrl') 
      .skip(skip)
      .limit(limit);

    res.json({
      message: 'The product available',
      success: true,
      orders: userOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Server error');
  }
};


const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate({
      path: 'items.plantId',
      select: 'plantPrice plantName plantImageUrl',
    })
    .populate({
      path: 'userId',
      select: 'fullName',
    });
    

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getAllOrder
};
