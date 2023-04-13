const express = require('express');
const router = express.Router();
const controller = require("../controllers/readingListController")

router.post("/addBookToReadingList" , controller.addBookToReadingList)
router.get("/GetAll" , controller.GetAll)
router.get("/GetReadingListOfUser" , controller.GetReadingListOfUser)
router.put("/changeReadStatus", controller.changeReadStatus)
router.put("/updateReadingListItem", controller.updateReadingListItem)
router.delete("/deleteReadingListItem", controller.deleteReadingListItem)
router.get("/getBooksOfUser_WithReadStatus", controller.getBooksOfUser_WithReadStatus)


module.exports= router;