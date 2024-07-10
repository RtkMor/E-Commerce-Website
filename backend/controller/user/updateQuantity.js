const CartModel = require("../../models/cartProduct");

const updateQuantityController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const currentUser = req.userId;

        let cart = await CartModel.findOne({ userId: currentUser });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                error: true,
                success: false
            });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity = quantity;

            const updatedCart = await cart.save();

            return res.status(200).json({
                data: updatedCart,
                message: "Product quantity successfully updated!",
                error: false,
                success: true
            });
        } else {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Problem!",
            error: true,
            success: false
        });
    }
};

module.exports = updateQuantityController;