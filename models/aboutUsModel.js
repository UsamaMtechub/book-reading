const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productName: String,
    version: String,
    developer:String,
    text: String
});

module.exports = mongoose.model("aboutUs" , aboutUsSchema);

