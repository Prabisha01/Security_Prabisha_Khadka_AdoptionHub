const Notification = require("../model/notificationModel");
const Users = require("../model/userModels");

const createNotification = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Create a single notification for a specific user (e.g., the first user)
    const firstUser = await Users.findOne();
    
    const userNotification = new Notification({
      user: firstUser._id,
      description: description,
      title: title,
    });

    let savedUserNotification = await userNotification.save();

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      userNotification: savedUserNotification,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    // Assuming the user ID is available in the request object
    const userId = req.user._id;

    // Assuming you have a lastCheckedTimestamp or lastCheckedNotificationId on the frontend
    const { lastCheckedTimestamp, lastCheckedNotificationId } = req.body;

    let query = { user: userId };

    // Modify the query based on the last checked timestamp or notification ID
    if (lastCheckedTimestamp) {
      query.createdAt = { $gt: new Date(lastCheckedTimestamp) };
    } else if (lastCheckedNotificationId) {
      query._id = { $gt: lastCheckedNotificationId };
    }

    // Fetch notifications for the user
    const userNotifications = await Notification.find(query);

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      notifications: userNotifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
};
