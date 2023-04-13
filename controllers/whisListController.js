
const mongoose = require("mongoose");
const whisListModel = require("../models/whislistModel");
const bookModel= require("../models/bookModel");

exports.addBookInWhisList = async (req,res)=>{
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

        const foundResult = await whisListModel.findOne({user_id:user_id, book_id:book_id});
        const foundBook = await bookModel.findOne({_id:book_id});

        if(foundBook){
            if(bookType === foundBook.bookType){
                if(!foundResult){
                    const bookSaved = new whisListModel({
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
                            message: "Book has been saved whisList",
                            status:true,
                            result: result,
                        })
                    }
                    else{
                        res.json({
                            message: "Book could not be added to whislist",
                            status:false,  
                        })
                    }
                }
                else{
                    res.json({
                        message: "This Book is already added into whislist of this user",
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
        const result = await whisListModel.find({}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: "All Whislist added books fetched of all users",
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

exports.getUserWhisList = async ( req,res)=>{
    try{
        const user_id = req.query.user_id
        const result = await whisListModel.find({user_id:user_id}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: "WhisList of this user fetched successfully",
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

exports.getUserAudioWhisList = async ( req,res)=>{
    try{
        const user_id = req.query.user_id
        const result = await whisListModel.find({user_id:user_id , bookType:'audio'}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: " Audio WhisList of this user fetched successfully",
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
exports.getUserEbookWhisList = async ( req,res)=>{
    try{
        const user_id = req.query.user_id
        const result = await whisListModel.find({user_id:user_id , bookType:'ebook'}).populate("book_id").populate('user_id');
        if(result){
            res.json({
                message: " ebook WhisList of this user fetched successfully",
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
        const whisListItemId = req.body.whisListItemId;
        const status = req.body.status;
        const bookType= await whisListModel.findOne({_id:whisListItemId});
        
        if(bookType.bookType === 'audio'){
            var result = await whisListModel.findOneAndUpdate({_id:whisListItemId} , {listenedStatus:status} , {new:true})
        }
        if(bookType.bookType === 'ebook'){
            var result = await whisListModel.findOneAndUpdate({_id:whisListItemId} , {readStatus:status} , {new:true})
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

exports.updateWhisListItem = async (req,res)=>{
    try{
        const whisListItemId = req.body.whisListItemId;
        const listenedMinutes = req.body.listenedMinutes;
        const readPages= req.body.readPages;

        const result = await whisListModel.findOneAndUpdate({_id:whisListItemId}
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

exports.deleteWhisListItemId = async (req , res)=>{
    try{
        const whisListItemId = req.query.whisListItemId;

        const result = await whisListModel.deleteOne({_id:whisListItemId});
        if(result.deletedCount>0){
            res.json({
                message: "whisList Item Deleted",
                status:true,
                result: result,
            })
        }
        else{
            res.json({
                message: "Could not delete whisList item",
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