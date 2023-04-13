const express = require('express');
const router = express.Router();
const controller = require("../controllers/notificationController")

router.post("/createNotification" , controller.createNotification)
router.get("/getAllNotifications" , controller.getAllNotifications)
router.get("/getNotificationsForAllUsers" , controller.getNotificationsForAllUsers)
router.get("/getNotificationsOfSpecificUser", controller.getNotificationsOfSpecificUser)
router.delete("/deleteNotification", controller.deleteNotification)

module.exports= router;