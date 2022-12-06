const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderProductSchema = new Schema({
    orderItem: { 
        name: { type: String, required: true },
        among: { type: Number, required: true},
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    },
    shoppingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: {type: Date},
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
}, {
    timestamp: true,
})

module.exports = mongoose.model('orderProduct', orderProductSchema)