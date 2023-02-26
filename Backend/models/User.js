const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    phone_number: {
        type: String,
       
        min: 10,
        max: 10
    },
    address: {
        type: String,
        
        min: 6,
        max: 255
    },
    occupation: {
        type: String,
        
        min: 6,
        max: 255
    },
    marital_status: {
        type: String,
        
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
    },
    permissions: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);