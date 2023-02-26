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
    exam: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    date_exam: {
        type: Date,
        default: Date.now
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

module.exports = mongoose.model('Control_Exam', historialSchema);