const express = require('express')
const { Login, register, getAllUser, searchUser, getUserById, editUserById, deleteUser, addToCart, removeFromCart } = require('../controller/Auth')
const { vendorRegister, updateNewdataOfVendor } = require('../controller/VendorRegister')
const router = express.Router()

router.post("/login", Login)
router.post("/register", register)
router.get("/getalluser", getAllUser)
router.post("/search", searchUser)
router.post("/getuserbyid", getUserById)
router.put("/updateuser", editUserById)
router.delete("/deleteuser", deleteUser)
router.post("/vendorRegister", vendorRegister)
router.put("/updatevendor", updateNewdataOfVendor)
router.post("/addtocart", addToCart)
router.post("/removefromcart", removeFromCart)


module.exports = router