
const mongoose = require('mongoose');
const categoryModel = require("../models/categoryModel");

exports.createCategory = async (req,res)=>{
    try{

        const name = req.body.name;
        if(name == ""){
            return (
                res.json({
                    message: "Name cannot be empty",
                    status:false
                })
            )
        }

        const foundName = await categoryModel.findOne({name:  { 
            "$regex": "^" + name + "\\b", "$options": "i"
        }});

        if(!foundName){
            const newCategory = new categoryModel({
                _id:mongoose.Types.ObjectId(),
                name:req.body.name,
            })
            const result = await newCategory.save();
    
            if(result){
                res.json({
                    message: "new Category has been created",
                    result: result,
                    status:true,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message: "Could not category",
                    status:false,
                })
            }
        }
        else{
            res.json({
                message: "Category with the same name already exists",
                status:false,
            })
        }

        
    }
    catch(err){
        res.json({
            message: "Error",
            status:false,
            error:err.message
        })
    }
}

exports.getAllCategories = async(req,res)=>{
    try{
        const result = await categoryModel.find({});

        
        if(result){
            res.json({
                message: "Categories fetched",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not fetched categories",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching categories",
            status:false,
            error:err.message
        })
    }
}

exports.getCategoryById = async(req,res)=>{
    try{
        const category_id = req.query.category_id;
        const result = await categoryModel.findOne({_id: category_id});

        
        if(result){
            res.json({
                message: "Category fetched",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not fetched category",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching category",
            status:false,
            error:err.message
        })
    }
}

exports.deleteCategory = async (req,res)=>{
    try{
        const category_id = req.query.category_id;
        const result = await categoryModel.deleteOne({_id: category_id});

        if(result.deletedCount>0){
            res.json({
                message: "Category Deleted",
                result: result,
                status:true,
                
            })
        }
        else{
            res.json({
                message: "Could not delete category",
                status:false,
            })
        }
        
    }
    catch(err){
        res.json({
            message: "Error Occurred while deleting category",
            status:false,
            error:err.message
        })
    }
}

exports.updateCategory = async (req,res)=>{
    try{
        const category_id = req.body.category_id;
        const name = req.body.name;

        const result = await categoryModel.findOneAndUpdate({_id: category_id} , {name:name} , {new:true});

        if(result){
            res.json({
                message: "Category updated successfully",
                result: result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "Could not update category",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while updating category",
            status:false,
            error:err.message
        })
    }
}