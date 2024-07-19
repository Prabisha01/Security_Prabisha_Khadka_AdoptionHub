const router = require('express').Router();
const notificationController = require("../controllers/notification");
const { authGuardAdmin, authGuard } = require('../middleware/authGuard');


router.post('/create_notification', authGuardAdmin, notificationController.createNotification)


router.get('/get_notification', authGuard, notificationController.getNotifications)


module.exports = router;