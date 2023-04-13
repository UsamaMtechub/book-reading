
const mongoose = require("mongoose");
const purchasedListModel = require("../models/purchasedBooksListModel");
const bookModel= require("../models/bookModel");

exports.addBookInPurchasedList = async (req,res)=>{
    try{
        const book_id = req.body.book_id;
        const user_id = req.body.user_id;
        const listenedMinutes = req.body.listenedMinutes;
        const readPages= req.body.readPages;
        const bookType = req.body.bookType;
        if(bookType==='audio'){
            var listenedStatus=false;
        }
        if(bookType==='ebook'){
            var readStatus =false;
        }

        const foundResult = await purchasedListModel.findOne({user_id:user_id, book_id:book_id});
        const foundBook = await bookModel.findOne({_id:book_id});

        if(foundBook){
            if(bookType === foundBook.bookType){
                if(!foundResult){
                    const bookSaved = new purchasedListModel({
                        _id:mongoose.Types.ObjectId(),
                        user_id:user_id,
                        book_id:book_id,
                        readPages:readPages,
                        listenedMinutes:listenedMinutes,
                        bookType:bookType,
                        readStatus:readStatus,
                        listenedStatus:listenedStatus
                        
                    });
    
                    const result = await bookSaved.save();
    
                    if(result){
                        res.json({
                            message: "Book has been saved purchased List",
                            status:true,
                            result: result,
                        })
                    }
                    else{
                        res.json({
                            message: "Book could not be added to purchasedList",
                            status:false,  
                        })
                    }
                }
                else{
                    res.json({
                        message: "This Book is already added into purchasedList of this user",
                        status:false, 
    
                    })
                }
            }
            else{
                res.json({
                    message: "The bookType you entered of the book does not match with type of book_id you entered",
                    status:false, 
                })
            }
        }
        else{
            res.json({
                message: "The book  with this provided id may not exist",
                status:false, 
            })
        }
        


        }
        catch(err){
            res.json({
                message: "Error Occurred",
                error:err.message,
                status:false
            })
        }
        
        
    
}

exports.getAll = async ( req,res)=>{
    try{
        const result = await purchasedListModel.find({}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: "All purchasedList added books fetched of all users",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false,  
            })
        }

    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false
        })
    }
}

exports.getUserPurchasedList = async ( req,res)=>{
    try{
        const user_id = req.query.user_id
        const result = await purchasedListModel.find({user_id:user_id}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: "purchasedList of this user fetched successfully",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false,  
            })
        }

    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false
        })
    }
}

exports.getUserAudioPurchasedList = async ( req,res)=>{
    try{
        const user_id = req.query.user_id
        const result = await purchasedListModel.find({user_id:user_id , bookType:'audio'}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: " Audio purchasedList of this user fetched successfully",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false,  
            })
        }

    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false
        })
    }
}
exports.getUserEbookPurchasedList = async ( req,res)=>{
    try{
        const user_id = req.query.user_id
        const result = await purchasedListModel.find({user_id:user_id , bookType:'ebook'}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: " ebook purchasedList of this user fetched successfully",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status:false,  
            })
        }

    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false
        })
    }
}

exports.changeRead_listened_status = async (req,res)=>{
    try{
        const purchasedListItemId = req.body.purchasedListItemId;
        const status = req.body.status;
        const bookType= await purchasedListModel.findOne({_id:purchasedListItemId});
        
        if(bookType.bookType === 'audio'){
            var result = await purchasedListModel.findOneAndUpdate({_id:purchasedListItemId} , {listenedStatus:status} , {new:true})
        }
        if(bookType.bookType === 'ebook'){
            var result = await purchasedListModel.findOneAndUpdate({_id:purchasedListItemId} , {readStatus:status} , {new:true})
        }

        if(result){
            res.json({
                message: "readOrListened Status changed successfully",
                result: result,
                status:false
            })
        }
        else{
            res.json({
                message: "could not change status",
                status:false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status:false,
            error:err.message
        })
    }
}

exports.updatePurchasedListItem = async (req,res)=>{
    try{
        const purchasedListItemId = req.body.purchasedListItemId;
        const listenedMinutes = req.body.listenedMinutes;
        const readPages= req.body.readPages;

        const result = await purchasedListModel.findOneAndUpdate({_id:purchasedListItemId}
            ,
            {
                listenedMinutes: listenedMinutes,
                readPages: readPages
            }
            ,{
                new:true
            }
            );

            if(result){
                res.json({
                    message: "Updated",
                    result: result,
                    status:true
                })
            }
            else{
                res.json({
                    message: "could not updated",
                    status:false
                })
            }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error:err.message,
            status:false
        })
    }
}

exports.deletePurchasedListItem = async (req , res)=>{
    try{
        const purchasedListItemId = req.query.purchasedListItemId;

        const result = await purchasedListModel.deleteOne({_id:purchasedListItemId});
        if(result.deletedCount>0){
            res.json({
                message: "purchasedList Item Deleted",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "Could not delete purchasedList item",
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