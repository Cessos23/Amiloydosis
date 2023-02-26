const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    id_survey: {
        type: String,
        required: true,
        minlength: 5
    },
    fullname: {
        type: String,
        required: true,
        minlength: 5
    },
    answers : { type : Array , "default" : [] },
    date: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Answer', answerSchema);