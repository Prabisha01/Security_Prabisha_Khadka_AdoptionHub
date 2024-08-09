const ProductCategory = require("../model/productCategoryModel");
const Products = require("../model/productModel");
const cloudinary = require("cloudinary");
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

const createProduct = async (req, res) => {
  logger.info('Create Product request received', { requestBody: req.body, requestFiles: req.files });

  const { productName, productPrice, productDescription, productCategory } = req.body;
  const { productImageUrl } = req.files;

  if (!productName || !productPrice || !productDescription || !productCategory || !productImageUrl) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      productImageUrl.path,
      {
        folder: "products",
        crop: "scale",
      }
    );

    const newProduct = new Products({
      productName,
      productPrice,
      productDescription,
      productCategory,
      productImageUrl: uploadedImage.secure_url,
    });

    await newProduct.save();
    logger.info('Product created successfully', { productId: newProduct._id });

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    logger.error('Error creating product', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const createProductCategory = async (req, res) => {
  logger.info('Create Product Category request received', { requestBody: req.body });

  const { productCategory } = req.body;
  const { productCategoryImageUrl } = req.files;

  if (!productCategory || !productCategoryImageUrl) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      productCategoryImageUrl.path,
      {
        folder: "ProductCategory",
        crop: "scale",
      }
    );

    const newCat = new ProductCategory({
      productCategory,
      productCategoryImageUrl: uploadedImage.secure_url,
    });

    await newCat.save();
    logger.info('Product Category created successfully', { categoryId: newCat._id });

    res.status(200).json({
      success: true,
      message: "Product Category created successfully",
      data: newCat,
    });
  } catch (error) {
    logger.error('Error creating product category', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Products.find().populate("productCategory");
    const fewProducts = listOfProducts.slice(0, 5);

    logger.info('Fetched all products', { totalProducts: listOfProducts.length });

    return res.json({
      success: true,
      message: "Products fetched successfully",
      products: listOfProducts,
      fewProducts,
    });
  } catch (error) {
    logger.error('Failed to fetch products', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllCat = async (req, res) => {
  try {
    const listOfProducts = await ProductCategory.find();

    logger.info('Fetched all product categories', { totalCategories: listOfProducts.length });

    res.json({
      success: true,
      message: "Products fetched successfully",
      productCategory: listOfProducts,
    });
  } catch (error) {
    logger.error('Error fetching product categories', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const deleteProductCat = async (req, res) => {
  try {
    const deleteProduct = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    logger.info('Product Category deleted successfully', { categoryId: req.params.id });

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    logger.error('Error deleting product category', { error: error.message });
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      success: false,
      message: "Product id is required!",
    });
  }
  try {
    const singleProduct = await Products.findById(id);

    logger.info('Fetched single product', { productId: id });

    res.json({
      success: true,
      message: "Product fetched successfully",
      product: singleProduct,
    });
  } catch (error) {
    logger.error('Error fetching product', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Products.find({ productCategory: category });

    if (!products || products.length === 0) {
      return res.json({
        success: false,
        message: "No products found for the specified category.",
      });
    }

    logger.info('Fetched products by category', { category });

    res.json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    logger.error('Error fetching products by category', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProductPagination = async (req, res) => {
  const requestedPage = req.query.page;
  const resultPerPage = 5;

  try {
    const products = await Products.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalProductsCount = await Products.countDocuments();

    logger.info('Product pagination fetched', { page: requestedPage, totalProducts: totalProductsCount });

    if (products.length === 0) {
      return res.json({
        success: false,
        message: "No product found",
      });
    }

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(totalProductsCount / resultPerPage),
    });
  } catch (error) {
    logger.error('Error fetching product pagination', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getUserProductPagination = async (req, res) => {
  const requestedPage = req.query.page;
  const resultPerPage = 4;

  try {
    const products = await Products.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalProductsCount = await Products.countDocuments();

    logger.info('User product pagination fetched', { page: requestedPage, totalProducts: totalProductsCount });

    if (products.length === 0) {
      return res.json({
        success: false,
        message: "No product found",
      });
    }

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(totalProductsCount / resultPerPage),
    });
  } catch (error) {
    logger.error('Error fetching user product pagination', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { productName, productPrice, productDescription, productCategory } = req.body;
  const files = req.files;
  const id = req.params.id;

  try {
    const existingProduct = await Products.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const uploadImage = async (imageFile) => {
      if (imageFile) {
        const uploadedResponse = await cloudinary.uploader.upload(
          imageFile.path,
          {
            folder: "products",
            crop: "scale",
          }
        );
        return uploadedResponse.secure_url;
      }
    };

    let updateData = {
      ...(productName && { productName }),
      ...(productPrice && { productPrice }),
      ...(productDescription && { productDescription }),
      ...(productCategory && { productCategory }),
    };

    if (files) {
      const imageKeys = Object.keys(files);
      for (let key of imageKeys) {
        const imageUrl = await uploadImage(files[key]);
        if (imageUrl) {
          updateData[key] = imageUrl;
        }
      }
    }

    await Products.findByIdAndUpdate(id, updateData, { new: true });

    logger.info('Product updated successfully', { productId: id });

    res.json({
      success: true,
      message: "Product updated successfully",
      updateData,
    });
  } catch (error) {
    logger.error('Error updating product', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const keyRegex = new RegExp(req.params.key, "i");
    const isNumeric = !isNaN(req.params.key); // Check if the search key is a number

    const data = await Products.find({
      $or: [
        { productName: { $regex: keyRegex } },
        { productCategory: { $regex: keyRegex } },
        { productDescription: { $regex: keyRegex } },
        isNumeric ? { productPrice: req.params.key } : null,
      ].filter(Boolean), // Remove null values from the array
    });

    logger.info('Products search performed', { searchKey: req.params.key, resultCount: data.length });

    res.send(data);
  } catch (error) {
    logger.error('Error searching products', { error: error.message });
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    logger.info('Product deleted successfully', { productId: req.params.id });

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    logger.error('Error deleting product', { error: error.message });
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const getProductCount = async (req, res) => {
  try {
    const totalProductsCount = await Products.countDocuments();

    logger.info('Product count retrieved', { totalProductsCount });

    res.json({
      success: true,
      totalProductsCount,
    });
  } catch (error) {
    logger.error('Error retrieving product count', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProduct,
  createProductCategory,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllCat,
  deleteProductCat,
  getProductPagination,
  getUserProductPagination,
  searchProducts,
  getProductsByCategory,
  getProductCount,
};
