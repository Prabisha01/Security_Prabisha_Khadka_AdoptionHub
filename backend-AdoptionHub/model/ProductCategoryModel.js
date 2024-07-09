const mongoose = require("mongoose");

const productCatSchema = new mongoose.Schema({
  productCategory: {
    type: String,
    required: true,
    trim: true,
  },
  productCategoryImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

const ProductCategory = mongoose.model("productCategory", productCatSchema);
module.exports = ProductCategory;
