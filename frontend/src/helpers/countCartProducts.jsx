import ApiSummary from '../common/ApiSummary'

const countCartProducts = async() => {
    try {

        const response = await fetch(ApiSummary.countCartProducts.url, {
            method: ApiSummary.countCartProducts.method,
            credentials: "include"
        })

        const responseData = await response.json();

        if(responseData.success){
            return responseData.data;
        }
        else{
            throw new Error(responseData.message)
        }
        
    } catch (error) {
    }
}

export default countCartProducts;