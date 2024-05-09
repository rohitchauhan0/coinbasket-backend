const User = require("../modals/User")
const Vendor = require("../modals/VendorProfile")
const Product = require("../modals/Product")
const Order = require('../modals/Order')

exports.createOrder = async (req, res) => {
    try {
        const { counts, userId } = await req.body;
        const idCountArray = Object.entries(counts).map(([productId, count]) => ({ productId, count }));


        const user = await User.findById(userId);
        const orders = [];

        for (const data of idCountArray) {
            const newOrder = await Order.create({
                product: data.productId,
                piece: data.count,
                vendorId: userId,
                status: "pending"
            });
            await Vendor.findByIdAndUpdate(user.vendorProfile, {
                $push: { order: newOrder._id }
            }, { new: true });
            await Product.findByIdAndUpdate(data.productId, {
                $push: { sale: newOrder._id }
            }, { new: true });
            orders.push(newOrder);
        }

        await User.findByIdAndUpdate(userId, {
            cart:[]
        },{new:true})

        return res.json({
            success: true,
            message: "Orders created",
            orders: orders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Couldn't create orders",
            error: error.message
        });
    }
};



// export const GET = async()=>{
//     try {
//         const response = await Order.find({}).populate("product").sort({createdAt:-1}).exec()
//         return NextResponse.json({
//             success:true,
//             data:response
//         })
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({
//             success:false,
//             message:error.message
//         })
//     }
// }