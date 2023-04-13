const express = require('express');
const router = express.Router();
const controller = require("../controllers/downloadedController")

router.post("/addBookInDownloadedList" , controller.addBookInDownloadedList)
router.get("/getAll" , controller.getAll)
router.get("/getUserDownloadedList" , controller.getUserDownloadedList)
router.get("/getUserAudioDownloadedList" , controller.getUserAudioDownloadedList)
router.get("/getUserEbookDownloadedList" , controller.getUserEbookDownloadedList)
router.put("/changeRead_listened_status", controller.changeRead_listened_status)
router.put("/updateDownloadedListItem", controller.updateDownloadedListItem)
router.delete("/deleteDownloadedListItem", controller.deleteDownloadedListItem)

module.exports= router;