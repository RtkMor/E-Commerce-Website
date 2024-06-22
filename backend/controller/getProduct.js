const productModel = require("../models/productModel")

async function getProductController(req, res) {
    try {

        const allProducts = await productModel.find().sort({category: 1});
        res.status(200).json({
            message: "Products fetched successfully!",
            error: false,
            success: true,
            data: allProducts
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server problem!",
            error: true,
            success: false
        })
    }
}

module.exports = getProductController;