const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    id_paciente: {
        type: String,
        required: true,
        minlength: 5
    },
    fullname: {
        type: String,
        required: true,
        minlength: 5
    },
    // questions: {
    //     type: String,
    //     required: true,
        
    // },
    questions : { type : Array , "default" : [] },
    date: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Survey', surveySchema);