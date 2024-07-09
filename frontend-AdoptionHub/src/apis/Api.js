import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// make separate header for authorization
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const testApi = () => Api.get("/test");
// http://localhost:5000/test

// create user api
export const createUserApi = (data) =>
  Api.post("/api/user/create", data, config);

// Login user Api
export const loginUserApi = (data) => Api.post("/api/user/login", data);

//contact Api
export const contactApi = (data) => Api.post("/api/contact/sendMessage", data);

// Create contact API
export const createContactApi = (data) =>
  Api.post("/api/contact/create_contact", data, config);

//get all contact
export const getAllContactApi = () => Api.get("/api/contact/get_contact");

//get single contact API
export const getSingleContactApi = (id) =>
  Api.get(`/api/contact/get_single_contact/${id}`);

//delete contact API
export const deleteContactApi = (id) =>
  Api.delete(`/api/contact/delete_contact/${id}`, config);

//get all user
export const getAllUserApi = () => Api.get("/api/user/get_user");

//get single contact API
export const getSingleUserApi = (id) =>
  Api.get(`/api/user/get_single_user/${id}`);

// create blog api
export const createBlogApi = (data) =>
  Api.post("/api/blog/create_blog", data, config);

//delete product API
export const deleteUserApi = (id) =>
  Api.delete(`/api/user/delete_user/${id}`, config);

//get single blog API
export const getSingleBlogApi = (id) => Api.get(`/api/blog/get_blog/${id}`);

// create blog api
export const deleteBlogApi = (id) =>
  Api.delete(`/api/blog/delete_blog/${id}`, config);
//update blog API with ID
export const updateBlogApi = (id, formData) =>
  Api.put(`/api/blog/update_product/${id}`, formData, config);

//update user API with ID
export const updateUserApi = (id, formData) =>
  Api.put(`/api/user/update_user/${id}`, formData, config);
//get all user
export const getAllBlogsApi = () => Api.get("/api/blog/get_blog");

// Create product API
export const createProductApi = (data) =>
  Api.post("/api/product/create", data);

// Create product API
export const createProductCatApi = (data) =>
  Api.post("/api/product/create-cat", data);

//get all products
export const getAllProductCatApi = () => Api.get("/api/product/get-all-cat");

//get all products
export const getAllProductApi = () => Api.get("/api/product/get_products");

//get single product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);

//update product API with ID
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);

export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);

export const deleteProductCatApi = (id) =>
  Api.delete(`/api/product/delete-cat/${id}`, config);


// Forgot Password API
export const forgotPasswordApi = (data) =>
  Api.post(`/api/user/forget_password`, data);

// Reset Password API
export const resetPasswordApi = (token, data) =>
  Api.post(`/api/user/reset_password/${token}`, data, config);

// Change Password API
// changePasswordApi function in Api.js
export const changePasswordApi = (id, data) =>
  Api.put(`/api/user/change_password/${id}`, data, config);

//blog pagination
export const getBlogPaginationApi = (page) =>
  Api.get(`/api/blog/get_blog_pagination?page=${page}`, config);

//product pagination
export const getProductPaginationApi = (page) =>
  Api.get(`/api/product/get_product_pagination?page=${page}`, config);

//product pagination
export const getUserProductPaginationApi = (page) =>
  Api.get(`/api/product/get_user_product_pagination?page=${page}`, config);

//blog user pagination
export const getUserBlogPaginationApi = (page) =>
  Api.get(`/api/blog/get_user_blog_pagination?page=${page}`, config);

//user pagination
export const getUserPaginationApi = (page) =>
  Api.get(`/api/user/get_user_pagination?page=${page}`, config);

//contact pagination
export const getContactPaginationApi = (page) =>
  Api.get(`/api/contact/get_contact_pagination?page=${page}`, config);

//search contact
export const searchContactsApi = (searchQuery) =>
  Api.get(`/api/contact/search/${searchQuery}`, config);

//search user
export const searchUsersApi = (searchQuery) =>
  Api.get(`/api/user/search/${searchQuery}`, config);

//search blog
export const searchBlogsApi = (searchQuery) =>
  Api.get(`/api/blog/search/${searchQuery}`, config);

//search search
export const searchProductsApi = (searchQuery) =>
  Api.get(`/api/product/search/${searchQuery}`, config);

// Add a new API function to fetch user's wishlist
export const getWishlistApi = (id) =>
  Api.get(`/api/wishlist/get_wishlists/${id}`, config);

// Add a new API function to add a product to the wishlist
export const addToWishlistApi = (data) =>
  Api.post("/api/wishlist/addToWish", data, config);

// Add a new API function to remove a product from the wishlist
export const removeFromWishlistApi = (id) =>
  Api.delete(`/api/wishlist/remove/${id}`, config);

//add to cart
export const addToCartApi = (data) =>
  Api.post("/api/addtocart/add_to_cart", data);

//getallcart
export const getAllCartApi = (id) => Api.get(`/api/addtocart/get_carts/${id}`);

//remove cart
export const removeCart = (id) =>
  Api.delete(`/api/addtocart/delete_cart/${id}`);

//updatecart
export const updateCart = (id, formData) =>
  Api.put(`/api/addtocart/update_cart/${id}`, formData, config);

//user count
export const getUserCountApi = () => Api.get("/api/user/users/count");

//Contact count
export const getContactCountApi = () => Api.get("/api/contact/contacts/count");

//blog count
export const getBlogCountApi = () => Api.get("/api/blog/blogs/count");

//product count
export const getProductsCountApi = () => Api.get("/api/product/products/count");

//notification
export const createNotificationApi = (data) =>
  Api.post("/api/notification/create_notification", data, config);

//order
export const createOrderApi = (data) =>
  Api.post("/api/order/createOrder", data, config);

//get order
export const getOrder = (id) => Api.get(`/api/order/getOrder/${id}`, config);

//get all
export const getAllOrder = () => Api.get(`/api/order/get_orders`);

//get all notification
export const getallnotification = () =>
  Api.get("/api/notification/get_notification", config);



// get all aplication
export const getAllApplication = () => Api.get("/api/application/get_applications");

// Create product API
export const createApplication = (data) =>
  Api.post("/api/application/create-application", data);
