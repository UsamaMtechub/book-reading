
const notificationModel = require("../models/notificationModel");
const mongoose = require("mongoose");
async function notification (to , from  , title , body  ,type , book_id){
        const notification  = new notificationModel({
            _id:mongoose.Types.ObjectId(),
            type:type,
            title:title,
            body:body,
            from:from,
            to:to,
            book_id:book_id

            })

            const result = await notification.save();

            if(result){
                return true
            }
            else{
                return false
            }
}

module.exports = notification;