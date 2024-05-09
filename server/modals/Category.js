const mongoose = require('mongoose');

// Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    slug:{
        type:String
    },
    description:{
        type:String
    },
    count:{
        type:String
    },
    categoryImage:{
        type:String
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
        }
    ],
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        }
    ]
});

// Model for Category
module.exports = mongoose.model('Category', categorySchema);

