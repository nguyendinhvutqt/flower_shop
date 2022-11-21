const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to DB Successfully');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;