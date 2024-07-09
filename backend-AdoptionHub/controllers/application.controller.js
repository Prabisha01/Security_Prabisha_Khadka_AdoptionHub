const Application = require("../model/applicationModel");
const cloudinary = require("cloudinary")

const createApplication = async (req, res) => {
  // step 1 : Check incoming data
  console.log(req.body);
  console.log(req.files);
  console.log(req.body.status)

  try {
    if (req.body.status === "found") {
      // step 2: Destructuring
      const {
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        purpose,
        description,
      } = req.body;

      if(!fullName|| !email || !number || !address || !petType || !condition || !purpose || !description) {
        return res.json({
          success: false,
          message: "Please fill all the fields for found pet application",
        });
      }

      const {
        petImageUrlOne,
        petImageUrlTwo,
        petImageUrlThree,
        petImageUrlFour,
      } = req.files;

      if (!petImageUrlOne) {
        return res.json({
          success: false,
          message: "petimageonenull",
        });
      }

      if (!petImageUrlTwo) {
        return res.json({
          success: false,
          message: "petimagetwonull",
        });
      }

      if (!petImageUrlThree) {
        return res.json({
          success: false,
          message: "petimagethreenull",
        });
      }

      if (!petImageUrlFour) {
        return res.json({
          success: false,
          message: "petimagefournull",
        });
      }

      let uploadedImageUrlOne = await cloudinary.v2.uploader.upload(
        petImageUrlOne.path,
        {
          folder: "Application",
          crop: "scale",
        }
      );

      const uploadedImageUrlTwo = await cloudinary.v2.uploader.upload(
        petImageUrlTwo.path,
        {
          folder: "Application",
          crop: "scale",
        }
      );

      const uploadedImageUrlThree = await cloudinary.v2.uploader.upload(
        petImageUrlThree.path,
        {
          folder: "Application",
          crop: "scale",
        }
      );

      const uploadedImageUrlFour = await cloudinary.v2.uploader.upload(
        petImageUrlFour.path,
        {
          folder: "Application",
          crop: "scale",
        }
      );

      // Save the pet application
      const newPet = new Application({
        fullName: fullName,
        email: email,
        number: number,
        address: address,
        petType: petType,
        condition: condition,
        purpose: purpose,
        description: description,
        petImageUrlOne: uploadedImageUrlOne.secure_url,
        petImageUrlTwo: uploadedImageUrlTwo.secure_url,
        petImageUrlThree: uploadedImageUrlThree.secure_url,
        petImageUrlFour: uploadedImageUrlFour.secure_url,
      });
      await newPet.save();
    } else if (req.body.status === "own") {
      // step 2: Destructuring
      const {
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        purpose,
        description,
        petAge,
        petGender,
      } = req.body;

      if(!fullName|| !email || !number || !address || !petType || !condition || !purpose || !description || !petAge || !petGender)
      {
        return res.json({
          success: false,
          message: "Please fill all the fields",
        });
      }

      const { petImageUrlFive, petFileUrl } = req.files;

      if (!petFileUrl) {
        return res.json({
          success: false,
          message: "pet file null",
        });
      }

      if (!petImageUrlFive) {
        return res.json({
          success: false,
          message: "petimagefivenull",
        });
      }

      let uploadedImageUrlFive = await cloudinary.v2.uploader.upload(
        petImageUrlFive.path,
        {
          folder: "Application",
          crop: "scale",
        }
      );

      let uploadedFileUrl = await cloudinary.v2.uploader.upload(
        petFileUrl.path,
        {
          folder: "Application",
        }
      );

      // Save the pet application
      const newPet = new Application({
        fullName: fullName,
        email: email,
        number: number,
        address: address,
        petType: petType,
        condition: condition,
        purpose: purpose,
        description: description,
        petAge: petAge,
        petGender: petGender,
        petImageUrlFive: uploadedImageUrlFive.secure_url,
        petFileUrl: uploadedFileUrl.secure_url,
      });
      await newPet.save();
    }
    res.status(200).json({
      success: true,
      message: "Pet application created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong. Please try again later.");
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  createApplication,
  getApplications,
};
