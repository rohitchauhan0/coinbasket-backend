const mongoose = require('mongoose')
const warehouseModal = new mongoose.Schema({
    location: {
        type: String
    },
    details: {
        type: String
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        re: "Product"
    }],
    name: {
        type: String
    },
    gstNum: {
        type: String
    },
    panNum: {
        type: String
    },
    address: {
        type: String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Warehouse", warehouseModal)
