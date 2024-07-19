const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, required: true },
      },
    ],
    quantity: { type: Number },
    price: { type: Number },
    is_payed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
