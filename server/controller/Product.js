
const Product = require("../modals/Product")
const Warehouse = require("../modals/Warehouse")
const Category = require("../modals/Category");
const { uploadImageToS3 } = require("../utils/UploadImage");


exports.createProduct = async (req, res) => {
    try {

        const { productName, description, gstslab, shipping, hsncode, sku, stock, salesprice, purchaseprice, category, mrp, brandname, barcode, pieces } = req.body;
        const productImage = req.files.productImage

        const warehouses = [];

        for (const key of data.keys()) {
            if (key.startsWith("warehouse[")) {
                const warehouseData = data.get(key);
                warehouses.push(warehouseData);
            }
        }
        const productImageImageUrl = productImage && await uploadImageToS3(productImage)

        const newProduct = await Product.create({
            productName, gstslab, shipping, hsncode, sku, stock, salesprice, purchaseprice, category, mrp, brandname, barcode, pieces, productImage: productImageImageUrl,
            description, warehouse: warehouses
        });
        await Promise.all(warehouses.map(async (id) => {
            await Warehouse.findByIdAndUpdate(id, {
                $push: { product: newProduct._id }
            }, { new: true });
        }));

 
        await Category.findByIdAndUpdate(category, {
            $push: { product: newProduct._id }
        }, { new: true });




        return res.json({
            success: true,
            message: "Product created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

exports.getProduct = async(req, res)=>{
    try {
        const response = await Product.find({}).populate("category").sort({ createdAt: -1 }).exec()
        return res.json({
            success: true,
            data: response
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}