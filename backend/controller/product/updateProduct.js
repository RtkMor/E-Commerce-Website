const productModel = require("../../models/productModel.js");
const uploadProductPermission = require("../../helpers/permission.js");

async function updateProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied!");
    }

    const updateProduct = await productModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      data: updateProduct,
      message: "Product updated successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
