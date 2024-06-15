const express = require("express");
const router = express.Router();

const userRegisterController = require("../controller/userRegister.js");
router.post("/signUp", userRegisterController);

const userLoginController = require("../controller/userLogin.js");
router.post("/signIn", userLoginController);

module.exports = router;
