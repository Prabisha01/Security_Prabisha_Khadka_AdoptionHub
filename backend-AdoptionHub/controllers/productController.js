const ProductCategory = require("../model/ProductCategoryModel");
const Products = require("../model/productModel");
const cloudinary = require("cloudinary");

const createProduct = async (req, res) => {
  // step 1 : Check incomming data
  console.log(req.body);
  console.log(req.files);

  // step:2 destructuring
  const { productName, productPrice, productDescription, productCategory } =
    req.body;

  const { productImageUrl } = req.files;

  // step 3 : validate the data
  if (
    !productName ||
    !productPrice ||
    !productDescription ||
    !productCategory ||
    !productImageUrl
  ) {
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

    // save the products
    const newProduct = new Products({
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      productCategory: productCategory,
      productImageUrl: uploadedImage.secure_url,
    });

    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const createProductCategory = async (req, res) => {
  // step 1 : Check incomming data
  console.log(req.body);

  // step:2 destructuring
  const { productCategory } = req.body;

  const { productCategoryImageUrl } = req.files;

  // step 3 : validate the data
  if (!productCategory) {
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

    // save the products
    const newCat = new ProductCategory({
      productCategory: productCategory,
      productCategoryImageUrl: uploadedImage.secure_url,
    });

    await newCat.save();
    res.status(200).json({
      success: true,
      message: "Product Category created successfully",
      data: newCat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Products.find().populate("productCategory");
    return res.json({
      success: true,
      message: "Products fetched successfully",
      products: listOfProducts,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//function for getting all the product
const getAllCat = async (req, res) => {
  try {
    const listOfProducts = await ProductCategory.find();
    res.json({
      success: true,
      message: "Products fetched successfully",
      productCategory: listOfProducts,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const deleteProductCat = async (req, res) => {
  try {
    const deleteProduct = await ProductCategory.findByIdAndDelete(
      req.params.id
    );
    if (!deleteProduct) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }
    res.json({
      success: true,
      message: "Category deleted Sucesfully",
    });
  } catch (error) {
    console.log(error);
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
    res.json({
      success: true,
      message: "Products fetched successfully",
      product: singleProduct,
    });
  } catch (error) {
    console.log(error);
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

    res.json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//pagination
const getProductPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 5;
  try {
    //all product fetch
    const products = await Products.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

    const totalProductsCount = await Products.countDocuments();
    //if there is no product
    if (products.length === 0) {
      return res.json({
        success: false,
        message: "No product found",
      });
    }

    res.json({
      success: true,
      products: products,
      totalPages: Math.ceil(totalProductsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//pagination
const getUserProductPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 4;
  try {
    //all product fetch
    const products = await Products.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

    const totalProductsCount = await Products.countDocuments();
    //if there is no product
    if (products.length === 0) {
      return res.json({
        success: false,
        message: "No product found",
      });
    }

    res.json({
      success: true,
      products: products,
      totalPages: Math.ceil(totalProductsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { productName, productPrice, productDescription, productCategory } =
    req.body;
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

    res.json({
      success: true,
      message: "Product updated successfully",
      updateData,
    });
  } catch (error) {
    console.error(error);
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
        // Add more fields as needed
        isNumeric ? { productPrice: req.params.key } : null, // Example for searching by price (assuming productPrice is a number field)
      ].filter(Boolean), // Remove null values from the array
    });

    res.send(data);
  } catch (error) {
    console.error(error);
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
    res.json({
      success: true,
      message: "Product deleted Sucesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const getProductCount = async (req, res) => {
  try {
    const totalProductsCount = await Products.countDocuments();
    res.json({
      success: true,
      totalProductsCount: totalProductsCount,
    });
  } catch (error) {
    console.log(error);
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
