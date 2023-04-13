const express = require("express"),
router=express.Router();

const controller= require("../controllers/categoryController");

router.post("/createCategory",controller.createCategory)
router.get("/getAllCategories" , controller.getAllCategories);
router.get("/getCategoryById",controller.getCategoryById);
router.delete("/deleteCategory",controller.deleteCategory);
router.put("/updateCategory",controller.updateCategory)

module.exports=router