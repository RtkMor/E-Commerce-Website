const userModel = require("../../models/userModel");

async function updateUserController(req, res) {
  try {
    const { _id, name, email, mobileNumber, role, profilePic } = req.body;

    // Validate name
    if(name && name === ""){
      return res.status(400).json({
        message: "Name should not be empty!",
        error: true,
        success: false,
      });
    }

    // Validate mobile number format (assuming 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (mobileNumber && !mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        message: "Invalid mobile number!",
        error: true,
        success: false,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address!",
        error: true,
        success: false,
      });
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(mobileNumber && { mobileNumber: mobileNumber }),
      ...(role && { role: role }),
      ...(profilePic && { profilePic: profilePic })
    };

    const updateUser = await userModel.findByIdAndUpdate(_id, payload, { new: true });

    res.status(200).json({
      data: updateUser,
      message: "Profile updated successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserController;