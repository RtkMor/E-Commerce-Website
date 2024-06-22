const userModel = require('../models/userModel.js')

async function updateUserController(req, res) {

    try {

        const {_id, name, email, mobileNumber, role} = req.body;

        const payload = {
            ...(email && {email: email}),
            ...(name && {name: name}),
            ...(mobileNumber && {mobileNumber: mobileNumber}),
            ...(role && {role: role}),
        }

        const updateUser = await userModel.findByIdAndUpdate(_id, payload);

        res.status(200).json({
            data: updateUser,
            message: "Profile updated successfully!",
            success: true,
            error: false
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server problem!",
            error: true,
            success: false
        })
    }

}

module.exports = updateUserController;