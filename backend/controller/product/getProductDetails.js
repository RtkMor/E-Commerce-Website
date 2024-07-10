const productModel = require("../../models/productModel");

async function getProductDetailsController(req, res) {
  try {
    const {productId} = req.body;

    const product = await productModel.findById(productId)

    res.status(200).json({
      message: "Product fetched successfully!",
      error: false,
      success: true,
      data: product,
    })
    
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = getProductDetailsController;
