const Contacts = require("../model/contactModel");
const nodemailer = require("nodemailer");
const { sendEmailController } = require("./sendEmailController");

const sendMessage = async (req, res) => {
  // Step 1: Check if data is coming or not
  console.log(req.body);

  // Step 2: Destructure the data
  const { contactName, contactEmail, contactMessage } = req.body;

  // Step 3: Validate the incoming data
  if (!contactName || !contactEmail || !contactMessage) {
    return res.json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  try {
    const sendEmail = await sendEmailController(
      contactEmail,
      "Contact Us",
      "Thank You for Reaching To us!!"
    );

    if (sendEmail) {
      const newContact = await Contacts.create({
        contactName,
        contactEmail,
        contactMessage,
      }).catch((error) => {
        console.error("Error in saving contact:", error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while saving the contact",
          error: error.message,
        });
      });

      return res.json({
        success: true,
        message: "Message sent successfully",
      });
    }
  } catch (error) {
    console.error("Error in sending email:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending the email",
      error: error.message,
    });
  }
};

const searchContacts = async (req, res) => {
  try {
    const data = await Contacts.find({
      $or: [
        { contactEmail: { $regex: new RegExp(req.params.key, "i") } },
        { contactMessage: { $regex: new RegExp(req.params.key, "i") } },
        { contactName: { $regex: new RegExp(req.params.key, "i") } },
      ],
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getContactPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 8;
  try {
    //all product fetch
    const contacts = await Contacts.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

    const totalContactsCount = await Contacts.countDocuments();

    //if there is no product
    if (contacts.length === 0) {
      return res.json({
        success: false,
        message: "No Contact found",
      });
    }

    res.json({
      success: true,
      contacts: contacts,
      totalPages: Math.ceil(totalContactsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getAllContacts = async (req, res) => {
  try {
    const listOfContacts = await Contacts.find();
    res.json({
      success: true,
      message: "Contact Fetched Successfully",
      contacts: listOfContacts,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

// get product by id
const getSingleContact = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      message: "No record with given id:",
      success: false,
    });
  }
  try {
    const singleContact = await Contacts.findById(id);
    res.json({
      success: true,
      message: "Contact Fetched",
      contact: singleContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};
const deleteContact = async (req, res) => {
  try {
    const deleteContact = await Contacts.findByIdAndDelete(req.params.id);
    if (!deleteContact) {
      return res.json({
        success: false,
        message: "Contact not found",
      });
    }
    res.json({
      success: true,
      message: "Contact deleted Sucesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
const getContactCount = async (req, res) => {
  try {
    const totalContactsCount = await Contacts.countDocuments();
    res.json({
      success: true,
      totalContactsCount: totalContactsCount,
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
  sendMessage,
  getAllContacts,
  getSingleContact,
  deleteContact,
  getContactPagination,
  searchContacts,
  getContactCount,
};
