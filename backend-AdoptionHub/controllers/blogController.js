const Blogs = require("../model/blogModel");
const cloudinary = require("cloudinary");


 
 /// step 1: check incoming data
const  createBlog = async (req, res) => {

     // step 1 : Check incomming data
  console.log(req.body);
  console.log(req.files);

      const { blogTitle, blogContent, blogAuthor, blogCategory, blogDate } =
        req.body;
      const { blogImage } = req.files;

      if (
        !blogTitle ||
        !blogContent ||
        !blogAuthor ||
        !blogCategory ||
        !blogDate ||
        !blogImage
      ) {
        return res.json({
          success: false,
          message: "Please fill all the fields.",
        });
      }
      
  // step 4 : try catch block
      try{
   // step 5 : upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        blogImage.path,
        {
          folder: "blogs",
          crop: "scale",
        }
      );

    // save the blogs
      const newBlog = new Blogs({
        blogTitle : blogTitle,
        blogContent: blogContent,
        blogAuthor: blogAuthor,
        blogCategory: blogCategory,
        blogImageUrl: uploadedImage.secure_url,
        blogDate: blogDate,
      });

      await newBlog.save();
      res.status(201).json({
        success: true,
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const getAllBlogs = async (req, res) => {
    try {
      const listOfBlogs = await Blogs.find();
      res.json({
        success: true,
        message : "Blogs fetched successfully",
        blogs : listOfBlogs,
      })
    } catch (error) {
      res.status(500).json("Server Error");
    }
  };

  const getSingleBlog = async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.json({
        message: "No record with given id:",
        success: false,
      });
    }
    try {
      const singleBlog = await Blogs.findById(id);
      res.json({
        success: true,
        message: "Blog Fetched",
        blog: singleBlog,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  };

  const updateBlog = async (req, res) => {

    // step 1 : Check incomming data
  console.log(req.body);
  console.log(req.files);
  // step 2 : destructuring
  
      const { blogTitle, blogContent, blogAuthor, blogCategory, blogDate } =
        req.body;
      const { blogImage } = req.files;
      const id = req.params.id;

      if (
        !blogTitle ||
        !blogContent||
        !blogAuthor||
        !blogCategory||
        !blogDate
      ){
        res.json({
          success: false,
          message: "Please fill all fields",
        });
      }
      try{
      if (blogImage) {
        let uploadedImage = await cloudinary.v2.uploader.upload(
          blogImage.path,
          {
            folder: "blogs",
            crop: "scale",
          }
        );


      const updatedBlog = {
        blogTitle : blogTitle,
        blogContent: blogContent,
        blogAuthor: blogAuthor,
        blogCategory: blogCategory,
        blogImageUrl: uploadedImage.secure_url,
        blogDate: blogDate,
      };

    await Blogs.findByIdAndUpdate(id, updatedBlog);
    res.json({
      success: true,
      message: "Updated Successfully",
      blog: updatedBlog,
    });
  } else {
    const updatedBlog = {
      blogTitle : blogTitle,
      blogContent: blogContent,
      blogAuthor: blogAuthor,
      blogCategory: blogCategory,
      blogDate: blogDate,
     
    };
    await Blogs.findByIdAndUpdate(id, updatedBlog);
    res.json({
      success: true,
      message: "Updated Successfully Without Image",
      blog: updatedBlog,
    });
  }
} catch (error) {
  console.log(error);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
}
};

const searchBlogs= async (req, res) => {
  try {
    const data = await Blogs.find({
      $or: [
        { blogTitle: { $regex: new RegExp(req.params.key, 'i') } },
        { blogAuthor: { $regex: new RegExp(req.params.key, 'i') } },
        { blogCategory: { $regex: new RegExp(req.params.key, 'i') } },
        { blogContent: { $regex: new RegExp(req.params.key, 'i') } },
      ]
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

  const deleteBlog = async (req, res) => {
    try {
      const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.json({
          success: false,
         message: "Blog post not found" ,
        });
      }
      res.json({
        success: true,
         message: "Blog post deleted" ,
        });
    } catch (err) {
      res.status(500).json({
        success: false,
      message: "server error",
      });
    }
};
//pagination
const getBlogPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 7;
  try {
    //all product fetch
    const blogs = await Blogs.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

      const totalBlogsCount = await Blogs.countDocuments();

    //if there is no product
    if (blogs.length === 0) {
      return res.json({
        success: false,
        message: "No Blog found",
      });
    }

    res.json({
      success: true,
      blogs: blogs,
      totalPages: Math.ceil(totalBlogsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getUserBlogPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 4;
  try {
    //all blog fetch
    const blogs = await Blogs.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

      const totalBlogsCount = await Blogs.countDocuments();

    //if there is no product
    if (blogs.length === 0) {
      return res.json({
        success: false,
        message: "No Blog found",
      });
    }

    res.json({
      success: true,
      blogs: blogs,
      totalPages: Math.ceil(totalBlogsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getBlogCount = async (req, res) => {
  try {
    const totalBlogsCount = await Blogs.countDocuments();
    res.json({
      success: true,
      totalBlogsCount: totalBlogsCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports ={
  createBlog,
  updateBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  getBlogPagination,
  getUserBlogPagination,
  searchBlogs,
  getBlogCount,
};
