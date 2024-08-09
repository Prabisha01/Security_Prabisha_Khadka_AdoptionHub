const Notification = require("../model/notificationModel");
const Users = require("../model/userModels");
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

const createNotification = async (req, res) => {
  const { title, description } = req.body;

  try {
    
    const firstUser = await Users.findOne();
    
    const userNotification = new Notification({
      user: firstUser._id,
      description: description,
      title: title,
    });

    let savedUserNotification = await userNotification.save();

    logger.info('Notification created successfully', { userId: firstUser._id, title, description });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      userNotification: savedUserNotification,
    });
  } catch (error) {
    logger.error('Error creating notification', { error: error.message });
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getNotifications = async (req, res) => {
  try {
  
    const userId = req.user._id;
    const { lastCheckedTimestamp, lastCheckedNotificationId } = req.body;

    let query = { user: userId };

    
    if (lastCheckedTimestamp) {
      query.createdAt = { $gt: new Date(lastCheckedTimestamp) };
    } else if (lastCheckedNotificationId) {
      query._id = { $gt: lastCheckedNotificationId };
    }

    
    const userNotifications = await Notification.find(query);

    logger.info('Notifications retrieved successfully', { userId, count: userNotifications.length });

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      notifications: userNotifications,
    });
  } catch (error) {
    logger.error('Error fetching notifications', { error: error.message });
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
