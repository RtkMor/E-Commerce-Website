const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please enter email!",
                error: true,
                success: false
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email address!",
                error: true,
                success: false
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please enter password!",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Wrong password!",
                error: true,
                success: false
            });
        }

        const token_data = {
            _id: user._id,
            email: user.email
        };

        const token = await jwt.sign(token_data, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict' // Adjust this based on your requirements (Strict, Lax, None)
        };

        res.cookie("token", token, tokenOption).status(200).json({
            data: token,
            success: true,
            error: false,
            message: "Login successfully!"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userLoginController;
