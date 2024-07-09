const Users = require("../model/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const res = require("express/lib/response");
const path = require("path");
const fs = require("fs");

const sendResetPasswordMail = async (fullName, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      // Configure SMTP settings
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_Password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email, // User's email
      subject: "Reset the Password",
      html:
        "Hi " +
        fullName +
        ', Please copy the link and <a href="http://10.12.1.59:3000/reset_password/' +
        token +
        '">click here</a> to reset your password',
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error); // Log the specific error
      } else {
        console.log("Mail has been sent :- ", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Step 1: Check if data is coming or not
    console.log(req.body);
    // Step 2: Destructure the data
    const { fullName, email, password } = req.body;

    // Step 3: Validate the incoming data
    if (!fullName || !email || !password) {
      return res.json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    // Step 5: Check existing user
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    // Step 6: Password encryption
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    // Step 7: Create new user
    const newUser = new Users({
      fullName: fullName,
      email: email,
      password: encryptedPassword,
    });

    // Step 8: Save user and respond
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message, // Include the error message for debugging
    });
  }
};

const loginUser = async (req, res) => {
  // Step 1 : Check if data is coming or not
  console.log(req.body);

  // step 2 : Destructure the data
  const { email, password } = req.body;

  // step 3 : validate the incomming data
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  // step 4 : try catch block
  try {
    // step 5 : Find user
    const user = await Users.findOne({ email: email }); // user store all the data of user
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists.",
      });
    }
    // Step 6 : Check password
    const passwordToCompare = user.password;
    const isMatch = await bcrypt.compare(password, passwordToCompare);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password does not match",
      });
    }

    // Step 7 : Create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET
    );

    // Step 8 : Send Response
    res.status(200).json({
      success: true,
      token: token,
      userData: user,
      message: "Welcome to Adoption Hub",
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
const getUserPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 8;
  try {
    //all user fetch
    const users = await Users.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

    const totalUsersCount = await Users.countDocuments();
    //if there is no product
    if (users.length === 0) {
      return res.json({
        success: false,
        message: "No Users found",
      });
    }

    res.json({
      success: true,
      users: users,
      totalPages: Math.ceil(totalUsersCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//function for getting all the product
const getAllUsers = async (req, res) => {
  try {
    const listOfUsers = await Users.find();
    res.json({
      success: true,
      message: "User Fetched Successfully",
      users: listOfUsers,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

// get product by id
const getSingleUsers = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      message: "No record with given id:",
      success: false,
    });
  }
  try {
    const singleUser = await Users.findById(id);
    res.json({
      success: true,
      message: "User Fetched",
      user: singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const updateUser = async (req, res) => {
  // step 1: Check incoming data
  console.log(req.body);
  console.log(req.files);

  // step 2: Destructuring
  const { fullName, email } = req.body;
  const { userImage } = req.files;

  // destructure id from URL
  const id = req.params.id;

  // step 3: Validating
  if (!fullName || !email) {
    return res.json({
      success: false,
      message: "Please enter all the fields",
    });
  }
  try {
    if (userImage) {
      let uploadedImage = await cloudinary.v2.uploader.upload(userImage.path, {
        folder: "users",
        crop: "scale",
      });

      const updatedUser = {
        fullName: fullName,
        email: email,
        userImageUrl: uploadedImage.secure_url,
      };
      await Users.findByIdAndUpdate(id, updatedUser);
      res.json({
        success: true,
        message: "Updated Successfully",
        user: updatedUser,
      });
    } else {
      const updatedUser = {
        fullName: fullName,
        email: email,
      };
      await Users.findByIdAndUpdate(id, updatedUser);
      res.json({
        success: true,
        message: "Updated Successfully Without Image",
        user: updatedUser,
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

const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Fetch the user by ID
    const user = await Users.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted Sucesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const userData = await Users.findOne({ email: req.body.email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await Users.updateOne(
        { email: req.body.email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(userData.fullName, userData.email, randomString);
      res
        .status(200)
        .send({ success: true, message: "Please check your inbox of mail" });
    } else {
      res
        .status(200)
        .send({ success: true, message: "This email does not exits" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const searchUsers = async (req, res) => {
  try {
    const data = await Users.find({
      $or: [
        { fullName: { $regex: new RegExp(req.params.key, "i") } },
        { email: { $regex: new RegExp(req.params.key, "i") } },
      ],
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await Users.findOne({ token: token });

    if (!tokenData) {
      res.status(200).send({ success: false, message: "The token is expired" });
    } else {
      // Ensure that the password is defined and not an empty string
      const { password } = req.body;
      if (!password || password.trim() === "") {
        return res
          .status(400)
          .send({ success: false, message: "Invalid password" });
      }

      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and clear the token
      const data = await Users.updateOne(
        { token: token },
        { $set: { password: hashedPassword, token: "" } }
      );

      res
        .status(200)
        .send({ success: true, message: "Password reset successfully" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getUserCount = async (req, res) => {
  try {
    const totalUsersCount = await Users.countDocuments();
    res.json({
      success: true,
      totalUsersCount: totalUsersCount,
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
  createUser,
  loginUser,
  updateUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
  getUserPagination,
  forgetPassword,
  resetPassword,
  getUserCount,
  changePassword,
  searchUsers,
};
