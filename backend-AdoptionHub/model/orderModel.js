const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  items: [
    {
      plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
