const productModel = require("../../models/productModel");

async function getCategoryListController(req, res) {
  try {

    const productCategory = await productModel.distinct("category")

    // array to store one product from each category
    const productByCategory = [];

    for(const category of productCategory){
        const product = await productModel.findOne({category});
        if(product){
            productByCategory.push(product);
        }
    }

    res.status(200).json({
      message: "Category List fetched successfully!",
      error: false,
      success: true,
      data: productByCategory,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = getCategoryListController;
