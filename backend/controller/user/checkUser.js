const userModel = require("../../models/userModel");

async function checkUserController(req, res) {
  try {

    const {email} = req.body

    if(!email){
      throw new Error("Please provide email address!")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        throw new Error("Invalid email address!")
    }

    const user = await userModel.findOne({email: email})
    
    if(!user){
        throw new Error("User doesn't exist");
    }

    res.status(200).json({
      message: "User exist!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = checkUserController;
