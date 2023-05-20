const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    bookName : {
        type : String,
        required: true,
    },
    publisherName:{
        type: String,
        required: true,
    },
    publisherAge:{
        type: String,
        required: true,
    },
    pageNo:{
        type: String,
        required: true,

    },
    publisherDate:{
        type: Date,
        required: true,
    },
    bookType:{
        type: [String],
        required:true,
    }

})

module.exports = mongoose.model("Book", userSchema);