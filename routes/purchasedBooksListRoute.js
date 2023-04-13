const express = require('express');
const router = express.Router();
const controller = require("../controllers/purchasedBookListController")

router.post("/addBookInPurchasedList" , controller.addBookInPurchasedList)
router.get("/getAll" , controller.getAll)
router.get("/getUserPurchasedList" , controller.getUserPurchasedList)
router.get("/getUserAudioPurchasedList" , controller.getUserAudioPurchasedList)
router.get("/getUserEbookPurchasedList" , controller.getUserEbookPurchasedList)
router.put("/changeRead_listened_status", controller.changeRead_listened_status)
router.put("/updatePurchasedListItem", controller.updatePurchasedListItem)
router.delete("/deletePurchasedListItem", controller.deletePurchasedListItem)

module.exports= router;