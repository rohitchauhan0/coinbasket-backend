const Warehouse = require('../modals/Warehouse')

exports.createWarehouse = async (req, res) => {
    try {
        const { location, details, name, gstNum, panNum, address, latitude, longitude } = await req.body

        await Warehouse.create({
            location, details, product: [], name, gstNum, panNum, address, longitude, latitude
        })

        return res.json({
            success: true,
            message: "Ware house added successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

exports.getWareHouse = async (req, res) => {
    try {
        const result = await Warehouse.find({}).populate("product").exec()

        return res.json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}


exports.editWarehouse = async (req) => {
    try {
        const { location, details, name, gstNum, panNum, address, wareid } = await req.json()

        await Warehouse.findByIdAndUpdate(wareid, {
            location, details, name, gstNum, panNum, address
        }, { new: true })

        return NextResponse.json({
            success: true,
            message: "Ware house updated successfully"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}