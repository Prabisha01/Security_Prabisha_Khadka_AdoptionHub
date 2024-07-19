const Story = require("../model/storyModel");
const cloudinary = require("cloudinary");

const createStory = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const { fullName, email, story, user } = req.body;

  const { storyImageUrl } = req.files;

  if (!fullName || !email || !story || !user || !storyImageUrl) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      storyImageUrl.path,
      {
        folder: "Story",
        crop: "scale",
      }
    );

    const newStory = new Story({
      fullName: fullName,
      email: email,
      story: story,
      user: user,
      storyImageUrl: uploadedImage.secure_url,
    });

    await newStory.save();
    res.status(200).json({
      success: true,
      message: "Story created successfully",
      data: newStory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const getAllStory = async (req, res) => {
  try {
    const listOfStory = await Story.find().populate("user");
    const fewStory = listOfStory.slice(0, 5);
    return res.json({
      success: true,
      message: "Story fetched successfully",
      story: listOfStory,
      fewStory: fewStory,
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

const getSingleStory = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      success: false,
      message: "Story id is required!",
    });
  }
  try {
    const singleStory = await Story.findById(id);
    res.json({
      success: true,
      message: "Story fetched successfully",
      product: singleStory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const deleteStory = async (req, res) => {
  try {
    const deleteStory = await Story.findByIdAndDelete(req.params.id);
    if (!deleteStory) {
      return res.json({
        success: false,
        message: "Story not found",
      });
    }
    res.json({
      success: true,
      message: "Story deleted Sucesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};


module.exports = {
  createStory,
  getAllStory,
  getSingleStory,
  deleteStory,
};
