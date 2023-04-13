const mongoose = require('mongoose')

const listeningBookListSchema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book"
    }, 
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    listenedStatus:{
        type:Boolean,
        default:false
    } , 
    listenedMinutes:String,

})

module.exports = mongoose.model('listeningList' , listeningBookListSchema);

