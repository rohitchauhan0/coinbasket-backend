const mongoose = require('mongoose')

const ProductModal = new mongoose.Schema({
    productName:{
        type:String
    },
    description:{
        type:String
    },
    gstslab:{
        type:String
    },
    shipping:{
        type:String
    },
    warehouse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Warehouse"
    }],
    hsncode:{
        type:String
    },
    sku:{
        type:String
    },
    stock:{
        type:Number
    },
    salesprice:{
        type:String
    },
    mrp:{
        type:String
    },
    purchaseprice:{
        type:String
    },
    productImage:{
        type:String
    },
   
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    brandname:{
        type:String
    },
    barcode:{
        type:String
    },
    pieces:{
        type:String
    },
    sale:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    
    
},{timestamps:true})

module.exports =  mongoose.model("Product", ProductModal)

// export async function getProductSalesThisMonth() {
//     try {
//         const currentDate = new Date();
//         const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        
//         const totalSalesThisMonth = await Product.aggregate([
//             {
//                 $lookup: {
//                     from: 'orders', 
//                     localField: '_id',
//                     foreignField: 'product',
//                     as: 'orders'
//                 }
//             },
//             {
//                 $addFields: {
//                     monthSales: {
//                         $filter: {
//                             input: '$orders',
//                             cond: {
//                                 $and: [
//                                     { $gte: ['$$this.createdAt', firstDayOfMonth] },
//                                     { $lte: ['$$this.createdAt', lastDayOfMonth] }
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: 'null',
//                     totalSales: { $sum: { $cond: [{ $isArray: '$monthSales' }, { $size: '$monthSales' }, 0] } }
//                 }
//             }
//         ]);

//         const totalSales = totalSalesThisMonth.length > 0 ? totalSalesThisMonth[0].totalSales : 0;

//         const productSales = await Product.aggregate([
//             {
//                 $lookup: {
//                     from: 'orders',
//                     localField: '_id',
//                     foreignField: 'product',
//                     as: 'orders'
//                 }
//             },
//             {
//                 $addFields: {
//                     monthSales: {
//                         $filter: {
//                             input: '$orders',
//                             cond: {
//                                 $and: [
//                                     { $gte: ['$$this.createdAt', firstDayOfMonth] },
//                                     { $lte: ['$$this.createdAt', lastDayOfMonth] }
//                                 ]
//                             }
//                         }
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$_id',
//                     productName: { $first: '$productName' },
//                     monthSalesCount: { $sum: { $cond: [{ $isArray: '$monthSales' }, 1, 0] } }
//                 }
//             },
//             {
//                 $project: {
//                     productName: 1,
//                     monthSalesCount: 1,
//                     totalSales: totalSales,
//                     percentageOfTotalSales: {
//                         $cond: [
//                             { $eq: [totalSales, 0] },
//                             0,
//                             { $multiply: [{ $divide: ['$monthSalesCount', totalSales] }, 100] }
//                         ]
//                     }
//                 }
//             },
//             {
//                 $sort: { monthSalesCount: -1 } 
//             }
//         ]);


//         return productSales;
//     } catch (error) {
//         console.error('Error getting product sales for this month:', error);
//         throw error;
//     }
// }

