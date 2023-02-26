const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
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
    phone_number: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    status: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description_status: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    sex: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    age: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    birthday: {
        type: Date,
        required: true,
    },
    allergies: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    weight: {
        type: Number,
        required: false,
        min: 0,
        max: 1000
    },
    size: {
        type: Number,
        required: false,
        min: 0,
        max: 1000
    },
    temperature: {
        type: Number,
        required: false,
        min: 0,max: 50
    },
    heart_rate: {
        type: Number,
        required: false,
        min: 0,max: 250
    },
    breathing_frequency: {
        type: Number,
        required: false,
        min: 0,max: 100
    },
    blood_pressure: {
        type: Number,
        required: false,
        min: 0,max: 200
    },
    oxygen_saturation: {
        type: Number,
        required: false,
        min: 0,max: 100
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

module.exports = mongoose.model('Patient', patientSchema);