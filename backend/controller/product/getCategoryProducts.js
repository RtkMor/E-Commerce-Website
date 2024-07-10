const mongoose = require('mongoose');
const productModel = require("../../models/productModel");

async function getCategoryProductsController(req, res) {
  try {
    const { category, limit, productName } = req.body;

    // Convert limit to a number if provided
    const limitNumber = limit ? parseInt(limit) : undefined;

    const products = await productModel.find({productName: {$ne: productName}, category: category}).limit(limitNumber);

    res.status(200).json({
      message: "Category Products fetched successfully!",
      error: false,
      success: true,
      data: products,
    });

  } catch (error) {
    console.error("Error fetching category products:", error.message);
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = getCategoryProductsController;