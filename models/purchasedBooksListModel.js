
const mongoose = require('mongoose');

const purchasedSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    }, 
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bookType:{
        type:String,
        enum:['ebook' , 'audio']
    },
    readPages:String,
    listenedMinutes:String,
    readStatus:{
        type:Boolean,
    },
    listenedStatus:{
        type:Boolean,
    },
})

module.exports = mongoose.model("purchased" , purchasedSchema)
