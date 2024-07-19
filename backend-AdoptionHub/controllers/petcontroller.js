const Pet = require("../model/petModel");
const cloudinary = require("cloudinary");

const addPet = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.body.status);

  try {
    const {
      fullName,
      email,
      number,
      address,
      petType,
      condition,
      purpose,
      description,
      user,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !number ||
      !address ||
      !petType ||
      !condition ||
      !purpose ||
      !description ||
      !user
    ) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (req.body.status === "found") {
      const {
        petImageUrlOne,
        petImageUrlTwo,
        petImageUrlThree,
        petImageUrlFour,
      } = req.files;

      if (
        !petImageUrlOne ||
        !petImageUrlTwo ||
        !petImageUrlThree ||
        !petImageUrlFour
      ) {
        return res.json({
          success: false,
          message: "All pet images are required",
        });
      }

      // Perform concurrent uploads
      const [
        uploadedImageUrlOne,
        uploadedImageUrlTwo,
        uploadedImageUrlThree,
        uploadedImageUrlFour,
      ] = await Promise.all([
        cloudinary.v2.uploader.upload(petImageUrlOne.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlTwo.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlThree.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlFour.path, {
          folder: "Pet",
          crop: "scale",
        }),
      ]);

      const newPet = new Pet({
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        purpose,
        status: req.body.status,
        description,
        user,
        petImageUrlOne: uploadedImageUrlOne.secure_url,
        petImageUrlTwo: uploadedImageUrlTwo.secure_url,
        petImageUrlThree: uploadedImageUrlThree.secure_url,
        petImageUrlFour: uploadedImageUrlFour.secure_url,
      });

      await newPet.save();
    } else if (req.body.status === "own") {
      const { petAge, petGender } = req.body;
      const {
        petImageUrlOne,
        petImageUrlTwo,
        petImageUrlThree,
        petImageUrlFour,
        petFileUrl,
      } = req.files;

      if (
        !petFileUrl ||
        !petImageUrlOne ||
        !petImageUrlTwo ||
        !petImageUrlThree ||
        !petImageUrlFour
      ) {
        return res.json({
          success: false,
          message: "All fields including images and file are required",
        });
      }

      // Perform concurrent uploads
      const [
        uploadedImageUrlOne,
        uploadedImageUrlTwo,
        uploadedImageUrlThree,
        uploadedImageUrlFour,
        uploadedFileUrl,
      ] = await Promise.all([
        cloudinary.v2.uploader.upload(petImageUrlOne.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlTwo.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlThree.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petImageUrlFour.path, {
          folder: "Pet",
          crop: "scale",
        }),
        cloudinary.v2.uploader.upload(petFileUrl.path, { folder: "Pet" }),
      ]);

      const newPet = new Pet({
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        status: req.body.status,
        purpose,
        description,
        petAge,
        petGender,
        petImageUrlOne: uploadedImageUrlOne.secure_url,
        petImageUrlTwo: uploadedImageUrlTwo.secure_url,
        petImageUrlThree: uploadedImageUrlThree.secure_url,
        petImageUrlFour: uploadedImageUrlFour.secure_url,
        petFileUrl: uploadedFileUrl.secure_url,
        user,
      });

      await newPet.save();
    }

    res.status(200).json({
      success: true,
      message: "Pet created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong. Please try again later.");
  }
};

const getAllPets = async (req, res) => {
  try {
    const Pets = await Pet.find();
    res.status(200).json({
      success: true,
      allPets: Pets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  addPet,
  getAllPets,
};
