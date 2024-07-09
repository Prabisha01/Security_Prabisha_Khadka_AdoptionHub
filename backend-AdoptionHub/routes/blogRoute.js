const router = require('express').Router();
const blogController = require("../controllers/blogController");
const { authGuardAdmin } = require('../middleware/authGuard');

// Create Blog API
router.post('/create_blog', authGuardAdmin, blogController.createBlog)

//get all blog API
router.get("/get_blog", blogController.getAllBlogs)


//Get single blog API 
router.get("/get_blog/:id" , blogController.getSingleBlog)

//update blog API
router.put("/update_blog/:id",authGuardAdmin,  blogController.updateBlog)


//delete delete API
router.delete("/delete_blog/:id",  authGuardAdmin, blogController.deleteBlog)

//get pagination
router.get("/get_blog_pagination" , blogController.getBlogPagination)

//get pagination
router.get("/get_user_blog_pagination" , blogController.getUserBlogPagination)

//search
router.get("/search/:key" , blogController.searchBlogs)

//search
router.get("/blogs/count" , blogController.getBlogCount)

module.exports = router;