const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const forgotPasswordController = async(req, res) => {
    try {

        const {email, oldPassword, password, confirmPassword} = req.body;

        const user = await userModel.findOne({email: email});

        if(oldPassword){
            const checkPassword = await bcrypt.compare(oldPassword, user.password);
            if (!checkPassword) {
                return res.status(401).json({
                    message: "Wrong old password!",
                    error: true,
                    success: false,
                });
            }
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

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Update user's password
        user.password = hashPassword;
        await user.save();

        res.status(201).json({
        success: true,
        error: false,
        message: "Password changed successfully!",
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Problem!",
            error: true,
            success: false
        })
    }
}

module.exports = forgotPasswordController;