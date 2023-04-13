const express = require('express');
const router = express.Router();
const controller = require("../controllers/listeningBookListController")

router.post("/addBookToListeningList" , controller.addBookToListeningList)
router.get("/GetAll" , controller.GetAll)
router.get("/GetListeningListOfUser" , controller.GetListeningListOfUser)
router.put("/changeListenedStatus", controller.changeListenedStatus)
router.put("/updateListeningListItem", controller.updateListeningListItem)
router.delete("/deleteListeningListItem", controller.deleteListeningListItem)
router.get("/getUserBooks_WithListenedStatus", controller.getBooksOfUser_WithListenedStatus)

module.exports= router;