const express = require('express')
const { createWarehouse, getWareHouse } = require('../controller/Warehouse')
const router = express.Router()

router.post("/createwarehouse", createWarehouse)
router.get("/getwarehouse", getWareHouse)


module.exports = router