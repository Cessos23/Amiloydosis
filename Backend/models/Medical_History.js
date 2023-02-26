const mongoose = require('mongoose');

const historialSchema = mongoose.Schema({
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
    sex: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    occupation: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    current_discomforts: {
        type: String,
        required: true,
    },
    family_history: {
        type: String,
        required: true,
    },
    personal_history: {
        type: String,
        required: true,
    },
    physiological_habits: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Medical_History', historialSchema);