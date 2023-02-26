const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    birthday: {
        type: Date,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    personal_number: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    speciality: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    professional_license: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    about: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    education: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    languages: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    date_created: {
        type: Date,
        default: Date.now
    }
    ,
    date_updated: {
        type: Date,
    }
})

module.exports = mongoose.model('Doctor', doctorSchema);