const mongoose = require('mongoose')

const notificationSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    } , 
    type:{
        type:String,
        enum : ["bookAdd" , "readBook"]
    },
    book_id:{
        type:String,
        ref:'book'
    },
    from:{
         type:String,
         enum:["admin" , "user"]
    }
    ,
    to:{
        type:String,
        enum:["admin" , "user" , "allUsers"],
    },
    title:String,
    body:String
},
{
    timestamps: true
});

module.exports = mongoose.model("notification" ,notificationSchema);