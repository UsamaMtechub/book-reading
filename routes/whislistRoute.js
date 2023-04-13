const express = require('express');
const router = express.Router();
const controller = require("../controllers/whisListController")

router.post("/addBookInWhisList" , controller.addBookInWhisList)
router.get("/getAll" , controller.getAll)
router.get("/getUserWhisList" , controller.getUserWhisList)
router.get("/getUserAudioWhisList" , controller.getUserAudioWhisList)
router.get("/getUserEbookWhisList" , controller.getUserEbookWhisList)
router.put("/changeRead_listened_status", controller.changeRead_listened_status)
router.put("/updateWhisListItem", controller.updateWhisListItem)
router.delete("/deleteWhisListItemId", controller.deleteWhisListItemId)

module.exports= router;