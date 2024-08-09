const Contacts = require("../model/contactModel");
const winston = require('winston');
const { sendEmailController } = require("./sendEmailController");


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

const sendMessage = async (req, res) => {
  logger.info('Send Message request received', { requestBody: req.body });

  const { contactName, contactEmail, contactMessage } = req.body;

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
        logger.error('Error in saving contact', { error: error.message });
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
    logger.error('Error in sending email', { error: error.message });
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
    logger.error('Error in searchContacts', { error: error.message });
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getContactPagination = async (req, res) => {
  const requestedPage = req.query.page;
  const resultPerPage = 8;

  try {
    const contacts = await Contacts.find({})
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);

    const totalContactsCount = await Contacts.countDocuments();

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
    logger.error('Error in getContactPagination', { error: error.message });
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
    logger.error('Error in getAllContacts', { error: error.message });
    res.status(500).json("Server Error");
  }
};

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
    logger.error('Error in getSingleContact', { error: error.message });
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
    logger.error('Error in deleteContact', { error: error.message });
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
    logger.error('Error in getContactCount', { error: error.message });
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
