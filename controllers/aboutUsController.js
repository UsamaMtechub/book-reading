

const mongoose = require("mongoose")
const aboutUsModel = require("../models/aboutUsModel")


exports.createAboutUs = async (req,res)=>{

    try{
        const productName = req.body.productName;
        const version = req.body.version;
        const developer = req.body.developer;
        const text = req.body.text;

        const newAboutUs= await aboutUsModel({
            _id:mongoose.Types.ObjectId(),
            productName:productName,
            version:version,
            developer:developer,
            text:text
        })

        const result = await newAboutUs.save();

        if(result){
            res.json({
                message: "New about us has been created successfully",
                result: result,
                status: 'success',
            })
        }
        else{
            res.json({
                message: "Could not create new about us detail",
                status: "failed"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error in creating",
            error:err.message
        })
    }
}



exports.getAllAboutUs = async(req,res)=>{
    try{
        const result= await aboutUsModel.find({});
        if(result){
            res.json({
                message: "about us fetched",
                result: result,
                status: 'success',
            })
        }
        else{
            res.json({
                message: "Could not fetch about us",
                status: "failed"
            })
        }
        
        
    }
    catch(err){
        res.json({
            message: "Error fetching about us",
            error:err.message
        })
    }
}

exports.getAboutUsById= async(req,res)=>{
    try{
        const aboutUsId = req.query.aboutUsId;
        const result= await aboutUsModel.findOne({_id:aboutUsId});
        if(result){
            res.json({
                message: "about us with this id fetched",
                result: result,
                status: 'success',
            })
        }
        else{
            res.json({
                message: "Could not fetch about us",
                status: "failed"
            })
        }
        
        
    }
    catch(err){
        res.json({
            message: "Error fetching about us",
            error:err.message
        })
    }
}

exports.deleteAboutUs = async(req,res)=>{
    try{
        const aboutUsId = req.params.aboutUsId;
        const result= await aboutUsModel.deleteOne({_id: aboutUsId})

        if(result.deletedCount>0){
            res.json({
                message: "Deleted",
                result:result
            })
        }
        else{
            res.json({
                message: "could not deleted",
                status:"failed"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message
        })
    }
}

exports.updateAboutUs = async (req,res)=>{

    try{
        const aboutUsId = req.body.aboutUsId;
        const productName = req.body.productName;
        const version = req.body.version;
        const developer = req.body.developer;
        const text = req.body.text;

        const result = await aboutUsModel.findOneAndUpdate({_id: aboutUsId} , 
            {
            productName:productName,
            version:version,
            developer:developer,
            text:text} , {new:true});

        if(result){
            res.json({
                message: "about us updated successfully",
                result:result,
                status: 'success'
            })
        }
        else{
            res.json({
                message: "could not updated about us",
                result:null,
                status:"false"
            })
        }
    }
    catch(err){
        res.json({
            message: "error",
            error:err.message
        })
    }
}