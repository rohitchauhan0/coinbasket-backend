const express = require('express')
const { createProduct, getProduct } = require('../controller/Product')
const router = express.Router()

router.post("/createproduct", createProduct)
router.get("/getproduct", getProduct)

module.exports = router