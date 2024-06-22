const express = require("express");
const router = express.Router();


const userRegisterController = require("../controller/userRegister.js");
const userLoginController = require("../controller/userLogin.js");
const userDetailsController = require("../controller/userDetails.js");
const authToken = require("../middleware/authToken.js");
const userLogoutController = require("../controller/userLogout.js");
const allUsersController = require("../controller/allUsers.js");
const updateUserController = require("../controller/updateUser.js")
const uploadProductController = require("../controller/uploadProduct.js")
const getProductController = require("../controller/getProduct.js")
const updateProductController = require("../controller/updateProduct.js")
const deleteProductController = require("../controller/deleteProduct.js")


// login, logout and sign up section
router.post("/signUp", userRegisterController);
router.post("/signIn", userLoginController);
router.get("/logout", userLogoutController)


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


module.exports = router;
