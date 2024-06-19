async function userLogoutController(req, res) {
    try {
        
        res.clearCookie("token");
        res.status(200).json({
            message: "Log out successfully!",
            error: false,
            success: true,
            data: []
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server problem!",
            error: true,
            success: false
        })
    }
}

module.exports = userLogoutController;