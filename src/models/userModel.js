const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,  
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    access_token: {
        type: String,
        unique: true
    },
    refresh_token: {
        type: String,
        unique: true
    },
}, {
    timestamp: true
})

module.exports = mongoose.Schema('User', userSchema)