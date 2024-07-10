import ApiSummary from "../common/ApiSummary";
import { toast } from 'react-toastify';

const fetchCategoryProducts = async (category, limit, productName) => {
    try {
        const requestBody = { category };
        if (limit) {
            requestBody.limit = limit;
        }
        if(productName) {
            requestBody.productName = productName;
        }

        const response = await fetch(ApiSummary.categoryProducts.url, {
            method: ApiSummary.categoryProducts.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch category products!');
        }

        const responseData = await response.json();

        if (responseData.success) {
            return responseData.data;
        } else {
            throw new Error('Failed to fetch category products!');
        }
    } catch (error) {
        toast.error(error.message);
        return null;
    }
}

export default fetchCategoryProducts;