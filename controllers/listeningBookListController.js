
const mongoose  = require('mongoose');

const listeningListModel = require('../models/listeningBookListModel');
const bookModel = require('../models/bookModel');

exports.addBookToListeningList = async (req,res)=>{
    try{
            const book_id = req.body.book_id;
            const user_id = req.body.user_id;
            const listenedMinutes = req.body.listenedMinutes;

            const foundResult = await listeningListModel.findOne({user_id:user_id, book_id:book_id});
            const isAudioBook = await bookModel.findOne({_id:book_id , bookType:"audio"});


            if(isAudioBook){
                if(!foundResult){
                    const newBookSaved = new listeningListModel({
                        _id:mongoose.Types.ObjectId(),
                        book_id:book_id,
                        user_id:user_id,
                        listenedMinutes:listenedMinutes,
                    })
        
                    const result = await newBookSaved.save();
        
                    if(result){
                        res.json({
                            message: "Book has been added to user listening list",
                            status:"true",
                            result: result,
                            statusCode: 201
                        })
                    }
                    else{
                        res.json({
                            message: "Book Could not saved to listening list",
                            status:false
                        })
                    }
                }
                else{
                    res.json({
                        message: "This Book is already added to the listening list of This User",
                        status:false,
                    })
                }
            }
            else{
                res.json({
                    message:"Only those books which bookType = audio can be added in listening list , Or book with this id may not exist",
                    status:false
                })
            }
        
           
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}

exports.GetAll = async (req,res)=>{
    try{
        const result = await listeningListModel.find({}).populate('user_id').populate('book_id');
        if(result){
            res.json({
                message: "All record fetched",
                status:"true",
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false
            })
        }
        
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}

exports.GetListeningListOfUser = async (req,res)=>{
    try{
        const user_id = req.query.user_id;
        const result = await listeningListModel.find({user_id:user_id}).populate('user_id').populate('book_id');
        if(result){
            res.json({
                message: "listening List of this user fetched",
                status:"true",
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false
            })
        }
        
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}
exports.changeListenedStatus = async (req,res)=>{
    try{
        const listeningListItemId = req.body.listeningListItemId;
        const listenedStatus = req.body.listenedStatus

        const result = await listeningListModel.findOneAndUpdate({_id: listeningListItemId} , {listenedStatus:listenedStatus} , {new:true});
        
        if(result){
            res.json({
                message: "Listened Status has been changed successfully to :"+ listenedStatus,
                status:"true",
                result: result,
            })
        }
        else{
            res.json({
                message: "could not change Listened Status",
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}

exports.updateListeningListItem= async (req,res)=>{
    try{
        const listeningListItemId = req.body.listeningListItemId;
        const book_id = req.body.book_id;
        const user_id = req.body.user_id;
        const listenedMinutes = req.body.listenedMinutes;

        const result = await listeningListModel.findOneAndUpdate({_id: listeningListItemId} ,
             {
                book_id:book_id,
                user_id:user_id,
                listenedMinutes:listenedMinutes,
            } 
             , {new:true});
        
        if(result){
            res.json({
                message: 'Reading list item updated successfully',
                status:"true",
                result: result,
            })
        }
        else{
            res.json({
                message: "could not update ",
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}

exports.deleteListeningListItem = async (req,res)=>{
    try{
        const listeningListItemId = req.query.listeningListItemId;

        const result = await listeningListModel.deleteOne({_id: listeningListItemId});
        if(result.deletedCount>0){
            res.json({
                message: "Listening List Item Deleted",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "Could not delete Listening list item",
                status:false,                
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}

exports.getBooksOfUser_WithListenedStatus = async (req,res)=>{
    try{
        const user_id = req.query.user_id;
        const listenedStatus = req.query.listenedStatus;

        if(!listenedStatus){
            return(
                res.json({
                    message: "must provide listenedStatus",
                    status:false,
                })
            )
            
        }
        const result = await listeningListModel.find({user_id:user_id , listenedStatus:listenedStatus}).populate('user_id').populate('book_id');
        if(result){
            res.json({
                message: "listenedStatus of this user with this status fetched",
                status:"true",
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false
            })
        }
        
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false,
        })
    }
}