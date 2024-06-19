const userModel = require('../models/userModel.js')

async function userDetailsController(req, res) {
    try {
        
        const userId = req.userId;
        const user = await userModel.findById(userId);
        res.status(200).json({
            data: user,
            message: "User details!",
            error: false,
            success: true
        });
        
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;