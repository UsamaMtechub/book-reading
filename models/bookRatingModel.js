const mongoose = require('mongoose');

const bookRatingSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'book'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
});

module.exports = mongoose.model('book_rating' , bookRatingSchema);
