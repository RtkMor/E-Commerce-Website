import { useContext } from 'react';
import { toast } from 'react-toastify';
import ApiSummary from '../common/ApiSummary.jsx';
import Context from '../context/index.jsx';

const useAddToCart = () => {
    const context = useContext(Context);

    const addToCart = async (e, id, count, addToCartButton = false) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        
        try {
            const response = await fetch(ApiSummary.addToCartProduct.url, {
                method: ApiSummary.addToCartProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: count,
                    button: addToCartButton
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                context.fetchCartProducts();
            } else {
                throw new Error(responseData.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return addToCart;
};

export default useAddToCart