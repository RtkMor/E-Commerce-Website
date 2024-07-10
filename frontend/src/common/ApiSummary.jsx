const backendDomain = "https://e-commerce-website-backend-rosy.vercel.app/"

const ApiSummary = {
    signUp: {
        url: `${backendDomain}/api/signUp`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signIn`,
        method: "post"
    },
    forgotPassword: {
        url: `${backendDomain}/api/forgot-password`,
        method: "post"
    },
    checkUser: {
        url: `${backendDomain}/api/checkUser`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout: {
        url: `${backendDomain}/api/logout`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProducts: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    deleteProduct: {
        url: `${backendDomain}/api/delete-product`,
        method: "post"
    },
    categoryList: {
        url: `${backendDomain}/api/get-categoryList`,
        method: "get"
    },
    categoryProducts: {
        url: `${backendDomain}/api/post-categoryProducts`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addToCart`,
        method: "post"
    },
    updateQuantity: {
        url: `${backendDomain}/api/updateQuantity`,
        method: "post"
    },
    countCartProducts: {
        url: `${backendDomain}/api/countCartProducts`,
        method: "get"
    },
    sendOtp: {
        url: `${backendDomain}/api/send-otp`,
        method: "post"
    },
    verifyOtp: {
        url: `${backendDomain}/api/verify-otp`,
        method: "post"
    }
}

export default ApiSummary;