const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    // image: { data: Buffer, contentType: String },
    image: { type: String, required: true},
    price: { type: Number, required: true },
    among_sell: { type: Number, default: 0},
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    timestamp: true,
})

module.exports = mongoose.model('Product', productSchema)