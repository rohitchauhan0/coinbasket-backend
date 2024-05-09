const User = require("../modals/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cart = require("../modals/Cart")



exports.register= async (req,res) => {
    try {
        const { username, email, firstname, lastname,  password, accountType, address, phoneNum } = await req.body
 
        

        const usernameExist = await User.findOne({username})
        const findEmailExist = await User.findOne({email})
        if(usernameExist){
            return res.json({
                success:false,
                message:"Username already present"
            })
        }

        if(findEmailExist){
            return res.json({
                success:false,
                message:"Email already present"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            username, email, firstname, lastname, password:hashPassword, accountType, address, phoneNum, image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
        })

        return res.json({
            success: true,
            message: "User created successfully",
            
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

exports.Login = async(req,res)=>{

    try {
        const {email, password} = await req.body
        const user = await User.findOne({email:email})
        console.log(email, password)
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        const verifyPassword = await bcrypt.compare(password, user?.password)

        if(verifyPassword){
            const payload = {
                id : user._id,
                email: user.email,
                phoneNum: user.phoneNum,
                account: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"24h"
            })

            user.token = token
            user.password = undefined

    

            const options = {
                httpOnly:true,
                expires: new Date(Date.now() + 3*24*60*60*1000),
            }
            return res.cookie("token", token, options).json({
                success:true,
                message:"Login successfully",
                user,
                token
            })
            
        } 
        else{
            return res.json({
                success:false,
                status:500,
                message:"Password do not match"
            })
        }

       
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            status:500
        })
    }
}

exports.getAllUser = async(req, res)=>{
    try {
        const users = await User.find({}).select("-password").sort({createdAt:-1})
        return res.json({
            success:true,
            data:users
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}



exports.searchUser = async(req, res)=>{
    try {
        const {key} = req.body
        let data = await User.find({
            "$or":[
                {username:{$regex:key, $options:"i"}},
                {firstname:{$regex:key, $options:"i"}},
                {accountType:{$regex:key, $options:"i"}}
            ]
        })


        return res.json({
            success:true,
            data:data
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { userId } = await req.body
        const data = await User.findById(userId).select("-password").populate({
            path:"cart",
            populate:"productId"
        }).populate({
            path:"vendorProfile",
            populate:{
                path:"order",
                populate:"product"
            }
        }).exec()
        return res.json({
            success: true,
            data: data
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}



exports.deleteUser= async(req, res)=>{
    try { 
        const {userId} = req.body
        await User.findByIdAndDelete(userId)

        return res.json({
            success:true, 
            message:"User deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
}


exports.editUserById = async (req, res) => {
    try {
        const { username, email, firstname, lastname, accountType, address, phoneNum, userId , gstNum, panNum} = await req.body


        await User.findByIdAndUpdate(userId,{
            username, email, firstname, lastname, accountType, address, phoneNum, gstNum, panNum
        },{new:true})

        return res.json({
            success: true,
            message: "User updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}


exports.addToCart = async(req, res)=>{
    try {
        const {userId, counts} = req.body
       const objectData =  Object.entries(counts)[0]
       const productId = objectData[0]
       const piece = objectData[1]

       const cartEntry =  await Cart.create({
            productId:productId,
            piece:piece
        })
        await User.findByIdAndUpdate(userId, {
            $push:{
                cart:cartEntry._id
            }
        },{new:true})

        return res.json({
            success:true,
            message:"Product added to cart"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}


exports.removeFromCart = async(req, res)=>{
    try {
        const {userId, cartId} = req.body

        await Cart.findByIdAndDelete(cartId)
        await User.findByIdAndUpdate(userId, {
            $pull:{
                cart:cartId
            }
        },{new:true})

        return res.json({
            success:true,
            message:"Product remove from cart"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}