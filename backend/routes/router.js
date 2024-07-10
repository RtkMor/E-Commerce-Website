const express = require("express");
const router = express.Router();


const userRegisterController = require("../controller/user/userRegister.js");
const userLoginController = require("../controller/user/userLogin.js");
const userDetailsController = require("../controller/user/userDetails.js");
const authToken = require("../middleware/authToken.js");
const userLogoutController = require("../controller/user/userLogout.js");
const allUsersController = require("../controller/user/allUsers.js");
const updateUserController = require("../controller/user/updateUser.js")
const uploadProductController = require("../controller/product/uploadProduct.js")
const getProductController = require("../controller/product/getProduct.js")
const updateProductController = require("../controller/product/updateProduct.js")
const deleteProductController = require("../controller/product/deleteProduct.js")
const getCategoryListController = require("../controller/product/getCategoryList.js")
const getCategoryProductsController = require("../controller/product/getCategoryProducts.js")
const getProductDetailsController = require("../controller/product/getProductDetails.js")
const searchProductController = require("../controller/product/searchProduct.js")
const addToCartController = require("../controller/user/addToCart.js")
const updateQuantityController = require("../controller/user/updateQuantity.js")
const countCartProductsController = require("../controller/user/countCartProducts.js")
const sendOtpController = require('../controller/otp/sendOTP.js');
const verifyOtpController = require('../controller/otp/verifyOTP.js');
const forgotPasswordController = require("../controller/user/forgotPassword.js");
const checkUserController = require("../controller/user/checkUser.js");


// login, logout, sign up and forgot password section
router.post("/signUp", userRegisterController);
router.post("/signIn", userLoginController);
router.get("/logout", userLogoutController)
router.post("/forgot-password", forgotPasswordController)
router.post("/checkUser", checkUserController)


// load user details section
router.get("/user-details", authToken, userDetailsController);


// admin section
router.get("/all-users", authToken, allUsersController)
router.post("/update-user", updateUserController)


// product section
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.post("/delete-product", authToken, deleteProductController)
router.get("/get-categoryList", getCategoryListController)
router.post("/post-categoryProducts", getCategoryProductsController)
router.post("/product-details", getProductDetailsController)
router.post("/search-product", searchProductController)


// user add to cart
router.post("/addToCart",authToken, addToCartController)
router.post("/updateQuantity", authToken, updateQuantityController)
router.get("/countCartProducts", authToken, countCartProductsController)


// otp controller
router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);


module.exports = router;
