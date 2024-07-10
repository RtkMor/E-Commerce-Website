const CartModel = require("../../models/cartProduct");

const countCartProductsController = async(req, res) => {
    try {

        const currentUser = req.userId;
        
        let cart = await CartModel.findOne({userId: currentUser});

        if(!cart){
            return res.status(201).json({
                message: "Empty Cart Founded!",
                success: true,
                error: false,
                data: []
            })
        }

        return res.status(200).json({
            message: "Cart Founded!",
            success: true,
            error: false,
            data: cart
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Problem!",
            error: true,
            success: false
        });
    }
}

module.exports = countCartProductsController;