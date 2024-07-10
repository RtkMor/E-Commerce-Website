const userModel = require("../../models/userModel");

async function allUsersController(req, res) {
  try {
    const usersData = await userModel.find();
    res.status(200).json({
      message: "Data sent successfully!",
      error: false,
      success: true,
      data: usersData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server problem!",
      error: true,
      success: false,
    });
  }
}

module.exports = allUsersController;
