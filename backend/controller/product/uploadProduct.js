const productModel = require("../../models/productModel.js");
const uploadProductPermission = require("../../helpers/permission.js");

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied!");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(200).json({
      message: "Product uploaded successfully!",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = uploadProductController;
