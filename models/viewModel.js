const mongoose =require('mongoose');

const viewSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user_id:{
        type:String,
        required:true,
        ref:'user'
    },
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'book'
    }
})

module.exports = mongoose.model('view', viewSchema)