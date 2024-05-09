const express = require('express')
const { connectWithDB } = require('./config/Database')
const app = express()
require('dotenv').config()
app.use(express.json())
connectWithDB()

const authroute = require("./routes/Authroute")
const categoryroute = require("./routes/Categoryroute")
const warehouseroute = require('./routes/Warehouseroute')
const productroute = require('./routes/Productroute')
const orderoute = require('./routes/Orderroute')

const fileUpload = require('express-fileupload')


const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./temp/"
}))


app.use("/api/v1/auth", authroute)
app.use("/api/v1/category", categoryroute)
app.use("/api/v1/warehouse", warehouseroute)
app.use("/api/v1/product", productroute)
app.use("/api/v1/order", orderoute)




const PORT = process.env.PORT || 5001
app.listen(PORT, ()=>{
    console.log("App is running at port 5001")
})