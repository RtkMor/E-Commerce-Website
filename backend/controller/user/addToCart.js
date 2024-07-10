const CartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity, button } = req.body;
        const currentUser = req.userId;

        if (!productId || quantity == null || !currentUser) {
            return res.status(400).json({
                message: "Invalid request data!",
                error: true,
                success: false
            });
        }

        let cart = await CartModel.findOne({ userId: currentUser });

        if (!cart) {
            cart = new CartModel({ userId: currentUser, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (quantity === 0) {
            if (productIndex >= 0) {
                cart.products.splice(productIndex, 1);
            } else {
                return res.status(400).json({
                    message: "Product not found in cart!",
                    error: true,
                    success: false
                });
            }
        } else {
            if (productIndex >= 0) {
                if(button){
                    return res.status(500).json({
                        message: "Product already in the cart!",
                        error: true,
                        success: false
                    });
                }
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        const updatedCart = await cart.save();

        return res.status(200).json({
            data: updatedCart,
            message: "Cart updated successfully!",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Problem!",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;