const Category = require("../modals/Category");
const { uploadImageToS3 } = require("../utils/UploadImage");

exports.createCategory = async (req, res) => {
    try {
        const { name, description, parentCategoryId } = req.body;
        let categoryImageUrl = null;
        
        if (req.files && req.files.categoryImage) {
            const categoryImage = req.files.categoryImage;
            categoryImageUrl = await uploadImageToS3(categoryImage);
        }

        if (parentCategoryId) {
            const childrenData = await Category.create({
                name,
                description,
                categoryImage: categoryImageUrl,
                parentCategory: parentCategoryId,
                product: []
            });
            await Category.findByIdAndUpdate(
                parentCategoryId,
                { $push: { children: childrenData._id } },
                { new: true }
            );
            return res.json({ 
                success: true,
                message: "Child category created successfully"
            });
        } else {
            // Create a top-level category
            await Category.create({
                name,
                description,
                categoryImage: categoryImageUrl
            });
            return res.json({
                success: true,
                message: "Category created successfully"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message
        });
    }
};





exports.getCategory = async(req, res)=>{
    try {
        const data = await Category.find({}).populate("children").populate("product").exec()
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


exports.getCategoryProductById = async(req, res)=>{
    try {
        const {categoryId} = req.body
        const data = await Category.findById(categoryId).populate("children").populate("product").exec()
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
// export const DELETE = async(req)=>{
//     try {
//         const 
//     } catch (error) {
        
//     }
// }