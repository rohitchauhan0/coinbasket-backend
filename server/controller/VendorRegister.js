const User = require("../modals/User")
const Vendor = require("../modals/VendorProfile")
const bcrypt = require('bcrypt')
exports.vendorRegister = async (req, res) => {
    try {
        const { username, email, password } = await req.body

        const usernameExist = await User.findOne({ username })
        const findEmailExist = await User.findOne({ email })
        if (usernameExist) {
            return res.json({
                success: false,
                message: "Username already present"
            })
        }

        if (findEmailExist) {
            return res.json({
                success: false,
                message: "Email already present"
            })
        }
        const vendordata = await Vendor.create({
            order:[]
        }) 

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username, email, password: hashPassword, accountType:"vendor", vendorProfile:vendordata._id
        })

        return res.json({
            success: true,
            message: "User created successfully",
            userId:newUser._id
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}


exports.updateNewdataOfVendor = async(req, res)=>{
    try {
        const {firstname, lastname, phoneNum, gstNum, panNum, userId, address} = req.body


        await User.findByIdAndUpdate(userId, {
            firstname, lastname, phoneNum, gstNum, panNum,image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`, address
        },{new:true})

        return res.json({
            success:true,
            message:"Profile completed"
        })


    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}