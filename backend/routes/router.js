const express = require("express");
const router = express.Router();


const userRegisterController = require("../controller/userRegister.js");
const userLoginController = require("../controller/userLogin.js");
const userDetailsController = require("../controller/userDetails.js");
const authToken = require("../middleware/authToken.js");
const userLogoutController = require("../controller/userLogout.js");
const allUsersController = require("../controller/allUsers.js");
const updateUserController = require("../controller/updateUser.js")


// login, logout and sign up section
router.post("/signUp", userRegisterController);
router.post("/signIn", userLoginController);
router.get("/logout", userLogoutController)


// load user details section
router.get("/user-details", authToken, userDetailsController);


// admin section
router.get("/all-users", authToken, allUsersController)
router.post("/update-user", updateUserController)


module.exports = router;
