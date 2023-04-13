const express = require('express');
const router = express.Router();
const controller = require("../controllers/aboutUsController")

router.post("/createAboutUs" , controller.createAboutUs)
router.get("/getAllAboutUs" , controller.getAllAboutUs)
router.get("/getAboutUsById" , controller.getAboutUsById)
router.put("/updateAboutUs", controller.updateAboutUs)
router.delete("/deleteAboutUs/:aboutUsId", controller.deleteAboutUs)

module.exports= router;