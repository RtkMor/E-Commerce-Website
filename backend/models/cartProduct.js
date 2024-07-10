const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        }
    }]
}, {
    timestamps: true
});

const CartModel = mongoose.model("Cart", cartProductSchema);

module.exports = CartModel;