const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    protocol_number: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    doctor_name: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    hospital_name: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    description_protocol: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    clauses: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    fullname_patient: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    signature_patient: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    fullname_witnessone: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    signature_witnessone: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    fullname_witnesstwo: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    signature_witnesstwo: {
        type: String,
        required: true,
        min: 0,
        max: 255
    },
    date_start: {
        type: Date,
        required: true,
    },
    date_end: {
        type: Date,
        required: true,
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

module.exports = mongoose.model('Contract', contractSchema);
