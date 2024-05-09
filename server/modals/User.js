const mongoose = require('mongoose')
const userModal = new mongoose.Schema({
    username: {
        type: String
    },
    email:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    image:{
        type:String
    },
    accountType:{
        type:String
    },
    password:{
        type:String
    },
    phoneNum:{
        type:String
    },
    address:{
        type:String
    },
    vendorProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },
    gstNum:{
        type:String
    },
    panNum:{
        type:String
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart"
        }
    ],
 

}, {timestamps:true})



module.exports = mongoose.model("User", userModal)
