const productModel = require("../../models/productModel");

async function searchProductController(req, res) {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
        error: true,
        success: false,
      });
    }

    const searchQuery = new RegExp(query, 'i');

    const products = await productModel.find({
      $or: [
        { productName: searchQuery },
        { brandName: searchQuery },
        { category: searchQuery }
      ]
    });

    res.status(200).json({
      message: "Products fetched successfully!",
      error: false,
      success: true,
      data: products,
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = searchProductController;