import ApiSummary from "../common/ApiSummary";
import { toast } from 'react-toastify';

const fetchCategoryList = async() => {
    try {
        const response = await fetch(ApiSummary.categoryList.url, {
            method: ApiSummary.categoryList.method
        });

        const responseData = await response.json();

        if (responseData.success) {
            return responseData.data;
        } else {
            throw new Error("Failed to fetch category list!");
        }
    } catch (error) {
        toast.error(error.message);
        return null;
    }
}

export default fetchCategoryList;