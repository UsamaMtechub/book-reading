
const mongoose  = require('mongoose');

const readingListModel = require('../models/readingListModel');
const bookModel = require('../models/bookModel');

exports.addBookToReadingList = async (req,res)=>{
    try{
            const book_id = req.body.book_id;
            const user_id = req.body.user_id;
            const readPages = req.body.readPages;

            const foundResult = await readingListModel.findOne({user_id:user_id, book_id:book_id});
            const isEbook = await bookModel.findOne({_id:book_id , bookType:"ebook"});


            if(isEbook){
                if(!foundResult){
                    const newBookSaved = new readingListModel({
                        _id:mongoose.Types.ObjectId(),
                        book_id:book_id,
                        user_id:user_id,
                        readPages:readPages,
                    })
        
                    const result = await newBookSaved.save();
        
                    if(result){
                        res.json({
                            message: "Book has been added to user reading list",
                            status:"true",
                            result: result,
                            statusCode: 201
                        })
                    }
                    else{
                        res.json({
                            message: "Book Could not saved to reading list",
                            status:false
                        })
                    }
                }
                else{
                    res.json({
                        message: "This Book is already added to the reading list of This User",
                        status:false,
                    })
                }
            }
            else{
                res.json({
                    message:"Only those books which bookType = ebook can be added in reading list , Or book with this id may not exist",
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
        const result = await readingListModel.find({}).populate('user_id').populate('book_id');
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

exports.GetReadingListOfUser = async (req,res)=>{
    try{
        const user_id = req.query.user_id;
        const result = await readingListModel.find({user_id:user_id}).populate('user_id').populate('book_id');
        if(result){
            res.json({
                message: "Reading List of this user fetched",
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
exports.changeReadStatus = async (req,res)=>{
    try{
        const readingListItemId = req.body.readingListItemId;
        const readStatus = req.body.readStatus

        const result = await readingListModel.findOneAndUpdate({_id: readingListItemId} , {readStatus:readStatus} , {new:true});
        
        if(result){
            res.json({
                message: "Read Status has been changed successfully to :"+ readStatus,
                status:"true",
                result: result,
            })
        }
        else{
            res.json({
                message: "could not change Read Status",
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

exports.updateReadingListItem= async (req,res)=>{
    try{
        const readingListItemId = req.body.readingListItemId;
        const book_id = req.body.book_id;
        const user_id = req.body.user_id;
        const readPages = req.body.readPages;

        const result = await readingListModel.findOneAndUpdate({_id: readingListItemId} ,
             {
                book_id:book_id,
                user_id:user_id,
                readPages:readPages,
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

exports.deleteReadingListItem = async (req,res)=>{
    try{
        const readingListItemId = req.query.readingListItemId;

        const result = await readingListModel.deleteOne({_id: readingListItemId});
        if(result.deletedCount>0){
            res.json({
                message: "Reading List Item Deleted",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "Could not delete reading list item",
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

exports.getBooksOfUser_WithReadStatus = async (req,res)=>{
    try{
        const user_id = req.query.user_id;
        const readStatus = req.query.readStatus;

        if(!readStatus){
            return(
                res.json({
                    message: "must provide readStatus",
                    status:false,
                })
            )
            
        }
        const result = await readingListModel.find({user_id:user_id , readStatus:readStatus}).populate('user_id').populate('book_id');
        if(result){
            res.json({
                message: "Reading List of this user with this status fetched",
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