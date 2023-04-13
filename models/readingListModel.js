const mongoose = require('mongoose')

const readingListSchema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    }, 
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    readStatus:{
        type:Boolean,
        default:false
    } , 
    readPages:String,

})

module.exports = mongoose.model('readingList' , readingListSchema);

