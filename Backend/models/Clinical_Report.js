const mongoose = require('mongoose');

const clinicalReportSchema = mongoose.Schema({
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
    temperature: {
        type: Number,
        required: false,
        min: 0,max: 50
    },
    blood_pressure: {
        type: Number,
        required: false,
        min: 0,max: 200
    },
    glucose: {
        type: Number,
        required: false,
        min: 0,max: 1000
    },
    weight: {
        type: Number,
        required: false,
        min: 0,
        max: 1000
    },
    hospital_data: {
        type: String,
        required: true,
        minlength: 5
    },
    reason_medical: {
        type: String,
        required: true,
        minlength: 5
    },
    past_appointment: {
        type: String,
        required: true,
        minlength: 5
    },
    analysis: {
        type: String,
        required: true,
        minlength: 5
    },
    recommendations: {
        type: String,
        required: true,
        minlength: 5
    },
    infusion: {
        type: String,
        required: true,
        minlength: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Clinical_Report', clinicalReportSchema);