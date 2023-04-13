const mongoose = require('mongoose');
const notificationModel = require('../models/notificationModel');;


exports.createNotification = async (req,res)=>{
    try{
        const user_id = req.body.user_id;
        const type = req.body.type;
        const title = req.body.title;
        const body = req.body.body;
        const from= req.body.from;
        const to= req.body.to;
        const book_id = req.body.book_id;

        const newNotification = new notificationModel({
            _id:mongoose.Types.ObjectId(),
            user_id:user_id,
            type:type,
            title:title,
            body:body,
            from:from,
            to:to,
            book_id:book_id,

        });

        const result = await newNotification.save();

        if(result){
            res.json({
                message: "New notification Saved Successfully",
                result: result,
                status :true,
            })

        }
        else{
            res.json({
                message: "Notification could not be saved successfully",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while saving notification",
            status:false,
            error:err.message
        })
    }
}

exports.getAllNotifications  = async (req,res)=>{
    try{
        const result = await notificationModel.find({}).populate('user_id').populate('book_id');

        if(result){
            res.json({
                message: "Notifications Fetched",
                result: result,
                status: true,
            })
        }
        else{
            res.json({
                message: "Notification could not be fetched",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while fetching notifications",
            status:false,
            error:err.message
        })
    }
}

exports.getNotificationsForAllUsers = async (req,res)=>{
    try{
        const result = await notificationModel.find({to:"allUsers", from:'admin'}).populate('user_id').populate('book_id');

        if(result){
            res.json({
                message: "Notifications for All Users are Fetched",
                result: result,
                status: true,
            })
        }
        else{
            res.json({
                message: "Could not Fetch notifications which is for all users",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while fetching notifications",
            status:false,
            error:err.message
        })
    }
}

exports.getNotificationsOfSpecificUser = async (req,res)=>{
    try{
        const user_id = req.query.user_id;
        const result = await notificationModel.find({$or:[{user_id:user_id} , {to:"allUsers"}]}).populate('user_id').populate('book_id');

        if(result){
            res.json({
                message: "Notifications for specific User are Fetched",
                result: result,
                status: true,
            })
        }
        else{
            res.json({
                message: "Could not Fetch notifications",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while fetching notifications",
            status:false,
            error:err.message
        })
    }
}

exports.deleteNotification = async (req,res)=>{
    try{
        const notification_id= req.query.notification_id;
        const result = await notificationModel.deleteOne({_id:notification_id});

        if(result.deletedCount>0){
            res.json({
                message: "Notification deleted",
                result: result,
                status: true,
            })
        }
        else{
            res.json({
                message: "Could not delete Notification",
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while deleting notification",
            status:false,
            error:err.message
        })
    }
}