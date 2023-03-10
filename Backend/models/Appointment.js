const mongoose = require('mongoose');


const appointmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    id_paciente: {
        type: String,
        required: true,
        minlength: 5
    },
    numero: {
        type: String,
        required: false,
        min: 10,
        max: 10,
    },
    servicio: {
        type: String,
        required: true,
        minlength: 5
    },
    id_servicio: {
        type: String,
        required: true,
        minlength: 5
    },
    start: {
        type: Date,
        required: true,
    },
    allDay: {
        type: Boolean,
        required: true,
    }

})

module.exports = mongoose.model('Appointment', appointmentSchema);