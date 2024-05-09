const mongoose = require('mongoose')
const OrderModal = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    piece: {
        type: String
    },
    vendorname: {
        type: String
    },
    vendorId: {
        type: String
    },
    status: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("Order", OrderModal)





