const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
