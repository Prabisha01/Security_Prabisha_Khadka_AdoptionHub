const Story = require("../model/storyModel");
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

const createStory = async (req, res) => {
  logger.info('Create Story request received', { requestBody: req.body, requestFiles: req.files });

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
      fullName,
      email,
      story,
      user,
      storyImageUrl: uploadedImage.secure_url,
    });

    await newStory.save();
    logger.info('Story created successfully', { storyId: newStory._id });

    res.status(200).json({
      success: true,
      message: "Story created successfully",
      data: newStory,
    });
  } catch (error) {
    logger.error('Error creating story', { error: error.message });
    res.status(500).json("Server Error");
  }
};

const getAllStory = async (req, res) => {
  try {
    const listOfStory = await Story.find().populate("user");
    const fewStory = listOfStory.slice(0, 5);

    logger.info('Fetched all stories', { totalStories: listOfStory.length });

    return res.json({
      success: true,
      message: "Story fetched successfully",
      story: listOfStory,
      fewStory,
    });
  } catch (error) {
    logger.error('Failed to fetch stories', { error: error.message });
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

    logger.info('Fetched single story', { storyId: id });

    res.json({
      success: true,
      message: "Story fetched successfully",
      product: singleStory,
    });
  } catch (error) {
    logger.error('Error fetching story', { error: error.message });
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

    logger.info('Story deleted successfully', { storyId: req.params.id });

    res.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    logger.error('Error deleting story', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createStory,
  getAllStory,
  getSingleStory,
  deleteStory,
};
