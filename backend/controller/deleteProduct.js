const productModel = require("../models/productModel");
const uploadProductPermission = require("../helpers/permission.js");

async function deleteProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied!");
        }

        const productId = req.body._id;

        await productModel.findByIdAndDelete(productId);

        res.status(200).json({
            message: "Product deleted successfully!",
            success: true,
            error: false
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Problem!",
            error: true,
            success: false
        });
    }
}

module.exports = deleteProductController;
