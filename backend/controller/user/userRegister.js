const userModel = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");

async function userRegisterController(req, res) {
  try {
    const { name, email, password, confirmPassword, mobileNumber } = req.body;

    // Check for required fields
    if (!name || !email || !password || !confirmPassword || !mobileNumber) {
      return res.status(400).json({
        message: "All fields are required!",
        error: true,
        success: false,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address!",
        error: true,
        success: false,
      });
    }

    // Validate mobile number format (assuming 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        message: "Invalid mobile number!",
        error: true,
        success: false,
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long!",
        error: true,
        success: false,
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match!",
        error: true,
        success: false,
      });
    }

    // Check if email already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "This email is already in use!",
        error: true,
        success: false,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      mobileNumber,
      profilePic: req.body.profilePic,
      role: "GENERAL",
    });

    // Save the new user
    const saveUser = await newUser.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Account created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userRegisterController;
