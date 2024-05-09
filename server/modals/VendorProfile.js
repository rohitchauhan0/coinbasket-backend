const mongoose = require('mongoose')
const vendorProfile = new mongoose.Schema({
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],

},{timestamps:true})


module.exports =  mongoose.model("Vendor", vendorProfile)