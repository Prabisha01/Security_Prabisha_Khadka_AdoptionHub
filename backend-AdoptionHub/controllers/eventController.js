const Events = require("../model/eventModel");
const cloudinary = require("cloudinary");

/// step 1: check incoming data
const createEvent = async (req, res) => {
  // step 1 : Check incomming data
  console.log(req.body);
  console.log(req.files);

  const { eventTitle, eventContent, organizedBy, eventDate } = req.body;
  const { eventImageOneUrl, eventImageTwoUrl, eventFileUrl } = req.files;

  if (!eventTitle || !eventContent || !organizedBy || !eventDate) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  // step 4 : try catch block
  try {
    // step 5 : upload image to cloudinary
    const uploadedImageOne = await cloudinary.v2.uploader.upload(
      eventImageOneUrl.path,
      {
        folder: "events",
        crop: "scale",
      }
    );
    const uploadedImageTwo = await cloudinary.v2.uploader.upload(
      eventImageTwoUrl.path,
      {
        folder: "events",
        crop: "scale",
      }
    );

    const uploadEventFileUrl = await cloudinary.v2.uploader.upload(
      eventFileUrl.path,
      {
        folder: "events",
        crop: "scale",
      }
    );

    // save the events
    const newEvent = new Events({
      eventTitle: eventTitle,
      eventContent: eventContent,
      organizedBy: organizedBy,
      eventImageOneUrl: uploadedImageOne.secure_url,
      eventImageTwoUrl: uploadedImageTwo.secure_url,
      eventFileUrl: uploadEventFileUrl.secure_url,
      eventDate: eventDate,
    });

    await newEvent.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const listOfEvents = await Events.find();
    res.json({
      success: true,
      message: "Events fetched successfully",
      events: listOfEvents,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const getSingleEvent = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      message: "No record with given id:",
      success: false,
    });
  }
  try {
    const singleEvent = await Events.findById(id);
    res.json({
      success: true,
      message: "Event Fetched",
      event: singleEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const updateEvent = async (req, res) => {
  // step 1 : Check incomming data
  console.log(req.body);
  console.log(req.files);
  // step 2 : destructuring

  const { eventTitle, eventContent, organizedBy, eventDate } = req.body;
  const { eventImageOneUrl, eventImageTwoUrl, eventFileUrl } = req.files;

  const id = req.params.id;

  if (!eventTitle || !eventContent || !organizedBy || !eventDate) {
    res.json({
      success: false,
      message: "Please fill all fields",
    });
  }
  try {
    if (eventImageOneUrl) {
      const uploadedImageOne = await cloudinary.v2.uploader.upload(
        eventImageOneUrl.path,
        {
          folder: "events",
          crop: "scale",
        }
      );
    }
    if (eventImageTwoUrl) {
      const uploadedImageTwo = await cloudinary.v2.uploader.upload(
        eventImageTwoUrl.path,
        {
          folder: "events",
          crop: "scale",
        }
      );
    }
    if (eventFileUrl) {
      const uploadEventFileUrl = await cloudinary.v2.uploader.upload(
        eventFileUrl.path,
        {
          folder: "events",
          crop: "scale",
        }
      );

      // save the events
      const updatedEvent = new Events({
        eventTitle: eventTitle,
        eventContent: eventContent,
        organizedBy: organizedBy,
        eventImageOneUrl: uploadedImageOne.secure_url,
        eventImageTwoUrl: uploadedImageTwo.secure_url,
        eventFileUrl: uploadEventFileUrl.secure_url,
        eventDate: eventDate,
      });

      await Events.findByIdAndUpdate(id, updatedEvent);
      res.json({
        success: true,
        message: "Updated Successfully",
        event: updatedEvent,
      });
    } else {
      const updatedEvent = {
        eventTitle: eventTitle,
        eventContent: eventContent,
        organizedBy: organizedBy,
        eventDate: eventDate,
      };
      await Events.findByIdAndUpdate(id, updatedEvent);
      res.json({
        success: true,
        message: "Updated Successfully Without Image",
        event: updatedEvent,
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

const searchEvents = async (req, res) => {
  try {
    const data = await Events.find({
      $or: [
        { eventTitle: { $regex: new RegExp(req.params.key, "i") } },
        { organizedBy: { $regex: new RegExp(req.params.key, "i") } },
        { eventCategory: { $regex: new RegExp(req.params.key, "i") } },
        { eventContent: { $regex: new RegExp(req.params.key, "i") } },
      ],
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Events.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.json({
        success: false,
        message: "Event post not found",
      });
    }
    res.json({
      success: true,
      message: "Event post deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
//pagination
const getEventPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 7;
  try {
    //all product fetch
    const events = await Events.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

    const totalEventsCount = await Events.countDocuments();

    //if there is no product
    if (events.length === 0) {
      return res.json({
        success: false,
        message: "No Event found",
      });
    }

    res.json({
      success: true,
      events: events,
      totalPages: Math.ceil(totalEventsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getUserEventPagination = async (req, res) => {
  // res.send('Pagination')
  //step 1: get pageNo form frontend
  const requestedPage = req.query.page;

  //step 2:  result per page
  const resultPerPage = 4;
  try {
    //all event fetch
    const events = await Events.find({})
      .skip((requestedPage - 1) * resultPerPage) //no of skips
      .limit(resultPerPage); //limiting

    const totalEventsCount = await Events.countDocuments();

    //if there is no product
    if (events.length === 0) {
      return res.json({
        success: false,
        message: "No Event found",
      });
    }

    res.json({
      success: true,
      events: events,
      totalPages: Math.ceil(totalEventsCount / resultPerPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getEventCount = async (req, res) => {
  try {
    const totalEventsCount = await Events.countDocuments();
    res.json({
      success: true,
      totalEventsCount: totalEventsCount,
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
  createEvent,
  updateEvent,
  getAllEvents,
  getSingleEvent,
  deleteEvent,
  getEventPagination,
  getUserEventPagination,
  searchEvents,
  getEventCount,
};
