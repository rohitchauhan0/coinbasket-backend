const mongoose = require('mongoose')

const cartModal = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    piece:{
        type:String
    }
})




module.exports = mongoose.model("Cart", cartModal)