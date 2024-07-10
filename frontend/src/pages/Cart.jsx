import React, { useContext, useState, useEffect } from 'react';
import Context from '../context';
import CartProduct from '../components/CartProduct';
import displayCurrency from '../helpers/displayCurrency';

const Cart = () => {
    const { cartProducts } = useContext(Context);
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <div className="container mx-auto p-4">
            {cartProducts.length === 0 ? (
                <h1 className="text-2xl font-bold text-center mb-4">Your Cart Is Empty!</h1>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold text-center mb-4">Your Cart</h1>
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cartProducts.map(item => (
                            <li key={item._id} className="flex flex-col sm:flex-row justify-between items-center py-4">
                                <CartProduct
                                    productId={item.productId}
                                    quantity={item.quantity}
                                    setTotalPrice={setTotalPrice}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center border-t pt-4">
                        <h2 className="text-xl font-semibold">Total: {displayCurrency(totalPrice)}</h2>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;