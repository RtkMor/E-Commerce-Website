import React, { useEffect, useState } from 'react';
import useAddToCart from '../helpers/useAddToCart';
import { toast } from 'react-toastify';
import ApiSummary from '../common/ApiSummary';
import { Link } from 'react-router-dom';
import displayCurrency from '../helpers/displayCurrency';

const CartProduct = ({ productId, quantity, setTotalPrice }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const addToCart = useAddToCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ApiSummary.productDetails.url, {
                    method: ApiSummary.productDetails.method,
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ productId })
                });

                const dataResponse = await response.json();

                if (dataResponse.success) {
                    setProductDetails({
                        productName: dataResponse.data.productName,
                        productImage: dataResponse.data.productImage[0],
                        sellingPrice: dataResponse.data.sellingPrice
                    });
                    setTotalPrice(prev => prev + quantity*dataResponse.data.sellingPrice)
                } else {
                    throw new Error("Failed to fetch the product!");
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const updateQuantity = (e, newQuantity) => {
        e.stopPropagation();
        e.preventDefault();
        if (newQuantity < 1) return;
        addToCart(null, productId, newQuantity);
        // Update total price when quantity changes
        if (productDetails) {
            setTotalPrice(prevTotal => prevTotal + (newQuantity - quantity) * productDetails.sellingPrice);
        }
    };

    const handleRemoveClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmRemove = () => {
        addToCart(null, productId, 0);
        setShowConfirmation(false);
        // Update total price when item is removed
        if (productDetails) {
            setTotalPrice(prevTotal => prevTotal - quantity * productDetails.sellingPrice);
        }
    };

    const handleCancelRemove = () => {
        setShowConfirmation(false);
    };

    if (loading || !productDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center w-full p-4 bg-white shadow-md rounded-lg">
            <img 
                src={productDetails.productImage} 
                alt={productDetails.productName} 
                className="object-contain w-32 h-32 sm:w-20 sm:h-20 mix-blend-multiply mr-0 sm:mr-4 mb-4 sm:mb-0" 
            />
            <Link to={`/product/${productDetails.productName}/${productId}`} className="flex-1 w-full">
                <h2 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-normal md:whitespace-nowrap md:overflow-clip line-clamp-3">{productDetails.productName}</h2>
                <p className="text-gray-600">{displayCurrency(productDetails.sellingPrice)}</p>
                <div className="flex items-center mt-2">
                    <button onClick={(e) => updateQuantity(e, quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <p className="mx-2">{quantity}</p>
                    <button onClick={(e) => updateQuantity(e, quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
            </Link>
            <button
                onClick={handleRemoveClick} 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 mt-4 sm:mt-0 sm:ml-4 self-start sm:self-auto"
            >
                Remove
            </button>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-md w-80">
                        <h2 className="text-xl font-semibold mb-4">Confirm Removal</h2>
                        <p className="mb-4">Are you sure you want to remove this item from your cart?</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={handleCancelRemove} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                            <button onClick={handleConfirmRemove} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartProduct;