const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, default: null },
    address: { type: String, default: null },
    access_token: { type: String, default: null },
    refresh_token: { type: String, default: null },
    isAdmin: { type: Boolean, default: false }
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)