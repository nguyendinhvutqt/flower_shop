const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, {
    timestamp: true,
})

module.exports = mongoose.model('Product', productSchema)