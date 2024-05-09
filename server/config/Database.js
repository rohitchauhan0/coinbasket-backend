const mongoose = require('mongoose')
require('dotenv').config()
exports.connectWithDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Mongodb connected successfully"))
    .catch((err) => {
        console.log(err)
        console.log("Error in db")
    })
}
