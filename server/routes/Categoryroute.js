const express = require('express')
const { getCategory, createCategory, getCategoryProductById } = require('../controller/Category')
const router = express.Router()


router.get("/getcategory", getCategory)
router.post("/createcategory", createCategory)
router.post("/getproductcategorybyid", getCategoryProductById)

module.exports = router