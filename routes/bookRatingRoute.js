const express = require('express');
const router = express.Router();
const controller = require("../controllers/bookRatingController")

router.post("/createBookRating" , controller.rateBook)
router.get('/getRatingOfBook' ,controller.getRatingOfBook)


module.exports= router;